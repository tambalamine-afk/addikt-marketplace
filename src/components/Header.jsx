import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SUGGESTIONS = [
  "robe wax taille M",
  "sneakers Nike 42",
  "boubou homme XL",
  "jean vintage taille 38",
  "sac à main cuir",
  "veste jean femme",
  "ensemble Ankara",
  "chemise streetwear",
  "chaussures New Balance",
  "jupe midi wax"
];

function TypewriterSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isFocused || inputValue) return;

    let timer;
    const currentSuggestion = SUGGESTIONS[suggestionIndex];

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800); // pause 1.8s
    } else if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex(c => c - 1), 25);
      } else {
        setIsDeleting(false);
        setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
      }
    } else {
      if (charIndex < currentSuggestion.length) {
        timer = setTimeout(() => setCharIndex(c => c + 1), 50); // 50ms typing speed
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, suggestionIndex, isFocused, inputValue]);

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Rechercher un article, une marque, un style…"
        className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 px-11 text-[13px] sm:text-sm focus:outline-none focus:border-primary transition-colors"
        style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 400 }}
      />
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">search</span>
      
      {!(isFocused || inputValue) && (
        <label 
          className="absolute left-11 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[13px] sm:text-sm text-outline/70"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 400 }}
        >
          {SUGGESTIONS.map((sugg, idx) => (
            <span key={idx} style={{ display: idx === suggestionIndex ? 'inline' : 'none' }}>
              {idx === suggestionIndex ? sugg.substring(0, charIndex) : ''}
            </span>
          ))}
          <style>{`
            @keyframes blink {
              50% { opacity: 0; }
            }
          `}</style>
          <span className="inline-block w-[1.5px] h-[1.2em] bg-outline/70 ml-[2px]" style={{ animation: 'blink 0.8s step-start infinite' }}></span>
        </label>
      )}
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const isPublishPage = location.pathname === '/publish';
  const isLoggedIn = true; // Simuler l'état connecté pour l'UI

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
          <TypewriterSearch />
        </div>

        {/* Icons and Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Icône Messagerie (visible si connecté) */}
          {isLoggedIn && (
            <Link to="/messages" aria-label="Messages" className="text-primary hover:opacity-80 transition-opacity duration-200 flex items-center">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </Link>
          )}
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
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="bg-white border border-outline-variant text-primary px-5 py-2 rounded-full font-bold text-sm hover:bg-surface-variant transition-colors">
                  S'inscrire
                </Link>
                <Link to="/login" className="text-primary px-3 py-2 font-bold text-sm hover:underline">
                  Se connecter
                </Link>
              </>
            ) : (
              <Link to="/profile/me" className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant hover:opacity-80 transition-opacity ml-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Mon Profil" className="w-full h-full object-cover" />
              </Link>
            )}
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
