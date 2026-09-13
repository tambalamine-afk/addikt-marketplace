"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsSending(false);
    if (error) {
      setErrorMsg(
        error.status === 429
          ? "Trop de demandes d'affilée. Patiente quelques minutes puis réessaie."
          : "L'envoi a échoué. Vérifie l'adresse email et réessaie."
      );
      return;
    }
    setIsSent(true);
  };

  return (
    <div className="bg-surface-container-lowest text-primary min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-grid-gutter antialiased w-full">
      <main className="w-full max-w-sm flex flex-col items-center py-16">
        <h1 className="w-full text-xl md:text-2xl leading-tight text-center uppercase tracking-tight mb-6" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
          Mot de passe oublié
        </h1>

        {isSent ? (
          <div className="w-full flex flex-col gap-8 text-center">
            <p className="text-on-surface-variant leading-relaxed" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Si un compte existe pour <span className="font-bold text-primary break-all">{email.trim()}</span>, tu vas
              recevoir un email avec un lien pour choisir un nouveau mot de passe. Pense à regarder dans tes spams.
            </p>
            <Link href="/login" className="w-full bg-primary text-on-primary py-5 rounded-full uppercase tracking-widest font-bold text-center hover:opacity-80 transition-opacity" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <p className="text-center text-on-surface-variant leading-relaxed" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Entre l'adresse email de ton compte : on t'envoie un lien pour choisir un nouveau mot de passe.
            </p>

            <div className="flex items-center border-2 border-outline-variant focus-within:border-primary transition-colors bg-surface-container-lowest h-14">
              <input
                id="forgot-password-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 font-body-sm outline-none placeholder-secondary h-full"
                placeholder="Adresse email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            {errorMsg && (
              <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20">{errorMsg}</div>
            )}

            <button type="submit" disabled={isSending} className="w-full bg-primary text-on-primary py-5 rounded-full uppercase tracking-widest hover:opacity-80 active:scale-95 transition-all duration-200 font-bold disabled:opacity-50" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              {isSending ? 'Envoi…' : 'Recevoir le lien'}
            </button>

            <p className="text-center text-sm">
              <Link href="/login" className="text-secondary hover:text-primary hover:underline font-medium">
                Retour à la connexion
              </Link>
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
