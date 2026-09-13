-- ==============================================================================
-- Étape 2 : parcours fiables (audit du 13/09/2026)
-- I8 catégories manquantes · I10 prix positif et limites d'upload
-- Rejouable sans erreur.
-- ==============================================================================

-- Catégories proposées sur le site (menu, publication) mais absentes de la base :
-- leurs pages restaient vides et les annonces « Sneakers » n'avaient pas de catégorie.
INSERT INTO public.categories (name, slug) VALUES
  ('Sneakers', 'sneakers'),
  ('Accessoires', 'accessoires')
ON CONFLICT (slug) DO NOTHING;

-- Prix strictement positif pour toute nouvelle annonce ou modification.
-- NOT VALID : les annonces existantes ne sont pas revérifiées rétroactivement.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listings_price_positive') THEN
    ALTER TABLE public.listings
      ADD CONSTRAINT listings_price_positive CHECK (price > 0) NOT VALID;
  END IF;
END $$;

-- Photos : 10 Mo maximum, formats affichables par tous les navigateurs.
-- Le site compresse déjà les photos (~300 Ko) ; cette limite protège contre les
-- envois directs. Bloc isolé : s'il échoue, le reste de la migration est conservé.
DO $$
BEGIN
  UPDATE storage.buckets
  SET file_size_limit = 10485760,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
  WHERE id IN ('listing-images', 'avatars');
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Limites des buckets non appliquées (%) : à régler dans Storage > Settings.', SQLERRM;
END $$;
