-- ==============================================================================
-- Étape 3 : commande MVP en remise en main propre (audit du 13/09/2026)
-- B4 création de commande côté serveur · B6 flux complet · I6 tables manquantes
-- Rejouable sans erreur.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Annonces : les articles réservés et vendus restent consultables
-- ------------------------------------------------------------------------------
-- Jeu de policies complet et connu (voir l'étape 1 pour la raison du nettoyage).
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'listings' LOOP
    EXECUTE format('DROP POLICY %I ON public.listings', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "listings_select_public" ON public.listings
  FOR SELECT USING (status IN ('active', 'reserved', 'sold') OR auth.uid() = seller_id);

-- Une annonce naît en brouillon ou en ligne, jamais directement réservée ou vendue.
CREATE POLICY "listings_insert_own" ON public.listings
  FOR INSERT WITH CHECK (auth.uid() = seller_id AND status IN ('draft', 'active'));

-- Le vendeur modifie son annonce mais ne peut pas la transférer à quelqu'un d'autre.
-- Pas de policy DELETE : la suppression est logique (status = 'deleted').
CREATE POLICY "listings_update_own" ON public.listings
  FOR UPDATE USING (auth.uid() = seller_id) WITH CHECK (auth.uid() = seller_id);

-- ------------------------------------------------------------------------------
-- 2. Commandes : une seule commande en cours par article
-- ------------------------------------------------------------------------------
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Doublons éventuels créés avant cette migration : la plus ancienne est conservée.
UPDATE public.orders o
SET status = 'cancelled', updated_at = now()
WHERE o.status IN ('pending', 'paid', 'shipped')
  AND EXISTS (
    SELECT 1 FROM public.orders o2
    WHERE o2.listing_id = o.listing_id
      AND o2.status IN ('pending', 'paid', 'shipped')
      AND (coalesce(o2.created_at, '-infinity'), o2.id) < (coalesce(o.created_at, '-infinity'), o.id)
  );

CREATE UNIQUE INDEX IF NOT EXISTS orders_one_open_order_per_listing
  ON public.orders (listing_id)
  WHERE status IN ('pending', 'paid', 'shipped');

-- Le statut de l'annonce suit celui de la commande, quel que soit le chemin de
-- création (fonction place_order du site ou insertion directe de l'app mobile).
CREATE OR REPLACE FUNCTION public.sync_listing_with_order()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.listing_id IS NULL THEN
    RETURN NULL;
  END IF;

  IF NEW.status IN ('pending', 'paid', 'shipped') THEN
    UPDATE public.listings SET status = 'reserved', updated_at = now()
    WHERE id = NEW.listing_id AND status = 'active';
  ELSIF NEW.status = 'delivered' THEN
    UPDATE public.listings SET status = 'sold', updated_at = now()
    WHERE id = NEW.listing_id AND status IN ('active', 'reserved');
  ELSIF NEW.status = 'cancelled' THEN
    UPDATE public.listings SET status = 'active', updated_at = now()
    WHERE id = NEW.listing_id
      AND status = 'reserved'
      AND NOT EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.listing_id = NEW.listing_id
          AND o.id != NEW.id
          AND o.status IN ('pending', 'paid', 'shipped')
      );
  END IF;
  RETURN NULL;
END $$;
REVOKE ALL ON FUNCTION public.sync_listing_with_order() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_order_status_change ON public.orders;
CREATE TRIGGER on_order_status_change
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.sync_listing_with_order();

-- Rattrapage des commandes passées depuis l'app mobile avant ce trigger.
UPDATE public.listings l SET status = 'sold', updated_at = now()
WHERE l.status IN ('active', 'reserved')
  AND EXISTS (SELECT 1 FROM public.orders o WHERE o.listing_id = l.id AND o.status = 'delivered');

UPDATE public.listings l SET status = 'reserved', updated_at = now()
WHERE l.status = 'active'
  AND EXISTS (SELECT 1 FROM public.orders o WHERE o.listing_id = l.id AND o.status IN ('pending', 'paid', 'shipped'));

-- ------------------------------------------------------------------------------
-- 3. Réserver un article (site web)
-- ------------------------------------------------------------------------------
-- Prix, vendeur et statut viennent de l'annonce, jamais du navigateur.
-- Les messages d'erreur (SQLSTATE P0001) sont affichés tels quels à l'utilisateur.
CREATE OR REPLACE FUNCTION public.place_order(
  p_listing_id UUID,
  p_delivery_address_id UUID DEFAULT NULL,
  p_payment_method TEXT DEFAULT 'cod'
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_buyer UUID := auth.uid();
  v_listing public.listings%ROWTYPE;
  v_order_id UUID;
BEGIN
  IF v_buyer IS NULL THEN
    RAISE EXCEPTION 'Connecte-toi pour réserver un article.';
  END IF;

  IF p_payment_method IS DISTINCT FROM 'cod' THEN
    RAISE EXCEPTION 'Ce mode de paiement n''est pas encore disponible. Choisis le paiement en main propre.';
  END IF;

  SELECT * INTO v_listing FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_listing.status != 'active' THEN
    RAISE EXCEPTION 'Cet article n''est plus disponible.';
  END IF;

  IF v_listing.seller_id = v_buyer THEN
    RAISE EXCEPTION 'Tu ne peux pas acheter ta propre annonce.';
  END IF;

  IF p_delivery_address_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.addresses WHERE id = p_delivery_address_id AND user_id = v_buyer
  ) THEN
    RAISE EXCEPTION 'Les informations de remise sont invalides. Recommence la réservation.';
  END IF;

  BEGIN
    INSERT INTO public.orders (buyer_id, seller_id, listing_id, status, total_amount, payment_method, delivery_address_id)
    VALUES (v_buyer, v_listing.seller_id, v_listing.id, 'pending', v_listing.price, 'cod', p_delivery_address_id)
    RETURNING id INTO v_order_id;
  EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'Cet article n''est plus disponible.';
  END;

  RETURN v_order_id;
END $$;
REVOKE ALL ON FUNCTION public.place_order(UUID, UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.place_order(UUID, UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. Faire avancer une commande
-- ------------------------------------------------------------------------------
--   Réservée (pending) → Remise (shipped)      : le vendeur
--   Réservée ou Remise → Terminée (delivered)  : l'acheteur, qui confirme la réception
--   Réservée           → Annulée (cancelled)   : l'acheteur ou le vendeur
CREATE OR REPLACE FUNCTION public.update_order_status(p_order_id UUID, p_status TEXT)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user UUID := auth.uid();
  v_order public.orders%ROWTYPE;
  v_is_buyer BOOLEAN;
  v_is_seller BOOLEAN;
BEGIN
  SELECT * INTO v_order FROM public.orders WHERE id = p_order_id FOR UPDATE;

  v_is_buyer := coalesce(v_user = v_order.buyer_id, false);
  v_is_seller := coalesce(v_user = v_order.seller_id, false);

  IF NOT FOUND OR v_user IS NULL OR NOT (v_is_buyer OR v_is_seller) THEN
    RAISE EXCEPTION 'Commande introuvable.';
  END IF;

  IF NOT (
       (p_status = 'shipped'   AND v_is_seller AND v_order.status = 'pending')
    OR (p_status = 'delivered' AND v_is_buyer  AND v_order.status IN ('pending', 'shipped'))
    OR (p_status = 'cancelled' AND v_order.status = 'pending')
  ) THEN
    RAISE EXCEPTION 'Cette action n''est plus possible pour cette commande. Recharge la page.';
  END IF;

  UPDATE public.orders SET status = p_status, updated_at = now() WHERE id = p_order_id;
  RETURN p_status;
END $$;
REVOKE ALL ON FUNCTION public.update_order_status(UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_order_status(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. Le vendeur voit le lieu de remise et le téléphone de sa commande
-- ------------------------------------------------------------------------------
-- Passe par une fonction : une policy qui interrogerait directement « orders »
-- créerait une boucle avec la policy d'insertion des commandes (qui lit « addresses »).
CREATE OR REPLACE FUNCTION public.is_seller_of_order_address(p_address_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.delivery_address_id = p_address_id AND o.seller_id = auth.uid()
  );
$$;
REVOKE ALL ON FUNCTION public.is_seller_of_order_address(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_seller_of_order_address(UUID) TO authenticated;

DROP POLICY IF EXISTS "addresses_select_order_seller" ON public.addresses;
CREATE POLICY "addresses_select_order_seller" ON public.addresses
  FOR SELECT USING (public.is_seller_of_order_address(id));

-- ------------------------------------------------------------------------------
-- 6. Numéro WhatsApp du vendeur : aussi pour l'acheteur d'une commande en cours
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_seller_phone(p_listing_id UUID)
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT pp.phone
  FROM public.listings l
  JOIN public.profile_private pp ON pp.id = l.seller_id
  WHERE l.id = p_listing_id
    AND auth.uid() IS NOT NULL
    AND (
      l.status = 'active'
      OR EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.listing_id = l.id AND o.buyer_id = auth.uid() AND o.status != 'cancelled'
      )
    );
$$;
REVOKE ALL ON FUNCTION public.get_seller_phone(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_phone(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. Signalements (modération)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('counterfeit', 'prohibited', 'misleading', 'scam', 'offensive', 'other')),
  details TEXT CHECK (char_length(details) <= 1000),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (listing_id, reporter_id)
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 8. Journal des paiements (Wave / Orange Money, écrit uniquement par le serveur)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('wave', 'orange_money', 'cod')),
  provider_ref TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_ref)
);
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public' AND tablename IN ('reports', 'payment_transactions')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

-- Un membre signale une annonce une fois ; il ne voit que ses propres signalements.
-- Le traitement se fait avec le service role (tableau de bord Supabase).
CREATE POLICY "reports_insert_own" ON public.reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid() AND status = 'open');
CREATE POLICY "reports_select_own" ON public.reports
  FOR SELECT USING (reporter_id = auth.uid());
REVOKE ALL ON public.reports FROM anon;
REVOKE UPDATE, DELETE ON public.reports FROM authenticated;

-- Acheteur et vendeur consultent les paiements de leur commande, sans pouvoir les écrire.
CREATE POLICY "payment_transactions_select_participants" ON public.payment_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND auth.uid() IN (o.buyer_id, o.seller_id)
    )
  );
REVOKE ALL ON public.payment_transactions FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.payment_transactions FROM authenticated;
