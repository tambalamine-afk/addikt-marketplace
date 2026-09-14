-- ==============================================================================
-- Prêt pour le lancement : index de performance et limites anti-abus
-- Rejouable sans erreur.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Index : listes d'annonces, messagerie, commandes et limites ci-dessous
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS listings_status_created_at_idx ON public.listings (status, created_at DESC);
CREATE INDEX IF NOT EXISTS listings_seller_id_created_at_idx ON public.listings (seller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS listings_category_id_status_idx ON public.listings (category_id, status);
CREATE INDEX IF NOT EXISTS listing_images_listing_id_position_idx ON public.listing_images (listing_id, position);
CREATE INDEX IF NOT EXISTS messages_conversation_id_created_at_idx ON public.messages (conversation_id, created_at);
CREATE INDEX IF NOT EXISTS messages_sender_id_created_at_idx ON public.messages (sender_id, created_at DESC);
CREATE INDEX IF NOT EXISTS messages_unread_idx ON public.messages (conversation_id) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS messages_order_id_idx ON public.messages (order_id);
CREATE INDEX IF NOT EXISTS conversations_buyer_id_created_at_idx ON public.conversations (buyer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS conversations_seller_id_idx ON public.conversations (seller_id);
CREATE INDEX IF NOT EXISTS orders_buyer_id_created_at_idx ON public.orders (buyer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS orders_seller_id_created_at_idx ON public.orders (seller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS orders_delivery_address_id_idx ON public.orders (delivery_address_id);
CREATE INDEX IF NOT EXISTS favorites_listing_id_idx ON public.favorites (listing_id);
CREATE INDEX IF NOT EXISTS followers_following_id_idx ON public.followers (following_id);
CREATE INDEX IF NOT EXISTS reviews_reviewed_id_idx ON public.reviews (reviewed_id);
CREATE INDEX IF NOT EXISTS addresses_user_id_idx ON public.addresses (user_id);
CREATE INDEX IF NOT EXISTS reports_reporter_id_created_at_idx ON public.reports (reporter_id, created_at DESC);
CREATE INDEX IF NOT EXISTS reports_status_created_at_idx ON public.reports (status, created_at DESC);
CREATE INDEX IF NOT EXISTS payment_transactions_order_id_idx ON public.payment_transactions (order_id);

-- ------------------------------------------------------------------------------
-- 2. Date de modification tenue à jour automatiquement
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS set_listings_updated_at ON public.listings;
CREATE TRIGGER set_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ------------------------------------------------------------------------------
-- 3. Limites anti-abus, identiques sur le site et l'app mobile
-- ------------------------------------------------------------------------------
--   Annonces publiées          20 par 24 h
--   Nouvelles conversations    20 par 24 h
--   Messages envoyés           30 par 10 minutes (hors messages automatiques)
--   Réservations en cours      5 à la fois, et 15 créées par 24 h
--   Signalements               10 par 24 h
-- Les messages d'erreur (SQLSTATE P0001) sont affichés tels quels à l'utilisateur.
CREATE OR REPLACE FUNCTION public.enforce_rate_limits()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user UUID := auth.uid();
  v_count INTEGER;
  v_open INTEGER;
BEGIN
  -- Pas de limite pour le service Addikt (tableau de bord, service role) ni pour
  -- les lignes créées par la base elle-même (ex. messages automatiques de commande).
  IF v_user IS NULL OR pg_trigger_depth() > 1 THEN
    RETURN NEW;
  END IF;

  -- La date de création ne peut pas être choisie par le client (sinon on antidaterait
  -- pour contourner les limites).
  NEW.created_at := now();

  IF TG_TABLE_NAME = 'listings' THEN
    SELECT count(*) INTO v_count FROM public.listings
    WHERE seller_id = v_user AND created_at > now() - interval '24 hours';
    IF v_count >= 20 THEN
      RAISE EXCEPTION 'Tu as déjà publié 20 annonces aujourd''hui. Tu pourras en publier d''autres demain.';
    END IF;

  ELSIF TG_TABLE_NAME = 'conversations' THEN
    SELECT count(*) INTO v_count FROM public.conversations
    WHERE buyer_id = v_user AND created_at > now() - interval '24 hours';
    IF v_count >= 20 THEN
      RAISE EXCEPTION 'Tu as contacté beaucoup de vendeurs aujourd''hui. Réessaie demain.';
    END IF;

  ELSIF TG_TABLE_NAME = 'messages' THEN
    IF NEW.kind IS DISTINCT FROM 'user' THEN
      RETURN NEW;
    END IF;
    SELECT count(*) INTO v_count FROM public.messages
    WHERE sender_id = v_user AND kind = 'user' AND created_at > now() - interval '10 minutes';
    IF v_count >= 30 THEN
      RAISE EXCEPTION 'Tu envoies beaucoup de messages. Patiente quelques minutes avant de continuer.';
    END IF;

  ELSIF TG_TABLE_NAME = 'orders' THEN
    SELECT count(*) FILTER (WHERE status IN ('pending', 'paid', 'shipped')),
           count(*) FILTER (WHERE created_at > now() - interval '24 hours')
    INTO v_open, v_count
    FROM public.orders
    WHERE buyer_id = v_user;
    IF v_open >= 5 THEN
      RAISE EXCEPTION 'Tu as déjà 5 réservations en cours. Termine ou annule-en une avant d''en faire une nouvelle.';
    END IF;
    IF v_count >= 15 THEN
      RAISE EXCEPTION 'Tu as fait beaucoup de réservations aujourd''hui. Réessaie demain.';
    END IF;

  ELSIF TG_TABLE_NAME = 'reports' THEN
    SELECT count(*) INTO v_count FROM public.reports
    WHERE reporter_id = v_user AND created_at > now() - interval '24 hours';
    IF v_count >= 10 THEN
      RAISE EXCEPTION 'Tu as envoyé beaucoup de signalements aujourd''hui. Merci ! Tu pourras en envoyer d''autres demain.';
    END IF;
  END IF;

  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.enforce_rate_limits() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_rate_limits ON public.listings;
CREATE TRIGGER enforce_rate_limits BEFORE INSERT ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limits();

DROP TRIGGER IF EXISTS enforce_rate_limits ON public.conversations;
CREATE TRIGGER enforce_rate_limits BEFORE INSERT ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limits();

DROP TRIGGER IF EXISTS enforce_rate_limits ON public.messages;
CREATE TRIGGER enforce_rate_limits BEFORE INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limits();

DROP TRIGGER IF EXISTS enforce_rate_limits ON public.orders;
CREATE TRIGGER enforce_rate_limits BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limits();

DROP TRIGGER IF EXISTS enforce_rate_limits ON public.reports;
CREATE TRIGGER enforce_rate_limits BEFORE INSERT ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limits();
