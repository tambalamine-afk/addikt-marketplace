"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import { AppContext } from './Providers';

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
    { title: 'Marques', link: '/category/marques' },
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
        <div className="flex justify-between items-center px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center">
            {/* Logo Addikt (simplified text or SVG) */}
            <span className="text-[#e20020] text-2xl font-bold tracking-tighter" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>addikt</span>
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
              <div className="flex gap-2">
                <Link href="#">
                  <img src="/app-store-badge.svg" alt="App Store" className="h-[28px] w-auto bg-black rounded" />
                </Link>
                <Link href="#">
                  <img src="/google-play-badge.svg" alt="Google Play" className="h-[28px] w-auto bg-black rounded" />
                </Link>
              </div>
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
          <Link href="/profile/me" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Mes achats</span>
          </Link>
          <Link href="/profile/settings" onClick={onClose} className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Paramètres</span>
          </Link>
          <Link href="#" onClick={onClose} className="flex justify-between items-center px-5 py-4">
            <span className="text-[#333] text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Centre de résolution</span>
          </Link>
        </div>

        {/* Footer / More from Addikt */}
        <div className="px-5 py-5 border-b border-black">
          <h3 className="font-bold mb-4 text-[#111] text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Plus sur Addikt</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-2 text-[#333] text-[14px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <Link href="/blog">Blog</Link>
            <Link href="#">Support</Link>
            <Link href="#">À propos</Link>
            <Link href="#">CGV</Link>
            <Link href="/publish">Vendre sur Addikt</Link>
            <Link href="#">Confidentialité</Link>
            <Link href="#">Affiliation</Link>
            <Link href="#">Sécurité</Link>
            <Link href="#">Jobs</Link>
            <Link href="#">Sitemaps</Link>
            <Link href="#">News</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
        
        {/* Bottom Footer: Social & Location */}
        <div className="px-5 py-5 pb-8 flex flex-col gap-6">
          {/* Socials */}
          <div className="flex gap-4 items-center">
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.33 6.33 6.33 6.33 0 006.33-6.33V8.75a8.12 8.12 0 004.34 1.25V6.55a8.21 8.21 0 01-2.41.14z"/>
              </svg>
            </a>
          </div>

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
