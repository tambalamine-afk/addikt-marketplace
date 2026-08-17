"use client";
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary w-full pt-28 mt-8 pb-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-container-margin flex flex-col md:flex-row justify-between mb-0 relative z-10">
        
        {/* Left Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 w-full md:w-[75%]">
          {/* ADDIKT */}
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xs uppercase mb-2 tracking-wider" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>ADDIKT</h3>
            <ul className="flex flex-col gap-3 text-[11px] opacity-80 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">À propos</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Notre mission</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Rejoindre l'équipe</li>
            </ul>
          </div>
          
          {/* VENDRE */}
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xs uppercase mb-2 tracking-wider" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>VENDRE</h3>
            <ul className="flex flex-col gap-3 text-[11px] opacity-80 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Vendre sur Addikt</li>
              <li>
                <Link href="/top-seller" className="hover:text-accent-orange cursor-pointer transition-colors block w-full">Programme Top vendeur</Link>
              </li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Devenir vendeur vérifié</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Guide du bon vendeur</li>
            </ul>
          </div>

          {/* COMMUNAUTÉ */}
          <div className="flex flex-col gap-4 relative">
            <h3 className="font-headline-md text-xs uppercase mb-2 tracking-wider" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>COMMUNAUTÉ</h3>
            <ul className="flex flex-col gap-3 text-[11px] opacity-80 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Devenir ambassadeur</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Groupe WhatsApp</li>
            </ul>
          </div>

          {/* RETROUVEZ-NOUS SUR */}
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xs uppercase mb-2 tracking-wider whitespace-nowrap" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>RETROUVEZ-NOUS SUR</h3>
            <div className="flex items-center w-full max-w-[200px] mt-1">
              <svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250.16 27.06" className="w-full h-auto">
                <defs>
                  <style>{`.soc-1, .soc-2 { fill: #fff; transition: fill 0.2s; } a:hover .soc-1, a:hover .soc-2 { fill: #00a6fb; } .soc-2 { fill-rule: evenodd; }`}</style>
                </defs>
                <g id="Calque_1-2" data-name="Calque 1">
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <path className="soc-1" d="M250.16,10.1c0-3.19-2.58-5.77-5.77-5.77h-14.76c-3.19,0-5.77,2.58-5.77,5.77v6.87c0,3.19,2.58,5.77,5.77,5.77h14.76c3.19,0,5.77-2.58,5.77-5.77v-6.87ZM241.48,14.04l-6.62,3.28c-.26.14-1.14-.05-1.14-.34v-6.72c0-.3.89-.49,1.15-.34l6.34,3.45c.27.15.54.54.28.68Z"/>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <g>
                      <path className="soc-1" d="M59.18,5.88c-.77,0-1.4.62-1.4,1.4s.62,1.4,1.4,1.4,1.4-.62,1.4-1.4-.62-1.4-1.4-1.4Z"/>
                      <path className="soc-1" d="M52.97,7.67c-3.23,0-5.86,2.63-5.86,5.86s2.63,5.86,5.86,5.86,5.86-2.63,5.86-5.86-2.63-5.86-5.86-5.86ZM52.97,17.28c-2.07,0-3.75-1.68-3.75-3.75s1.68-3.75,3.75-3.75,3.75,1.68,3.75,3.75-1.68,3.75-3.75,3.75Z"/>
                      <path className="soc-1" d="M57.63,25.43h-9.5c-3.94,0-7.15-3.21-7.15-7.15v-9.5c0-3.94,3.21-7.15,7.15-7.15h9.5c3.94,0,7.15,3.21,7.15,7.15v9.5c0,3.94-3.21,7.15-7.15,7.15ZM48.12,3.87c-2.71,0-4.91,2.2-4.91,4.91v9.5c0,2.71,2.2,4.91,4.91,4.91h9.5c2.71,0,4.91-2.2,4.91-4.91v-9.5c0-2.71-2.2-4.91-4.91-4.91h-9.5Z"/>
                    </g>
                  </a>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <path className="soc-1" d="M9.06,26.3v-11.18h3.73l.71-4.62h-4.44v-3c0-1.26.62-2.5,2.61-2.5h2.02V1.07s-1.83-.31-3.58-.31c-3.65,0-6.04,2.21-6.04,6.22v3.52H0v4.62h4.06v11.18h5Z"/>
                  </a>
                  {/* TikTok */}
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                    <path className="soc-2" d="M189.3,17.55c-.02.08-.04.14-.06.2-.97,3.8-1.08,4.65-2.08,6.41-.48.84-1.01,1.63-1.6,2.4-.07.09-.13.2-.26.17-.15-.03-.16-.16-.17-.28-.16-1.15-.25-2.31-.21-3.48.05-1.52.24-2.04,2.2-10.28.03-.13,0-.23-.05-.34-.47-1.26-.56-2.55-.15-3.85.89-2.81,4.07-3.02,4.63-.71.34,1.43-.56,3.31-1.26,6.08-.58,2.29,2.12,3.91,4.42,2.24,2.12-1.54,2.95-5.23,2.79-7.85-.31-5.22-6.03-6.34-9.66-4.66-4.16,1.92-5.11,7.08-3.23,9.44.24.3.42.48.34.79-.12.47-.23.95-.36,1.42-.1.35-.39.48-.74.33-.69-.28-1.27-.72-1.74-1.3-1.6-1.98-2.05-5.88.06-9.19,2.34-3.66,6.68-5.15,10.65-4.7,4.74.54,7.73,3.78,8.3,7.45.26,1.67.07,5.8-2.28,8.72-2.7,3.35-7.08,3.57-9.1,1.52-.16-.16-.28-.34-.43-.53Z"/>
                  </a>
                  {/* Pinterest */}
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
                    <path className="soc-1" d="M156.52,10.95c-.22.02-.44.03-.67.03-2.44,0-4.71-1.23-6.04-3.27v11.12c0,4.54-3.68,8.22-8.22,8.22s-8.22-3.68-8.22-8.22,3.68-8.22,8.22-8.22h0c.17,0,.34.02.51.03v4.05c-.17-.02-.33-.05-.51-.05-2.32,0-4.2,1.88-4.2,4.2s1.88,4.2,4.2,4.2,4.36-1.83,4.36-4.14l.04-18.89h3.88c.37,3.48,3.17,6.19,6.65,6.45v4.5"/>
                  </a>
                  {/* X / Twitter */}
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X">
                    <path className="soc-1" d="M100.81,12.97l7.44-8.65h-1.76l-6.46,7.51-5.16-7.51h-5.95l7.8,11.36-7.8,9.07h1.76l6.82-7.93,5.45,7.93h5.95l-8.09-11.78h0ZM98.39,15.78l-.79-1.13-6.29-9h2.71l5.08,7.26.79,1.13,6.6,9.44h-2.71l-5.38-7.7h0Z"/>
                  </a>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Buttons section */}
        <div className="flex flex-col items-start md:items-end gap-3 mt-12 md:mt-0 md:w-[25%]">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                document.getElementById('header-search-input')?.focus();
              }, 500);
            }}
            className="bg-[#e20020] text-white w-48 h-12 rounded-full flex items-center justify-between px-1.5 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="font-bold text-sm ml-5" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Recherche</span>
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
          </button>
          
          <Link href="/register" className="bg-[#3B82F6] text-white w-48 h-12 rounded-full flex items-center justify-between px-1.5 hover:scale-105 active:scale-95 transition-all duration-200">
            <span className="font-bold text-sm ml-5" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>S'inscrire</span>
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </Link>

          <div className="mt-8 text-left md:text-right flex flex-col gap-2 text-xs opacity-70" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <p>© 2024. Tous droits réservés</p>
            <p className="hover:text-accent-orange cursor-pointer transition-colors">Politique de confidentialité</p>
          </div>
        </div>
      </div>
      
      {/* Huge Logo at the bottom (unchanged) */}
      <div className="w-full flex justify-center items-end mt-0 px-4 relative z-0">
        <div className="h-[200px] sm:h-[300px] md:h-[450px] w-full max-w-[1400px] flex items-end justify-center">
          <svg className="w-full h-full mx-auto" viewBox="0 0 352.87 130.21" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
            <defs><style>{`.cls-footer-1 { fill: #fdffff; } .cls-footer-2 { fill: #e20020; }`}</style></defs>
            <g>
              <g>
                <path className="cls-footer-2" d="M107.61,0l-2.17,48.88c-.05.94.84,1.66,1.75,1.41l29.02-9.7-17.89,30.33c-.66.56-.65,1.58.02,2.12l20.92,30.23-37.64-8.27c-.78-.11-1.49.45-1.57,1.24l-4.68,33.96-18-22.57c-.37-.83-1.41-1.08-2.12-.52l-40.92,19.51,19.77-36.29c.42-.82-.07-1.82-.98-2L0,80.14l58.67-18.39c.76-.24,1.16-1.08.87-1.82l-9.64-34.91,29.54,21.63c.67.49,1.62.29,2.03-.43L107.61,0Z"></path>
                <path className="cls-footer-1" d="M79.07,79.15c-2.79,11.2-8.89,19.63-13.61,18.81s-6.29-10.55-3.49-21.76c2.79-11.2,8.89-19.63,13.61-18.81,4.72.81,6.29,10.55,3.49,21.76Z"></path>
                <path className="cls-footer-1" d="M101.01,78.36c-3.46,12.05-10.56,20.92-15.86,19.8s-6.79-11.79-3.33-23.85c3.46-12.05,10.56-20.92,15.86-19.8,5.3,1.12,6.79,11.79,3.33,23.85Z"></path>
              </g>
              <g>
                <path className="cls-footer-1" d="M157.42,97.43h14.13l-20.17-41.87h-15.36l-20.23,41.87h13.08l3.69-8.09h21.2l3.67,8.09ZM136.82,79.96l6.34-13.92,6.32,13.92h-12.66Z"></path>
                <path className="cls-footer-1" d="M200.28,55.56v15.38c-.53-.52-1.13-1.02-1.82-1.51-1.25-.88-2.82-1.59-4.69-2.14-1.88-.55-4.09-.82-6.63-.82-1.64,0-3.25.21-4.81.62-1.56.41-3.02,1.03-4.37,1.85s-2.54,1.86-3.58,3.11c-1.04,1.25-1.84,2.74-2.4,4.46-.57,1.72-.85,3.66-.85,5.81,0,3.6.76,6.58,2.29,8.94,1.52,2.37,3.51,4.13,5.95,5.28s5.03,1.73,7.77,1.73c2.15,0,4.14-.22,5.98-.67,1.84-.45,3.46-1.1,4.87-1.96.87-.53,1.63-1.14,2.29-1.81v3.63h12.49v-41.87h-12.49ZM199.11,86.55c-.43.61-.98,1.14-1.64,1.61-.67.47-1.44.83-2.32,1.08-.88.25-1.87.38-2.96.38-1.84,0-3.38-.34-4.63-1.03-1.25-.68-2.18-1.58-2.79-2.7-.61-1.11-.91-2.3-.91-3.55,0-.78.11-1.53.32-2.23.21-.7.55-1.36,1-1.96.45-.61,1.01-1.14,1.67-1.61.66-.47,1.45-.83,2.35-1.08.9-.25,1.9-.38,2.99-.38,1.84,0,3.36.34,4.57,1.03,1.21.68,2.12,1.57,2.73,2.67.61,1.09.91,2.29.91,3.58,0,.74-.11,1.48-.32,2.2s-.54,1.39-.97,1.99Z"></path>
                <path className="cls-footer-1" d="M245.97,55.56v15.38c-.53-.52-1.13-1.02-1.82-1.51-1.25-.88-2.82-1.59-4.69-2.14-1.88-.55-4.09-.82-6.63-.82-1.64,0-3.25.21-4.81.62-1.56.41-3.02,1.03-4.37,1.85s-2.54,1.86-3.58,3.11c-1.04,1.25-1.84,2.74-2.4,4.46-.57,1.72-.85,3.66-.85,5.81,0,3.6.76,6.58,2.29,8.94,1.52,2.37,3.51,4.13,5.95,5.28s5.03,1.73,7.77,1.73c2.15,0,4.14-.22,5.98-.67,1.84-.45,3.46-1.1,4.87-1.96.87-.53,1.63-1.14,2.29-1.81v3.63h12.49v-41.87h-12.49ZM244.79,86.55c-.43.61-.98,1.14-1.64,1.61-.67.47-1.44.83-2.32,1.08-.88.25-1.87.38-2.96.38-1.84,0-3.38-.34-4.63-1.03-1.25-.68-2.18-1.58-2.79-2.7-.61-1.11-.91-2.3-.91-3.55,0-.78.11-1.53.32-2.23.21-.7.55-1.36,1-1.96.45-.61,1.01-1.14,1.67-1.61.66-.47,1.45-.83,2.35-1.08.9-.25,1.9-.38,2.99-.38,1.84,0,3.36.34,4.57,1.03,1.21.68,2.12,1.57,2.73,2.67.61,1.09.91,2.29.91,3.58,0,.74-.11,1.48-.32,2.2s-.54,1.39-.97,1.99Z"></path>
                <path className="cls-footer-1" d="M264.44,97.43v-30.14h12.49v30.14h-12.49ZM264.5,64.3v-8.74h12.43v8.74h-12.43Z"></path>
                <path className="cls-footer-1" d="M309.33,81.36c-.76-.74-1.73-1.37-2.9-1.88l16.07-12.2h-12.67l-16.35,12.82,4.33-24.55h-10.73l-7.39,41.87h10.73l1.18-6.58,4.8-3.57c1.02-.74,2.1-1.1,3.25-1.08,1.15.02,2.06.66,2.73,1.91l5.34,9.32h11.9l-7.86-12.73c-.86-1.49-1.67-2.6-2.43-3.34Z"></path>
                <path className="cls-footer-1" d="M352.87,75.15v-7.86h-10.38v-8.15h-12.49v8.15h-6.92v7.86h6.92v11.96c0,3.25.98,5.78,2.93,7.59,1.96,1.82,4.57,2.73,7.86,2.73h12.08v-8.03h-6.04c-1.52,0-2.63-.39-3.31-1.17-.68-.78-1.03-1.86-1.03-3.23v-9.85h10.38Z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </footer>
  );
}
