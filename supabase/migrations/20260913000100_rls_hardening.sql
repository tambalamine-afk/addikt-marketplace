-- ==============================================================================
-- Durcissement de la sécurité (audit du 13/09/2026)
-- Corrige : B1 messages, B2 notes de profil, B3 avis, B4 commandes,
--           B5 inscription, I1 téléphones publics, I3 photos, I4 conversations,
--           I12 messages lus.
-- Rejouable sans erreur.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. Repartir d'un jeu de policies connu
-- ------------------------------------------------------------------------------
-- La prod a divergé de l'ancien schema.sql. Les policies Postgres s'additionnent
-- (OU logique) : une policy permissive ajoutée à la main suffirait à annuler ce
-- durcissement. On supprime donc toutes les policies des tables concernées avant
-- de recréer l'ensemble complet ci-dessous.
CREATE TABLE IF NOT EXISTS public.profile_private (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profile_private ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('profiles', 'profile_private', 'listing_images',
                        'conversations', 'messages', 'orders', 'reviews')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

-- ------------------------------------------------------------------------------
-- 1. Profils (B2, I1)
-- ------------------------------------------------------------------------------
-- Lecture publique conservée : le téléphone quitte la table (voir plus bas).
CREATE POLICY "profiles_select_public" ON public.profiles
  FOR SELECT USING (true);

-- Pas de policy INSERT : le profil est créé uniquement par le trigger d'inscription.
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Seules les colonnes éditables par l'utilisateur restent modifiables.
-- rating_avg / rating_count sont calculés par trigger ; is_top_boutique est
-- réservé au service role (back-office).
REVOKE INSERT, UPDATE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (username, full_name, avatar_url, cover_url, bio, location)
  ON public.profiles TO authenticated;

-- Téléphone : table privée, visible et modifiable par son seul propriétaire.
CREATE POLICY "profile_private_select_own" ON public.profile_private
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profile_private_insert_own" ON public.profile_private
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profile_private_update_own" ON public.profile_private
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
REVOKE ALL ON public.profile_private FROM anon;

-- Déplacer les numéros existants puis retirer la colonne publique.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    INSERT INTO public.profile_private (id, phone)
    SELECT id, phone FROM public.profiles WHERE phone IS NOT NULL AND phone != ''
    ON CONFLICT (id) DO UPDATE SET phone = EXCLUDED.phone, updated_at = now();

    ALTER TABLE public.profiles DROP COLUMN phone;
  END IF;
END $$;

-- Numéro WhatsApp d'un vendeur : révélé aux membres connectés, pour une annonce en ligne.
CREATE OR REPLACE FUNCTION public.get_seller_phone(p_listing_id UUID)
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT pp.phone
  FROM public.listings l
  JOIN public.profile_private pp ON pp.id = l.seller_id
  WHERE l.id = p_listing_id
    AND l.status = 'active'
    AND auth.uid() IS NOT NULL;
$$;
REVOKE ALL ON FUNCTION public.get_seller_phone(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_phone(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. Inscription (B5)
-- ------------------------------------------------------------------------------
-- Pseudo unique garanti : nettoyé, jamais vide, suffixé en cas de doublon.
CREATE OR REPLACE FUNCTION public.generate_username(seed TEXT)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  base TEXT;
  candidate TEXT;
BEGIN
  base := left(regexp_replace(lower(coalesce(seed, '')), '[^a-z0-9_]', '', 'g'), 24);
  IF base = '' THEN
    base := 'membre';
  END IF;
  candidate := base;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    candidate := base || '_' || substr(md5(random()::text), 1, 4);
  END LOOP;
  RETURN candidate;
END $$;
REVOKE ALL ON FUNCTION public.generate_username(TEXT) FROM PUBLIC, anon, authenticated;

-- Fonctionne pour l'email, Google et l'OTP SMS (pas d'email ni de pseudo).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  meta JSONB := coalesce(new.raw_user_meta_data, '{}'::jsonb);
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, cover_url, location)
  VALUES (
    new.id,
    public.generate_username(coalesce(nullif(meta->>'username', ''), split_part(new.email, '@', 1))),
    meta->>'full_name',
    meta->>'avatar_url',
    meta->>'cover_url',
    meta->>'location'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END $$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Rattrapage : comptes créés sans profil à cause de l'ancien trigger.
DO $$
DECLARE u record;
BEGIN
  FOR u IN
    SELECT au.id, au.email, au.raw_user_meta_data AS meta
    FROM auth.users au
    WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = au.id)
  LOOP
    INSERT INTO public.profiles (id, username, full_name, avatar_url, location)
    VALUES (
      u.id,
      public.generate_username(coalesce(nullif(u.meta->>'username', ''), split_part(u.email, '@', 1))),
      u.meta->>'full_name',
      u.meta->>'avatar_url',
      u.meta->>'location'
    );
  END LOOP;
END $$;

-- ------------------------------------------------------------------------------
-- 3. Notes calculées depuis les avis (B2)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.recompute_profile_rating(p_profile_id UUID)
RETURNS void
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  UPDATE public.profiles p
  SET rating_avg = coalesce((SELECT round(avg(r.rating)::numeric, 2) FROM public.reviews r WHERE r.reviewed_id = p.id), 0),
      rating_count = (SELECT count(*) FROM public.reviews r WHERE r.reviewed_id = p.id)
  WHERE p.id = p_profile_id;
$$;
REVOKE ALL ON FUNCTION public.recompute_profile_rating(UUID) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.handle_review_change()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP IN ('UPDATE', 'DELETE') THEN
    PERFORM public.recompute_profile_rating(OLD.reviewed_id);
  END IF;
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    PERFORM public.recompute_profile_rating(NEW.reviewed_id);
  END IF;
  RETURN NULL;
END $$;
REVOKE ALL ON FUNCTION public.handle_review_change() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_review_change();

-- Recalcul initial : écrase toute note modifiée à la main.
UPDATE public.profiles p
SET rating_avg = coalesce((SELECT round(avg(r.rating)::numeric, 2) FROM public.reviews r WHERE r.reviewed_id = p.id), 0),
    rating_count = (SELECT count(*) FROM public.reviews r WHERE r.reviewed_id = p.id);

-- ------------------------------------------------------------------------------
-- 4. Avis (B3) : uniquement après une commande livrée, sur l'autre partie
-- ------------------------------------------------------------------------------
CREATE POLICY "reviews_select_public" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "reviews_insert_after_delivery" ON public.reviews
  FOR INSERT WITH CHECK (
    reviewer_id = auth.uid()
    AND reviewer_id != reviewed_id
    AND EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id
        AND o.status = 'delivered'
        AND (
          (o.buyer_id = auth.uid() AND o.seller_id = reviewed_id)
          OR (o.seller_id = auth.uid() AND o.buyer_id = reviewed_id)
        )
    )
  );

-- ------------------------------------------------------------------------------
-- 5. Commandes (B4) : prix, vendeur et statut imposés par l'annonce
-- ------------------------------------------------------------------------------
CREATE POLICY "orders_select_participants" ON public.orders
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "orders_insert_buyer_checked" ON public.orders
  FOR INSERT WITH CHECK (
    buyer_id = auth.uid()
    AND status = 'pending'
    AND EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id
        AND l.status = 'active'
        AND l.seller_id = orders.seller_id
        AND l.seller_id != auth.uid()
        AND l.price = orders.total_amount
    )
    AND (
      delivery_address_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.addresses a
        WHERE a.id = delivery_address_id AND a.user_id = auth.uid()
      )
    )
  );
