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
        <div className="flex justify-center mb-6">
          <svg className="w-24 h-24" viewBox="0 0 280 263" xmlns="http://www.w3.org/2000/svg">
            <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"></path>
            <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"></path>
            <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"></path>
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-headline-lg text-xl sm:text-2xl text-black mb-2 whitespace-nowrap uppercase" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800 }}>
          Rejoins ADDIKT
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
