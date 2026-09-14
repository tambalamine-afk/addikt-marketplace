-- ==============================================================================
-- Notifications de commande dans la messagerie
-- Chaque étape d'une commande publie un message automatique dans la conversation
-- acheteur ↔ vendeur : badge « non lu », temps réel, visible sur le site et l'app.
-- Rejouable sans erreur.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Messages : type (ordinaire ou commande) et commande liée
-- ------------------------------------------------------------------------------
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'user';
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'messages_kind_check') THEN
    ALTER TABLE public.messages ADD CONSTRAINT messages_kind_check CHECK (kind IN ('user', 'order'));
  END IF;
END $$;

-- Les membres n'écrivent que des messages ordinaires : les messages de commande
-- viennent uniquement du trigger ci-dessous, impossible d'en fabriquer un faux.
DROP POLICY IF EXISTS "messages_insert_participants" ON public.messages;
CREATE POLICY "messages_insert_participants" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    AND kind = 'user'
    AND order_id IS NULL
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

-- ------------------------------------------------------------------------------
-- 2. Un message par étape, envoyé au nom de la personne qui a agi
-- ------------------------------------------------------------------------------
--   Réservation (site ou app)  → message de l'acheteur au vendeur
--   Remise                     → message du vendeur à l'acheteur
--   Réception confirmée        → message de l'acheteur au vendeur
--   Annulation                 → message de celui qui annule
CREATE OR REPLACE FUNCTION public.notify_order_event()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_title TEXT;
  v_price TEXT;
  v_sender UUID;
  v_content TEXT;
  v_conversation UUID;
BEGIN
  IF NEW.listing_id IS NULL OR NEW.buyer_id IS NULL OR NEW.seller_id IS NULL THEN
    RETURN NULL;
  END IF;
  IF TG_OP = 'UPDATE' AND NEW.status IS NOT DISTINCT FROM OLD.status THEN
    RETURN NULL;
  END IF;

  SELECT title INTO v_title FROM public.listings WHERE id = NEW.listing_id;
  v_price := replace(to_char(NEW.total_amount, 'FM999,999,999,999'), ',', ' ') || ' FCFA';

  IF TG_OP = 'INSERT' AND NEW.status IN ('pending', 'paid') THEN
    v_sender := NEW.buyer_id;
    v_content := format('Je viens de réserver « %s » (%s). Le lieu de remise et mon téléphone sont dans Mes commandes.', v_title, v_price);
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'shipped' THEN
    v_sender := NEW.seller_id;
    v_content := format('J''ai indiqué t''avoir remis « %s ». Confirme la réception dans Mes commandes quand tu l''as en main.', v_title);
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'delivered' THEN
    v_sender := NEW.buyer_id;
    v_content := format('J''ai bien reçu « %s ». La vente est terminée : tu peux laisser un avis dans Mes commandes.', v_title);
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'cancelled' THEN
    IF auth.uid() = NEW.buyer_id THEN
      v_sender := NEW.buyer_id;
      v_content := format('J''ai annulé ma réservation de « %s ». L''article est remis en vente.', v_title);
    ELSE
      v_sender := NEW.seller_id;
      v_content := format('J''ai annulé la vente de « %s ». L''article est remis en vente.', v_title);
    END IF;
  ELSE
    RETURN NULL;
  END IF;

  -- Conversation existante réutilisée, sinon créée
  INSERT INTO public.conversations (listing_id, buyer_id, seller_id)
  VALUES (NEW.listing_id, NEW.buyer_id, NEW.seller_id)
  ON CONFLICT (listing_id, buyer_id) DO NOTHING;

  SELECT id INTO v_conversation
  FROM public.conversations
  WHERE listing_id = NEW.listing_id AND buyer_id = NEW.buyer_id;

  INSERT INTO public.messages (conversation_id, sender_id, content, kind, order_id)
  VALUES (v_conversation, v_sender, v_content, 'order', NEW.id);

  RETURN NULL;
END $$;
REVOKE ALL ON FUNCTION public.notify_order_event() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_order_notify ON public.orders;
CREATE TRIGGER on_order_notify
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_order_event();
