"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function Register() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (termsAccepted) {
      setIsLoading(true);
      setErrorMsg('');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
            location: neighborhood,
          }
        }
      });
      
      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
      } else {
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          router.push('/'); // Redirection vers l'accueil ou le dashboard
        }, 1500);
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    
    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4 antialiased relative w-full">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-accent-yellow opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent-rose opacity-10 blur-[120px] rounded-full"></div>
      </div>
      
      <main className="w-full max-w-md bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 my-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <svg className="w-24 h-24" viewBox="0 0 280 263" xmlns="http://www.w3.org/2000/svg">
              <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"></path>
              <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"></path>
              <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"></path>
            </svg>
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center gap-1">
          <h1 className="text-3xl md:text-4xl text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
            Rejoins les
          </h1>
          <span className="text-3xl md:text-4xl italic text-[#e20020]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
            ADDIKT
          </span>
        </div>
        
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nom complet */}
          <div className="space-y-2">
            <label className="block font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold" htmlFor="fullName" style={{ fontFamily: '"Google Sans", sans-serif' }}>Nom complet</label>
            <input 
              value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="w-full border-2 border-outline-variant bg-transparent focus:outline-none focus:border-black transition-all font-body-sm p-4 text-on-surface placeholder:text-outline-variant" 
              id="fullName" name="fullName" placeholder="Ton blaze..." required type="text" 
            />
          </div>
          
          {/* Nom d'utilisateur */}
          <div className="space-y-2">
            <label className="block font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold" htmlFor="username" style={{ fontFamily: '"Google Sans", sans-serif' }}>Nom d'utilisateur</label>
            <input 
              value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-outline-variant bg-transparent focus:outline-none focus:border-black transition-all font-body-sm p-4 text-on-surface placeholder:text-outline-variant" 
              id="username" name="username" placeholder="ton_pseudo" required type="text" 
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label className="block font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold" htmlFor="email" style={{ fontFamily: '"Google Sans", sans-serif' }}>Adresse Email</label>
            <input 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-outline-variant bg-transparent focus:outline-none focus:border-black transition-all font-body-sm p-4 text-on-surface placeholder:text-outline-variant" 
              id="email" name="email" placeholder="hello@addikt.sn" required type="email" 
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <label className="block font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold" htmlFor="password" style={{ fontFamily: '"Google Sans", sans-serif' }}>Mot de passe</label>
            <input 
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-outline-variant bg-transparent focus:outline-none focus:border-black transition-all font-body-sm p-4 text-on-surface placeholder:text-outline-variant" 
              id="password" name="password" placeholder="••••••••" required type="password" minLength={6}
            />
          </div>
          
          {/* Quartier */}
          <div className="space-y-2 relative">
            <label className="block font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold" htmlFor="neighborhood" style={{ fontFamily: '"Google Sans", sans-serif' }}>Quartier de Dakar</label>
            <div className="relative">
              <select 
                value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full border-2 border-black rounded-none bg-transparent focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all appearance-none font-body-sm p-4 pr-12 text-on-surface cursor-pointer" id="neighborhood" name="neighborhood" required>
                <option disabled value="">Choisis ta zone...</option>
                <option value="sacre-coeur">Sacré-Cœur</option>
                <option value="mermoz">Mermoz</option>
                <option value="ouakam">Ouakam</option>
                <option value="point-e">Point E</option>
                <option value="yoff">Yoff</option>
                <option value="liberte-6">Liberté 6</option>
                <option value="ngor">Ngor</option>
                <option value="autre">Autre</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <span className="material-symbols-outlined text-on-surface">expand_more</span>
              </div>
            </div>
          </div>
          
          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-8">
            <div className="relative flex items-center h-5 mt-1">
              <input 
                className="peer w-6 h-6 border-2 border-outline-variant rounded-none appearance-none checked:bg-black cursor-pointer transition-colors" 
                id="terms" 
                name="terms" 
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="material-symbols-outlined absolute left-0.5 top-0.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 text-[20px]">check</span>
            </div>
            <label className="font-body-sm text-sm text-on-surface-variant cursor-pointer leading-relaxed" htmlFor="terms" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              J'accepte les <Link href="/terms" className="text-primary font-bold underline decoration-2 decoration-accent-rose hover:text-accent-rose transition-colors">conditions d'utilisation</Link> et la <Link href="/privacy" className="text-primary font-bold underline decoration-2 decoration-accent-rose hover:text-accent-rose transition-colors">politique de confidentialité</Link>.
            </label>
          </div>
          
          {errorMsg && (
            <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20">
              {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button 
            className={`w-full rounded-full py-4 px-6 font-button-text uppercase tracking-widest transition-all duration-200 flex justify-center items-center gap-2 mt-8 font-bold
              ${termsAccepted && !isSuccess ? 'bg-primary text-on-primary hover:bg-accent-yellow hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer' : ''}
              ${!termsAccepted ? 'bg-[#e2e2e2] text-[#848484] cursor-not-allowed opacity-50' : ''}
              ${isSuccess ? 'bg-green-500 text-white' : ''}
            `}
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
            disabled={!termsAccepted || isLoading || isSuccess}
            type="submit"
          >
            {isLoading ? (
              <><span className="material-symbols-outlined animate-spin">sync</span> Chargement...</>
            ) : isSuccess ? (
              <><span className="material-symbols-outlined">check</span> C'est carré !</>
            ) : (
              <>CRÉER MON COMPTE <span className="material-symbols-outlined">arrow_forward</span></>
            )}
          </button>
          
          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-[1px] border-outline-variant"></div>
            <span className="flex-shrink-0 mx-4 text-on-surface-variant font-label-caps uppercase text-xs font-bold" style={{ fontFamily: '"Google Sans", sans-serif' }}>ou</span>
            <div className="flex-grow border-t-[1px] border-outline-variant"></div>
          </div>
          
          {/* Phone Login */}
          <Link href="/phone-login" className="w-full bg-white border-2 border-black text-primary rounded-full py-4 px-6 font-button-text uppercase tracking-widest hover:bg-trust-grey transition-colors flex justify-center items-center gap-3 font-semibold whitespace-nowrap mb-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <span className="material-symbols-outlined shrink-0 text-xl">smartphone</span>
            S'inscrire par téléphone
          </Link>
          
          {/* Google Login */}
          <button type="button" onClick={handleGoogleSignIn} className="w-full bg-white border-2 border-black text-primary rounded-full py-4 px-6 font-button-text uppercase tracking-widest hover:bg-trust-grey transition-colors flex justify-center items-center gap-3 font-semibold whitespace-nowrap" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            S'inscrire avec Google
          </button>
        </form>
        
        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link className="font-button-text text-sm text-on-surface hover:text-accent-rose transition-colors underline decoration-2 decoration-black hover:decoration-accent-rose underline-offset-4 font-bold" style={{ fontFamily: '"Google Sans", sans-serif' }} href="/login">
            Déjà un compte ? <span className="text-accent-orange">Connecte-toi</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
