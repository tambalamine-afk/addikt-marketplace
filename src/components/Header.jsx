import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isPublishPage = location.pathname === '/publish';

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant w-full">
      {/* Top Row */}
      <div className="flex justify-between items-center px-container-margin w-full max-w-7xl mx-auto py-5">
        <Link to="/" className="flex items-center">
          <svg className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 280 263" xmlns="http://www.w3.org/2000/svg">
            <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"></path>
            <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"></path>
            <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"></path>
          </svg>
        </Link>
        
        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative items-center">
          <div className="relative w-full">
            <input type="text" placeholder="Rechercher des articles ou marques" className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 px-11 text-sm font-body-sm focus:outline-none focus:border-primary transition-colors" />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          </div>
        </div>

        {/* Icons and Auth Buttons */}
        <div className="flex items-center gap-4">
          <button aria-label="Favorites" className="text-primary hover:opacity-80 transition-opacity duration-200 flex items-center">
            <span className="material-symbols-outlined text-[24px]">favorite_border</span>
          </button>
          <button aria-label="Shopping Bag" className="text-primary hover:opacity-80 transition-opacity duration-200 flex items-center">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
          </button>
          
          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link to="/publish" className="bg-primary text-on-primary border border-primary px-5 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              Vendre
            </Link>
            <Link to="/register" className="bg-white border border-outline-variant text-primary px-5 py-2 rounded-full font-bold text-sm hover:bg-surface-variant transition-colors">
              S'inscrire
            </Link>
            <Link to="/login" className="text-primary px-3 py-2 font-bold text-sm hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Categories */}
      {!isPublishPage && (
        <div className="w-full border-t border-black/10">
          <div className="max-w-7xl mx-auto px-container-margin py-4">
            <nav className="flex items-center justify-center gap-12 overflow-x-auto hide-scrollbar">
              {['Femmes', 'Hommes', 'Enfants', 'Marques', 'Sports', 'Tendances'].map((cat) => (
                <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="text-primary hover:opacity-70 transition-opacity whitespace-nowrap" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700, fontSize: '15px' }}>
                  {cat}
                </Link>
              ))}
              <Link to="/promos" className="text-error hover:opacity-70 transition-opacity whitespace-nowrap" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700, fontSize: '15px' }}>
                Promos
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
