"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import { AppContext } from './Providers';
import SupportLink from './SupportLink';

export default function MobileMenu({ isOpen, onClose }) {
  const { user, profile, supabase } = useContext(AppContext);
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'MO';
  };

  if (!isOpen) return null;

  const categories = [
    { title: 'Femmes', link: '/category/femmes' },
    { title: 'Hommes', link: '/category/hommes' },
    { title: 'Enfants', link: '/category/enfants' },
    { title: 'Marques', link: '/category/marques' }
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
        <div className="flex justify-between items-center px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center">
            <svg className="h-[28px] w-auto" id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.2 262.81">
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
            <span className="material-symbols-outlined text-[28px] font-light text-[#111]">close</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-col w-full">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.link}
              onClick={onClose}
              className={`flex justify-between items-center px-5 py-4 border-b border-gray-100 ${cat.isRed ? 'text-[#e20020]' : 'text-[#111]'}`}
            >
              <span className="font-bold text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>{cat.title}</span>
              <span className="material-symbols-outlined font-light text-[20px]">arrow_forward</span>
            </Link>
          ))}
        </div>

        {/* App Promo Banner */}
        <div className="px-4 py-5 border-b border-black">
          <div className="bg-[#f0f2f5] rounded-xl flex items-center p-3 px-4 w-full">
            {/* Logo App Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-[#e20020] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-2xl font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>a</span>
            </div>
            
            <div className="flex flex-col flex-1 justify-center">
              <span className="text-[#111] text-[13px] font-medium mb-1.5" style={{ fontFamily: '"Google Sans", sans-serif' }}>Achetez, vendez, découvrez</span>
              <span className="text-[12px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>L'app arrive bientôt sur iOS et Android</span>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="flex flex-col w-full border-b border-black">
          <Link href="/profile/me" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Mon profil</span>
            {isLoggedIn && profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
            ) : isLoggedIn ? (
               <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-[10px] font-bold">{getInitials()}</div>
            ) : null}
          </Link>
          <Link href="/publish" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vendre</span>
          </Link>
          <Link href="/profile/me" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Espace vendeur</span>
          </Link>
          <Link href="/orders" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Mes commandes</span>
          </Link>
          <Link href="/profile/settings" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Paramètres</span>
          </Link>
          <SupportLink onClick={onClose} className="flex justify-between items-center px-5 py-4">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Aide et contact</span>
          </SupportLink>
        </div>

        {/* Footer / More from Addikt */}
        <div className="px-5 py-5 border-b border-black">
          

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-2 text-[#333] text-[14px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <SupportLink onClick={onClose}>Support</SupportLink>
            <Link href="#">À propos</Link>
            <Link href="/terms" onClick={onClose}>Conditions d'utilisation</Link>
            <Link href="/publish">Vendre sur Addikt</Link>
            <Link href="/privacy" onClick={onClose}>Confidentialité</Link>
            <Link href="#">Notre mission</Link>
            <Link href="/top-seller" onClick={onClose}>Programme Top vendeur</Link>
            <Link href="#">Devenir ambassadeur</Link>
            <Link href="#">Groupe WhatsApp</Link>
          </div>
        </div>
        
        {/* Bottom Footer: Location */}
        <div className="px-5 py-5 pb-8 flex flex-col gap-6">

          {/* Location Select */}
          <div className="w-full border border-gray-300 rounded flex flex-col relative px-3 py-1.5 mt-2">
            <span className="text-[11px] text-gray-500 mb-0.5">Select Location</span>
            <select className="bg-transparent font-medium outline-none text-[15px] appearance-none w-full cursor-pointer z-10 text-[#111]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              <option value="sn">Sénégal</option>
              <option value="ci">Côte d'Ivoire</option>
              <option value="ml">Mali</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 text-gray-500 z-0 pointer-events-none">expand_more</span>
          </div>

          {/* Login/Logout */}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/login" onClick={onClose} className="font-bold text-[#111] text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Log in
              </Link>
              <Link href="/register" onClick={onClose} className="font-bold text-[#111] text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Sign up
              </Link>
            </div>
          ) : (
            <div className="mt-2">
              <button onClick={handleLogout} className="font-bold text-[#111] text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
