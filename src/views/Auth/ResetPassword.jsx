"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';

const MIN_PASSWORD_LENGTH = 8;

export default function ResetPassword() {
  // checking → ready → saving → done, ou invalid si le lien est expiré
  const [status, setStatus] = useState('checking');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const supabase = createClient();

  useEffect(() => {
    let isActive = true;

    // Le lien reçu par email ouvre une session temporaire : le client Supabase
    // échange le code présent dans l'URL pendant son initialisation.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isActive) setStatus((current) => (current === 'checking' ? (session ? 'ready' : 'invalid') : current));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN')) {
        setStatus((current) => (current === 'checking' || current === 'invalid' ? 'ready' : current));
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMsg(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
      return;
    }
    if (password !== confirmation) {
      setErrorMsg('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setStatus('saving');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMsg(
        error.code === 'same_password'
          ? "Choisis un mot de passe différent de l'ancien."
          : 'La modification a échoué. Demande un nouveau lien et réessaie.'
      );
      setStatus('ready');
      return;
    }
    setStatus('done');
  };

  const title = { fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 };
  const body = { fontFamily: '"Google Sans", sans-serif' };
  const primaryButton = 'w-full bg-primary text-on-primary py-5 rounded-full uppercase tracking-widest font-bold text-center hover:opacity-80 active:scale-95 transition-all duration-200 disabled:opacity-50';
  const inputBox = 'flex items-center border-2 border-outline-variant focus-within:border-primary transition-colors bg-surface-container-lowest h-14';
  const input = 'flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 font-body-sm outline-none placeholder-secondary h-full';

  return (
    <div className="bg-surface-container-lowest text-primary min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-grid-gutter antialiased w-full">
      <main className="w-full max-w-sm flex flex-col items-center py-16">
        <h1 className="w-full text-xl md:text-2xl leading-tight text-center uppercase tracking-tight mb-6" style={title}>
          Nouveau mot de passe
        </h1>

        {status === 'checking' && (
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Vérification du lien"></div>
        )}

        {status === 'invalid' && (
          <div className="w-full flex flex-col gap-8 text-center">
            <p className="text-on-surface-variant leading-relaxed" style={body}>
              Ce lien a expiré ou a déjà été utilisé. Demande un nouveau lien depuis le même appareil que celui où tu
              ouvres l'email.
            </p>
            <Link href="/forgot-password" className={primaryButton} style={{ fontFamily: title.fontFamily }}>
              Recevoir un nouveau lien
            </Link>
          </div>
        )}

        {status === 'done' && (
          <div className="w-full flex flex-col gap-8 text-center">
            <p className="text-on-surface-variant leading-relaxed" style={body}>
              Ton mot de passe est modifié. Tu es connecté.
            </p>
            <Link href="/profile/me" className={primaryButton} style={{ fontFamily: title.fontFamily }}>
              Aller à mon profil
            </Link>
          </div>
        )}

        {(status === 'ready' || status === 'saving') && (
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <p className="text-center text-on-surface-variant" style={body}>
              Au moins {MIN_PASSWORD_LENGTH} caractères.
            </p>
            <div className={inputBox}>
              <input id="reset-password-new" value={password} onChange={(e) => setPassword(e.target.value)} className={input} placeholder="Nouveau mot de passe" type="password" autoComplete="new-password" required />
            </div>
            <div className={inputBox}>
              <input id="reset-password-confirm" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className={input} placeholder="Confirme le mot de passe" type="password" autoComplete="new-password" required />
            </div>

            {errorMsg && (
              <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20">{errorMsg}</div>
            )}

            <button type="submit" disabled={status === 'saving'} className={primaryButton} style={{ fontFamily: title.fontFamily }}>
              {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
