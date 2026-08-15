import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const categories = [
    { title: 'Femmes', link: '/category/femmes' },
    { title: 'Hommes', link: '/category/hommes' },
    { title: 'Enfants', link: '/category/enfants' },
    { title: 'Marques', link: '/category/marques' },
    { title: 'Sports', link: '/category/sports' },
    { title: 'Tendances', link: '/category/tendances' },
    { title: 'Promos', link: '/promos', isRed: true }
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[90]" 
        onClick={onClose}
      ></div>
      
      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[350px] bg-white z-[100] flex flex-col h-[100dvh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-black/10">
        <Link to="/" onClick={onClose} className="flex items-center">
          {/* Logo Addikt SVG */}
          <svg className="h-[36px] w-auto" id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.2 262.81">
            <defs>
              <style>
                {`
                  .cls-1 { fill: #fdffff; }
                  .cls-2 { fill: #191919; }
                  .cls-3 { fill: #e20020; }
                `}
              </style>
            </defs>
            <g id="Calque_1-2" data-name="Calque 1">
              <g>
                <g>
                  <path className="cls-3" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"/>
                  <path className="cls-1" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"/>
                  <path className="cls-1" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"/>
                </g>
                <g>
                  <path className="cls-2" d="M317.71,196.65h28.52l-40.72-84.51h-31.01l-40.84,84.51h26.39l7.44-16.33h42.79l7.41,16.33ZM276.14,161.38l12.8-28.1,12.76,28.1h-25.56Z"/>
                  <path className="cls-2" d="M404.23,112.14v31.03c-1.06-1.04-2.27-2.06-3.67-3.04-2.53-1.78-5.68-3.21-9.47-4.32-3.79-1.1-8.25-1.66-13.38-1.66-3.32,0-6.55.41-9.71,1.24-3.16.83-6.1,2.07-8.82,3.73s-5.13,3.75-7.22,6.27c-2.09,2.53-3.71,5.52-4.85,9-1.15,3.47-1.72,7.38-1.72,11.72,0,7.26,1.54,13.28,4.62,18.05,3.08,4.78,7.08,8.33,12.01,10.65s10.16,3.49,15.68,3.49c4.34,0,8.36-.45,12.07-1.36,3.71-.91,6.98-2.23,9.82-3.97,1.76-1.07,3.28-2.3,4.62-3.65v7.32h25.21v-84.51h-25.21ZM401.87,174.69c-.87,1.22-1.97,2.31-3.31,3.26-1.34.95-2.9,1.68-4.68,2.19-1.78.51-3.77.77-5.98.77-3.71,0-6.83-.69-9.35-2.07-2.52-1.38-4.4-3.2-5.62-5.44-1.22-2.25-1.84-4.64-1.84-7.16,0-1.58.22-3.08.65-4.5.43-1.42,1.1-2.74,2.01-3.97.91-1.22,2.03-2.31,3.37-3.25,1.34-.95,2.92-1.68,4.73-2.19,1.81-.51,3.83-.77,6.04-.77,3.71,0,6.79.69,9.23,2.07,2.45,1.38,4.28,3.18,5.51,5.39,1.22,2.21,1.83,4.62,1.83,7.22,0,1.5-.22,2.98-.65,4.44s-1.09,2.8-1.95,4.02Z"/>
                  <path className="cls-2" d="M496.44,112.14v31.03c-1.06-1.04-2.27-2.06-3.67-3.04-2.53-1.78-5.68-3.21-9.47-4.32-3.79-1.1-8.25-1.66-13.38-1.66-3.32,0-6.55.41-9.71,1.24-3.16.83-6.1,2.07-8.82,3.73s-5.13,3.75-7.22,6.27c-2.09,2.53-3.71,5.52-4.85,9-1.15,3.47-1.72,7.38-1.72,11.72,0,7.26,1.54,13.28,4.62,18.05,3.08,4.78,7.08,8.33,12.01,10.65s10.16,3.49,15.68,3.49c4.34,0,8.36-.45,12.07-1.36,3.71-.91,6.98-2.23,9.82-3.97,1.76-1.07,3.28-2.3,4.62-3.65v7.32h25.21v-84.51h-25.21ZM494.07,174.69c-.87,1.22-1.97,2.31-3.31,3.26-1.34.95-2.9,1.68-4.68,2.19-1.78.51-3.77.77-5.98.77-3.71,0-6.83-.69-9.35-2.07-2.52-1.38-4.4-3.2-5.62-5.44-1.22-2.25-1.84-4.64-1.84-7.16,0-1.58.22-3.08.65-4.5.43-1.42,1.1-2.74,2.01-3.97.91-1.22,2.03-2.31,3.37-3.25,1.34-.95,2.92-1.68,4.73-2.19,1.81-.51,3.83-.77,6.04-.77,3.71,0,6.79.69,9.23,2.07,2.45,1.38,4.28,3.18,5.51,5.39,1.22,2.21,1.83,4.62,1.83,7.22,0,1.5-.22,2.98-.65,4.44s-1.09,2.8-1.95,4.02Z"/>
                  <path className="cls-2" d="M533.72,196.65v-60.84h25.21v60.84h-25.21ZM533.84,129.77v-17.63h25.09v17.63h-25.09Z"/>
                  <path className="cls-2" d="M624.32,164.22c-1.54-1.5-3.49-2.76-5.86-3.79l32.43-24.62h-25.57l-33,25.88,8.74-49.55h-21.66l-14.91,84.51h21.66l2.38-13.27,9.69-7.2c2.05-1.5,4.24-2.23,6.57-2.19,2.33.04,4.16,1.32,5.5,3.85l10.77,18.82h24.03l-15.86-25.68c-1.74-3-3.37-5.25-4.91-6.75Z"/>
                  <path className="cls-2" d="M712.2,151.67v-15.86h-20.95v-16.45h-25.21v16.45h-13.97v15.86h13.97v24.15c0,6.55,1.97,11.66,5.92,15.33,3.95,3.67,9.23,5.51,15.86,5.51h24.38v-16.22h-12.19c-3.08,0-5.31-.79-6.69-2.37-1.38-1.58-2.07-3.75-2.07-6.51v-19.89h20.95Z"/>
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2">
          <span className="material-symbols-outlined text-[28px] font-light text-black">close</span>
        </button>
      </div>

      {/* Auth & Action Buttons */}
      <div className="flex flex-col px-4 py-6 gap-3">
        <Link to="/publish" onClick={onClose} className="w-full bg-[#1b1b1b] text-white font-bold py-3.5 rounded-full text-center text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
          Sell now
        </Link>
        <Link to="/register" onClick={onClose} className="w-full bg-white text-black border border-black/20 font-bold py-3.5 rounded-full text-center text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
          Sign up
        </Link>
        <button onClick={() => {
          // Trigger login logic or open login modal
          onClose();
        }} className="w-full bg-white text-black border border-black/20 font-bold py-3.5 rounded-full text-center text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
          Log in
        </button>
      </div>

      <div className="h-[1px] w-full bg-black/10"></div>

      {/* Categories */}
      <div className="flex flex-col w-full pb-2">
        {categories.map((cat, idx) => (
          <Link 
            key={idx} 
            to={cat.link}
            onClick={onClose}
            className={`flex justify-between items-center px-4 py-3 border-b border-black/5 ${cat.isRed ? 'text-error' : 'text-black'}`}
          >
            <span className="font-bold text-[14px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>{cat.title}</span>
            <span className="material-symbols-outlined font-light text-[22px] text-black">chevron_right</span>
          </Link>
        ))}
      </div>

      {/* App Promo Banner */}
      <div className="px-4 py-6 border-t border-black/10">
        <div className="bg-[#f0f2f5] rounded-xl flex items-center justify-between p-4 px-5 w-full">
          {/* L'étoile rouge avec les yeux */}
          <div className="flex-shrink-0 w-12 h-12 relative mr-3">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200">
              <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"/>
              <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"/>
              <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"/>
            </svg>
          </div>
          
          <div className="flex flex-col flex-1">
            <span className="text-[#333] text-[13px] mb-2" style={{ fontFamily: '"Google Sans", sans-serif' }}>Buy, sell & discover on the go</span>
            <div className="flex gap-2">
              <Link to="#">
                <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-[36px] w-auto" />
              </Link>
              <Link to="#">
                <img src="/google-play-badge.svg" alt="Get it on Google Play" className="h-[36px] w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / More from Addikt */}
      <div className="px-4 py-6 border-t border-black/10 text-sm">
        <h3 className="font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Plus sur Addikt</h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-2 text-[#333]">
          <Link to="/blog">Blog</Link>
          <Link to="/support">Support</Link>
          <Link to="/about">À propos</Link>
          <Link to="/terms">Conditions</Link>
          <Link to="/sell-info">Vendre sur Addikt</Link>
          <Link to="/privacy">Confidentialité</Link>
          <Link to="/affiliates">Affiliation</Link>
          <Link to="/safety">Sécurité</Link>
          <Link to="/jobs">Emplois</Link>
          <Link to="/sitemaps">Plan du site</Link>
          <Link to="/news">Actualités</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/app">Obtenir l'app</Link>
        </div>
      </div>
      
      {/* Bottom Footer: Social & Location */}
      <div className="px-4 py-6 pb-12 border-t border-black/10 flex flex-col gap-6">
        <div className="flex gap-4 items-center text-black">
          {/* Social Icons using text or material icons */}
          <Link to="#"><span className="material-symbols-outlined text-[22px]">photo_camera</span></Link>
          <Link to="#"><span className="material-symbols-outlined text-[22px]">flutter_dash</span></Link>
          <Link to="#"><span className="material-symbols-outlined text-[22px]">facebook</span></Link>
        </div>
        <div className="w-full border border-black/30 rounded p-2 flex flex-col relative">
          <span className="text-[10px] text-gray-500 mb-1">Select Location</span>
          <select className="bg-transparent font-medium outline-none text-sm appearance-none w-full cursor-pointer z-10" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            <option>France</option>
            <option>United States</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 z-0 pointer-events-none">expand_more</span>
        </div>
      </div>
      </div>
    </>
  );
}
