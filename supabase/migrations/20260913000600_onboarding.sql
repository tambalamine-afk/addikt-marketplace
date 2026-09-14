-- ==============================================================================
-- Accueil après l'inscription : pseudo, photo, ville
-- Les membres inscrits par téléphone ou Google reçoivent un pseudo automatique ;
-- ils le choisissent sur la page /onboarding avant d'utiliser le site.
-- Rejouable sans erreur.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Profil « accueilli » ou non
-- ------------------------------------------------------------------------------
-- Le rattrapage ne s'exécute qu'à la création de la colonne : rejouer la migration
-- ne marque pas comme accueillis les membres inscrits entre-temps.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'onboarded_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN onboarded_at TIMESTAMPTZ;

    -- Membres existants : accueillis, sauf ceux qui ont gardé un pseudo automatique
    UPDATE public.profiles
    SET onboarded_at = coalesce(created_at, now())
    WHERE username !~ '^membre(_[0-9a-f]{4})?$';
  END IF;
END $$;
-- onboarded_at n'est pas dans les colonnes modifiables par le membre (voir étape 1) :
-- seule la fonction complete_onboarding le renseigne.

-- ------------------------------------------------------------------------------
-- 2. Inscription : accueilli d'office si le pseudo a été choisi dans le formulaire
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  meta JSONB := coalesce(new.raw_user_meta_data, '{}'::jsonb);
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, cover_url, location, onboarded_at)
  VALUES (
    new.id,
    public.generate_username(coalesce(nullif(meta->>'username', ''), split_part(new.email, '@', 1))),
    meta->>'full_name',
    meta->>'avatar_url',
    meta->>'cover_url',
    meta->>'location',
    CASE WHEN nullif(meta->>'username', '') IS NOT NULL THEN now() END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END $$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------------------------
-- 3. Terminer l'accueil
-- ------------------------------------------------------------------------------
-- Les messages d'erreur (SQLSTATE P0001) sont affichés tels quels à l'utilisateur.
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  p_username TEXT,
  p_full_name TEXT,
  p_location TEXT,
  p_avatar_url TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user UUID := auth.uid();
  v_username TEXT := lower(trim(coalesce(p_username, '')));
  v_location TEXT := trim(coalesce(p_location, ''));
  v_full_name TEXT := nullif(trim(coalesce(p_full_name, '')), '');
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Connecte-toi pour continuer.';
  END IF;

  IF v_username !~ '^[a-z0-9_.]{3,24}$' THEN
    RAISE EXCEPTION 'Ton pseudo doit faire entre 3 et 24 caractères : lettres sans accent, chiffres, point ou tiret bas.';
  END IF;

  IF v_username IN ('addikt', 'admin', 'administrateur', 'support', 'moderation', 'moderateur')
     OR v_username ~ '^membre(_[0-9a-f]{4})?$' THEN
    RAISE EXCEPTION 'Ce pseudo est réservé. Choisis-en un autre.';
  END IF;

  IF EXISTS (SELECT 1 FROM public.profiles WHERE username = v_username AND id != v_user) THEN
    RAISE EXCEPTION 'Ce pseudo est déjà pris. Choisis-en un autre.';
  END IF;

  IF v_location = '' THEN
    RAISE EXCEPTION 'Indique ta ville ou ton quartier.';
  END IF;

  IF char_length(v_location) > 80 OR char_length(coalesce(v_full_name, '')) > 80 THEN
    RAISE EXCEPTION 'Le nom et la ville ne doivent pas dépasser 80 caractères.';
  END IF;

  BEGIN
    UPDATE public.profiles
    SET username = v_username,
        full_name = v_full_name,
        location = v_location,
        avatar_url = coalesce(nullif(p_avatar_url, ''), avatar_url),
        onboarded_at = now()
    WHERE id = v_user;
  EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'Ce pseudo est déjà pris. Choisis-en un autre.';
  END;
END $$;
REVOKE ALL ON FUNCTION public.complete_onboarding(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_onboarding(TEXT, TEXT, TEXT, TEXT) TO authenticated;
