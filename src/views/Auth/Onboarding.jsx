"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../components/Providers';
import { compressImage } from '../../lib/images';
import { userFacingError } from '../../lib/orders';
import { safeNextPath } from '../../lib/redirect';

const display = { fontFamily: '"Zalando Sans Expanded", sans-serif' };
const body = { fontFamily: '"Google Sans", sans-serif' };
const inputBox = 'flex items-center border-2 border-outline-variant focus-within:border-primary transition-colors bg-surface-container-lowest h-14';
const input = 'flex-1 min-w-0 bg-transparent border-none focus:ring-0 px-4 py-2 font-body-sm outline-none placeholder-secondary h-full';

const USERNAME_PATTERN = /^[a-z0-9_.]{3,24}$/;
const AUTOMATIC_USERNAME = /^membre(_[0-9a-f]{4})?$/;

function OnboardingForm() {
  const { user, profile, setProfile, supabase, isLoadingAuth } = useContext(AppContext);
  const router = useRouter();
  const nextPath = safeNextPath(useSearchParams().get('next'));
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState(null); // { blob, extension, contentType, preview }
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPrefilled, setIsPrefilled] = useState(false);

  // Pré-remplit avec ce qui est déjà connu (Google fournit souvent le nom et la photo)
  useEffect(() => {
    if (!profile || isPrefilled) return;
    setUsername(AUTOMATIC_USERNAME.test(profile.username || '') ? '' : profile.username || '');
    setFullName(profile.full_name || '');
    setLocation(profile.location || '');
    setIsPrefilled(true);
  }, [profile, isPrefilled]);

  // Accueil déjà terminé : on repart vers la page demandée
  useEffect(() => {
    if (profile?.onboarded_at) router.replace(nextPath);
  }, [profile, nextPath, router]);

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErrorMsg('');
    try {
      const compressed = await compressImage(file);
      setAvatar({ ...compressed, preview: URL.createObjectURL(compressed.blob) });
    } catch (err) {
      setErrorMsg(err.message || "Cette photo n'a pas pu être lue.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUsername = username.trim().toLowerCase();
    if (!USERNAME_PATTERN.test(cleanUsername)) {
      setErrorMsg('Ton pseudo doit faire entre 3 et 24 caractères : lettres sans accent, chiffres, point ou tiret bas.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Indique ta ville ou ton quartier.');
      return;
    }

    setIsSaving(true);
    try {
      let avatarUrl = null;
      if (avatar) {
        const fileName = `${user.id}-${Date.now()}.${avatar.extension}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatar.blob, { contentType: avatar.contentType });
        if (uploadError) throw uploadError;
        avatarUrl = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
      }

      const { error } = await supabase.rpc('complete_onboarding', {
        p_username: cleanUsername,
        p_full_name: fullName,
        p_location: location,
        p_avatar_url: avatarUrl,
      });
      if (error) throw error;

      setProfile((current) => ({
        ...current,
        username: cleanUsername,
        full_name: fullName.trim() || null,
        location: location.trim(),
        avatar_url: avatarUrl || current?.avatar_url,
        onboarded_at: new Date().toISOString(),
      }));
      router.replace(nextPath);
    } catch (err) {
      console.error('Accueil :', err);
      setErrorMsg(userFacingError(err, "L'enregistrement a échoué. Vérifie ta connexion et réessaie."));
      setIsSaving(false);
    }
  };

  if (isLoadingAuth || !profile) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Chargement"></div>
      </div>
    );
  }

  const avatarPreview = avatar?.preview || profile.avatar_url;
  const initial = (username || profile.full_name || '?').charAt(0).toUpperCase();

  return (
    <div className="bg-surface-container-lowest text-primary min-h-screen flex flex-col justify-center items-center p-grid-gutter antialiased w-full">
      <main className="w-full max-w-sm flex flex-col items-center py-12">
        <h1 className="w-full text-xl md:text-2xl leading-tight text-center uppercase tracking-tight mb-3" style={{ ...display, fontWeight: 600 }}>
          Bienvenue sur Addikt
        </h1>
        <p className="text-center text-on-surface-variant leading-relaxed mb-8" style={body}>
          Présente-toi aux autres membres : un vrai pseudo et une photo rassurent acheteurs et vendeurs.
        </p>

        <form className="w-full space-y-6" onSubmit={handleSubmit} style={body}>
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-full overflow-hidden bg-surface-container border-2 border-outline-variant flex items-center justify-center hover:border-primary transition-colors"
              aria-label="Ajouter une photo de profil"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-on-surface-variant" style={display}>{initial}</span>
              )}
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-bold underline underline-offset-2">
              {avatarPreview ? 'Changer la photo' : 'Ajouter une photo (facultatif)'}
            </button>
            <input ref={fileInputRef} id="onboarding-photo" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>

          <label htmlFor="onboarding-username" className="flex flex-col gap-2 text-sm font-bold">
            Pseudo
            <div className={inputBox}>
              <span className="pl-4 text-on-surface-variant" aria-hidden="true">@</span>
              <input
                id="onboarding-username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                className={`${input} pl-1`}
                placeholder="awa_vintage"
                autoComplete="username"
                maxLength={24}
                required
              />
            </div>
            <span className="font-normal text-[13px] text-on-surface-variant">3 à 24 caractères : lettres sans accent, chiffres, point ou tiret bas.</span>
          </label>

          <label htmlFor="onboarding-full-name" className="flex flex-col gap-2 text-sm font-bold">
            Nom (facultatif)
            <div className={inputBox}>
              <input id="onboarding-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={input} placeholder="Awa Diop" autoComplete="name" maxLength={80} />
            </div>
          </label>

          <label htmlFor="onboarding-location" className="flex flex-col gap-2 text-sm font-bold">
            Ville ou quartier
            <div className={inputBox}>
              <input id="onboarding-location" value={location} onChange={(e) => setLocation(e.target.value)} className={input} placeholder="Dakar, Médina" autoComplete="address-level2" maxLength={80} required />
            </div>
          </label>

          {errorMsg && (
            <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20" role="alert">{errorMsg}</div>
          )}

          <button type="submit" disabled={isSaving} className="w-full bg-primary text-on-primary py-5 rounded-full uppercase tracking-widest hover:opacity-80 active:scale-95 transition-all duration-200 font-bold disabled:opacity-50" style={display}>
            {isSaving ? 'Enregistrement…' : "C'est parti"}
          </button>
        </form>
      </main>
    </div>
  );
}

// useSearchParams doit être sous une frontière Suspense pour le prérendu (Next 16)
export default function Onboarding() {
  return (
    <Suspense fallback={null}>
      <OnboardingForm />
    </Suspense>
  );
}
