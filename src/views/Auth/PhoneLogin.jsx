"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function PhoneLogin() {
  const [phone, setPhone] = useState('+221 ');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    // Assurer que le téléphone contient un + et le code pays. 
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      // Par défaut on rajoute +221 si pas de +
      formattedPhone = '+221' + formattedPhone.replace(/^0+/, ''); 
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });
    
    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    } else {
      router.push(`/verify-sms?phone=${encodeURIComponent(formattedPhone)}`);
    }
  };

  return (
    <div className="bg-surface-container-lowest text-primary min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-grid-gutter antialiased w-full">
      <main className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link href="/">
            <svg className="w-24 h-24" viewBox="0 0 280 263" xmlns="http://www.w3.org/2000/svg">
              <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"></path>
              <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"></path>
              <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"></path>
            </svg>
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center w-full mb-10">
          <h1 className="font-headline-lg text-headline-md uppercase tracking-tighter mb-3 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 900 }}>
            Connexion par <span className="italic text-accent-rose font-bold">SMS</span>
          </h1>
          <p className="font-body-md text-on-surface-variant font-medium">
            Saisis ton numéro pour recevoir le code
          </p>
        </div>
        
        {/* Form */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSendCode}>
          {/* Phone Input */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest font-bold" htmlFor="phone" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Numéro de téléphone
            </label>
            <div className="flex relative">
              <input 
                id="phone" 
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+221 77 123 45 67" 
                required 
                type="tel"
                className="w-full bg-white border-2 border-black rounded-none p-5 font-body-lg text-primary focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all duration-200 z-10" 
              />
            </div>
          </div>
          
          {errorMsg && (
            <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20">
              {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="w-full bg-primary text-on-primary font-button-text py-5 rounded-full uppercase tracking-widest hover:opacity-80 active:scale-95 transition-all duration-200 block text-center font-bold disabled:opacity-50" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            {isLoading ? 'Envoi...' : 'Envoyer le code'}
          </button>
        </form>
        
        {/* Footer Link */}
        <div className="mt-12 text-center w-full">
          <p className="font-body-sm text-on-surface-variant">
            Retour à l'{' '}
            <Link href="/register" className="text-accent-orange font-bold hover:underline transition-all">Inscription</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