-- Pas de policy UPDATE : les changements de statut passeront par des fonctions
-- dédiées (étape 3 du plan de remédiation).

-- ------------------------------------------------------------------------------
-- 6. Conversations (I4) : le vendeur est celui de l'annonce
-- ------------------------------------------------------------------------------
CREATE POLICY "conversations_select_participants" ON public.conversations
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "conversations_insert_buyer_checked" ON public.conversations
  FOR INSERT WITH CHECK (
    buyer_id = auth.uid()
    AND buyer_id != seller_id
    AND EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id
        AND l.seller_id = conversations.seller_id
        AND l.status IN ('active', 'reserved')
    )
  );

-- ------------------------------------------------------------------------------
-- 7. Messages (B1, I12)
-- ------------------------------------------------------------------------------
CREATE POLICY "messages_select_participants" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

CREATE POLICY "messages_insert_participants" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

-- Marquer comme lu : seul read_at est modifiable, et seulement par le destinataire.
REVOKE UPDATE ON public.messages FROM anon, authenticated;
GRANT UPDATE (read_at) ON public.messages TO authenticated;

CREATE POLICY "messages_mark_read_recipient" ON public.messages
  FOR UPDATE
  USING (
    sender_id != auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

-- ------------------------------------------------------------------------------
-- 8. Photos d'annonce (I3) : gérées par le vendeur de l'annonce
-- ------------------------------------------------------------------------------
CREATE POLICY "listing_images_select_public" ON public.listing_images
  FOR SELECT USING (true);

CREATE POLICY "listing_images_insert_owner" ON public.listing_images
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND l.seller_id = auth.uid())
  );

CREATE POLICY "listing_images_update_owner" ON public.listing_images
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND l.seller_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND l.seller_id = auth.uid()));

CREATE POLICY "listing_images_delete_owner" ON public.listing_images
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND l.seller_id = auth.uid())
  );
