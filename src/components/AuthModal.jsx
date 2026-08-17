"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAuthModal', handleOpen);
    return () => window.removeEventListener('openAuthModal', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm relative flex flex-col items-center p-8 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-black/50 hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        {/* Logo / Sticker */}
        <div className="w-20 h-20 mb-6 bg-primary text-white rounded-full flex items-center justify-center text-4xl shadow-md border-4 border-black overflow-hidden">
          {/* Defaulting to a nice visual, can replace with img src="/addikt-logo-eyes.svg" when ready */}
          <span className="material-symbols-outlined text-5xl">visibility</span>
        </div>

        {/* Title */}
        <h2 className="font-headline-lg text-xl sm:text-2xl text-black mb-2 whitespace-nowrap" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800 }}>
          Envie de nous rejoindre ?
        </h2>
        <p className="text-black/80 font-body-md text-center mb-8" style={{ fontFamily: '"Google Sans", sans-serif' }}>
          Inscris-toi ou connecte-toi pour continuer
        </p>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3 mb-6">
          <Link 
            href="/register" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-black text-white font-button-text font-bold text-center py-3.5 rounded-full hover:bg-black/90 transition-colors"
            style={{ fontFamily: '"Google Sans", sans-serif' }}
          >
            S'inscrire
          </Link>
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-white text-black border-2 border-black font-button-text font-bold text-center py-3.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ fontFamily: '"Google Sans", sans-serif' }}
          >
            Se connecter
          </Link>
        </div>

        {/* Separator */}
        <div className="w-full flex items-center gap-4 mb-6 text-black/40">
          <div className="h-px bg-black/20 flex-1"></div>
          <span className="font-body-sm text-sm uppercase tracking-widest font-semibold text-black/60">Ou</span>
          <div className="h-px bg-black/20 flex-1"></div>
        </div>

        {/* App Promo */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white border-2 border-black/10 rounded-xl p-2 mb-4 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-black/20 text-6xl">qr_code_2</span>
          </div>
          <h3 className="font-bold text-black text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Télécharge l'app gratuite Addikt</h3>
          <p className="text-black/60 text-sm mt-1">Scanne le QR code pour la télécharger</p>
        </div>
      </div>
    </div>
  );
}
