"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef, useContext } from 'react';
import MobileMenu from './MobileMenu';
import { AppContext } from './Providers';

const MEGAMENU_DATA = {
  Femmes: {
    shopByCategory: ['Hauts', 'Jeans', 'Pulls', 'Jupes', 'Robes', 'Manteaux & Vestes', 'Chaussures', 'Sacs & Accessoires', 'Lunettes de soleil', 'Chapeaux', 'Bijoux', 'Grandes tailles'],
    featured: ['Essentiels de la garde-robe', 'Tout en jean', 'Sneakers lifestyle', 'Tenues de bureau', 'Tenues de sport']
  },
  Hommes: {
    shopByCategory: ['T-shirts & Polos', 'Jeans', 'Pulls & Sweats', 'Pantalons', 'Costumes', 'Manteaux & Vestes', 'Chaussures', 'Sacs à dos', 'Lunettes de soleil', 'Casquettes', 'Montres', 'Grandes tailles'],
    featured: ['Essentiels de la garde-robe', 'Streetwear', 'Sneakers lifestyle', 'Tenues de bureau', 'Tenues de sport']
  },
  Enfants: {
    shopByCategory: ['Bébé (0-36 mois)', 'Filles (2-14 ans)', 'Garçons (2-14 ans)', 'T-shirts', 'Pantalons & Jeans', 'Robes & Jupes', 'Pulls & Sweats', 'Manteaux', 'Chaussures', 'Jouets', 'Livres', 'Puériculture'],
    featured: ['Rentrée scolaire', 'Nouveautés bébé', 'Les indispensables', 'Tenues de fête', 'Vêtements d\'extérieur']
  },
  Beauté: {
    shopByCategory: ['Bain & Corps', 'Parfums', 'Soins des cheveux', 'Maquillage', 'Soins de la peau', 'Outils & Accessoires', 'Soins hommes', 'Solaires', 'Vegan & Naturel', 'Idées cadeaux', 'Mini formats', 'Autre'],
    featured: ['Les best-sellers', 'Nouveautés beauté', 'Routine anti-imperfections', 'Glow naturel', 'Essentiels voyage']
  },
  Marques: {
    shopByCategory: ['Nike', 'Zara', 'Levi\'s', 'Tongoro Studio', 'Fait main local', 'Adidas', 'Puma', 'H&M', 'Mango', 'Asos', 'Bershka', 'Calvin Klein'],
    featured: ['Les plus recherchées', 'Créateurs locaux', 'Marques éco-responsables', 'Premium', 'Luxe de seconde main']
  },
  Sports: {
    shopByCategory: ['Running', 'Fitness & Training', 'Football', 'Basketball', 'Natation', 'Yoga & Pilates', 'Randonnée', 'Cyclisme', 'Sports de raquette', 'Vêtements', 'Chaussures', 'Accessoires'],
    featured: ['Nouveautés sport', 'Essentiels fitness', 'Meilleurs équipements', 'Tenues de match', 'Marques de sport']
  },
  Tendances: {
    shopByCategory: ['Y2K', 'Streetwear', 'Minimaliste', 'Vintage 90s', 'Bohème', 'Preppy', 'Gorpcore', 'Grunge', 'Pastel', 'Imprimés animaliers', 'Couleurs fluo', 'Denim sur denim'],
    featured: ['Les looks du moment', 'Inspirations influenceurs', 'Les pièces virales', 'Sélection vintage', 'Style urbain']
  }
};

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
  const navigate = useRouter();
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      setIsFocused(false);
      e.target.blur(); // Remove focus
    }
  };
  
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
        id="header-search-input"
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
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
  const pathname = usePathname();
  const isPublishPage = pathname === '/publish';
  const isProfilePage = pathname.startsWith('/profile');
  const hideCategories = isPublishPage || isProfilePage;
  
  const { user, profile, supabase } = useContext(AppContext);
  const isLoggedIn = !!user;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Open AuthModal by dispatching custom event
    window.dispatchEvent(new Event('openAuthModal'));
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

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant w-full">
      {/* Top Row */}
      <div className="flex justify-between items-center px-container-margin w-full max-w-7xl mx-auto py-2.5">
        
        {/* Mobile Hamburger & Logo (Left) */}
        <div className="flex lg:hidden flex-1 justify-start items-center">
          <button aria-label="Open mobile menu" onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 mr-1 text-primary">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
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
        </div>
        
        {/* Logo Desktop */}
        <div className="hidden lg:flex lg:flex-none justify-start">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <svg className="h-[45px] w-auto" id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.2 262.81">
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
        </div>
        
        {/* Search Bar (Desktop only) */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative items-center">
          <TypewriterSearch />
        </div>

        {/* Icons and Auth Buttons (Right) */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 lg:flex-none justify-end">
          {/* Icône Messagerie (visible si connecté) */}
          {isLoggedIn && (
            <Link href="/messages" aria-label="Messages" className="hidden sm:flex text-primary hover:opacity-80 transition-opacity duration-200 items-center">
              <svg viewBox="-5 -5 145 125" className="w-[26px] h-auto fill-primary">
                <path d="M132.92,27.45c-2.55-11.53-13.74-22.1-25.3-24.35C100.85,1.75,82.43.09,69.46.09c-.53,0-1.04,0-1.55,0-.51,0-1.02,0-1.55,0C53.4.09,34.98,1.75,28.21,3.11,16.64,5.35,5.46,15.92,2.9,27.45,1.45,34.46.02,43.98,0,56.99c.02,13.01,1.45,22.53,2.9,29.54,2.55,11.53,13.74,22.1,25.3,24.35,6.78,1.35,25.19,3.01,38.16,3.01.53,0,1.04,0,1.55,0,.51,0,1.02,0,1.55,0,12.97,0,31.39-1.66,38.16-3.01,11.57-2.24,22.75-12.81,25.3-24.35,1.45-7,2.88-16.53,2.9-29.54-.02-13.01-1.45-22.53-2.9-29.54h0ZM30.13,13s.04,0,.06-.01c5.68-1.14,23.37-2.82,36.19-2.82.49,0,.97,0,1.44,0h.22c.47,0,.94,0,1.42,0h.01c12.81,0,30.5,1.68,36.18,2.82.02,0,.04,0,.06.01,6.94,1.35,14.03,7.58,16.64,14.25l-54.43,24.73L13.48,27.25c2.61-6.67,9.71-12.91,16.64-14.25h0ZM123.07,84.41c-1.69,7.49-9.63,15.07-17.37,16.57-.02,0-.04,0-.06.01-5.68,1.14-23.37,2.82-36.18,2.82-.49,0-.97,0-1.44,0h-.22c-.47,0-.95,0-1.44,0-12.81,0-30.51-1.68-36.19-2.82-.02,0-.04,0-.06-.01-7.74-1.5-15.68-9.08-17.37-16.57-1.81-8.74-2.66-17.46-2.68-27.41.01-7.01.44-13.4,1.32-19.61l54.43,24.73c.66.3,1.37.45,2.09.45s1.42-.15,2.09-.45l54.43-24.73c.88,6.22,1.31,12.6,1.32,19.61-.02,9.96-.87,18.68-2.68,27.41h0Z"/>
              </svg>
            </Link>
          )}
          <Link href="/favorites" aria-label="Favorites" className="hidden sm:flex text-primary hover:opacity-80 transition-opacity duration-200 items-center">
            <svg viewBox="-5 -5 140 125" className="w-[26px] h-auto fill-primary">
              <g transform="translate(-150, 0)">
                <path d="M219.43,114.03c-.95,0-1.9-.25-2.75-.74-17.69-10.22-59.04-37.92-61.06-74.41-1.02-18.56,7.71-32.95,22.77-37.54,12.1-3.69,28.67-.08,41.04,15.28,12.37-15.36,28.94-18.97,41.04-15.28,15.06,4.6,23.79,18.98,22.77,37.54-1.94,35.19-39.09,61.73-61.06,74.41-.85.49-1.8.74-2.75.74ZM187.62,10.99c-2.13,0-4.16.3-6.02.87-9.98,3.05-15.73,13.17-15,26.42,1.62,29.47,35.52,53.48,52.82,63.87,17.3-10.38,51.2-34.4,52.83-63.87.73-13.25-5.02-23.37-15-26.41-9.62-2.93-23.59,1.25-33.1,17.21-.99,1.66-2.79,2.68-4.72,2.68h0c-1.94,0-3.73-1.02-4.72-2.68-7.67-12.87-18.23-18.08-27.08-18.08Z"/>
              </g>
            </svg>
          </Link>
          
          <Link href="/cart" aria-label="Shopping Bag" className="text-primary hover:opacity-80 transition-opacity duration-200 flex items-center">
            <svg viewBox="-5 -5 130 125" className="w-[24px] h-auto fill-primary">
              <g transform="translate(-305, 0)">
                <path d="M326.27,114.02h80.29c6.88,0,13.36-3.02,17.79-8.29,4.42-5.26,6.28-12.15,5.11-18.91l-11.55-66.58c-.02-.13-.1-.23-.13-.35-.06-.25-.15-.48-.26-.72-.13-.31-.29-.58-.48-.85-.14-.2-.29-.38-.46-.55-.26-.26-.54-.47-.85-.66-.13-.08-.22-.21-.35-.28l-3.04-1.51-1.95-11.33c-.03-.16-.12-.29-.16-.45-.06-.25-.15-.48-.26-.71-.15-.33-.34-.62-.56-.9-.09-.12-.13-.26-.24-.38-.06-.06-.13-.08-.19-.13-.29-.27-.61-.48-.95-.67-.17-.09-.32-.22-.49-.29-.39-.16-.81-.22-1.23-.27-.15-.02-.29-.08-.45-.08-.02,0-.05-.01-.08-.01h-78.7s-.04.02-.06.02c-.18,0-.33.07-.5.09-.41.05-.81.11-1.18.26-.18.08-.33.2-.5.29-.34.19-.67.39-.95.67-.06.06-.13.08-.19.13-.11.11-.15.26-.23.38-.22.28-.41.58-.57.9-.11.23-.19.46-.26.71-.04.15-.13.29-.16.45l-1.95,11.33-3.04,1.51c-.14.07-.22.19-.35.28-.31.19-.59.4-.85.66-.18.18-.32.35-.46.55-.19.26-.34.55-.48.85-.11.23-.2.46-.26.72-.04.12-.11.22-.13.35l-11.55,66.58c-1.18,6.76.69,13.65,5.11,18.91,4.43,5.27,10.91,8.29,17.79,8.29h0ZM338.85,9.52l-.02-.02h55.18l-.02.02c-1.11,1.05-1.64,2.58-1.41,4.09.16,1.07.69,2.03,1.47,2.74h-55.24c.77-.72,1.3-1.67,1.47-2.74.22-1.51-.3-3.04-1.41-4.09h0ZM312.63,88.43l10.88-62.69h85.82l10.88,62.7c.7,4.02-.41,8.12-3.04,11.25-2.64,3.13-6.5,4.94-10.6,4.94h-80.29c-4.1,0-7.96-1.8-10.6-4.95-2.64-3.13-3.74-7.24-3.04-11.26h0Z"/>
                <path d="M366.42,69.87c15.45,0,28.03-12.57,28.03-28.03,0-2.59-2.1-4.7-4.7-4.7s-4.7,2.1-4.7,4.7c0,10.27-8.36,18.63-18.63,18.63s-18.63-8.36-18.63-18.63c0-2.59-2.1-4.7-4.7-4.7s-4.7,2.1-4.7,4.7c0,15.45,12.57,28.03,28.03,28.03Z"/>
              </g>
            </svg>
          </Link>
          
          {!isLoggedIn && (
            <Link href="/register" className="lg:hidden bg-[#1b1b1b] text-white px-3 py-1.5 rounded text-sm font-bold ml-1" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              S'inscrire
            </Link>
          )}
          
          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link href="/publish" className="bg-primary text-on-primary border border-primary px-5 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
              Vendre
            </Link>
            {!isLoggedIn ? (
              <>
                <Link href="/register" className="bg-white border border-outline-variant text-primary px-5 py-2 rounded-full font-bold text-sm hover:bg-surface-variant transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
                  S'inscrire
                </Link>
                <Link href="/login" className="text-primary px-3 py-2 font-bold text-sm hover:underline" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
                  Se connecter
                </Link>
              </>
            ) : (
              <div className="relative ml-2" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#6B7280] flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-sm uppercase">
                        {getInitials()}
                      </span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-primary">expand_more</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-[120%] mt-1 w-[220px] bg-white shadow-lg border border-black/10 z-50 flex flex-col font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                    <Link href="/profile/me" className="px-5 py-3 border-b border-black/5 text-[#333] hover:bg-[#2A5AAB] hover:text-white transition-colors text-sm">
                      Ton profil
                    </Link>
                    <Link href="/publish" className="px-5 py-3 border-b border-black/5 text-[#333] hover:bg-[#2A5AAB] hover:text-white transition-colors text-sm">
                      Ton espace vendeur
                    </Link>
                    <Link href="/purchases" className="px-5 py-3 border-b border-black/5 text-[#333] hover:bg-[#2A5AAB] hover:text-white transition-colors text-sm">
                      Achats
                    </Link>
                    <Link href="/profile/settings" className="px-5 py-3 border-b border-black/5 text-[#333] hover:bg-[#2A5AAB] hover:text-white transition-colors text-sm">
                      Paramètres
                    </Link>
                    <button onClick={handleLogout} className="px-5 py-3 text-left text-[#333] hover:bg-[#2A5AAB] hover:text-white transition-colors text-sm">
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="lg:hidden px-container-margin w-full pb-3 relative z-40 bg-surface">
        <TypewriterSearch />
      </div>

      {/* Bottom Row: Categories */}
      {!hideCategories && (
        <div 
          className="hidden lg:block w-full border-t border-black/10 relative bg-white" 
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="max-w-7xl mx-auto px-container-margin h-[50px]">
            <nav className="flex items-center justify-center h-full overflow-x-auto hide-scrollbar">
              {['Femmes', 'Hommes', 'Enfants', 'Beauté', 'Marques', 'Sports', 'Tendances'].map((cat) => (
                <div 
                  key={cat} 
                  className="h-full"
                  onMouseEnter={() => setHoveredCategory(cat)}
                >
                  <Link 
                    href={`/category/${cat.toLowerCase()}`} 
                    className={`h-full flex items-center px-6 transition-colors whitespace-nowrap ${hoveredCategory === cat ? 'bg-[#1b1b1b] text-white' : 'text-primary hover:bg-[#1b1b1b] hover:text-white'}`} 
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700, fontSize: '15px' }}
                  >
                    {cat}
                  </Link>
                </div>
              ))}
              <div className="h-full" onMouseEnter={() => setHoveredCategory(null)}>
                <Link href="/promos" className="h-full flex items-center px-6 text-error hover:bg-error hover:text-white transition-colors whitespace-nowrap" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700, fontSize: '15px' }}>
                  Promos
                </Link>
              </div>
            </nav>
          </div>

          {/* Megamenu Dropdown */}
          {hoveredCategory && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-b border-black/10 shadow-lg z-50">
              <div className="max-w-7xl mx-auto px-container-margin py-8">
                <div className="flex gap-20">
                  {/* Shop by category section */}
                  <div className="flex-1">
                    <h3 className="font-bold text-[16px] text-black mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>Shop by category</h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                      {(MEGAMENU_DATA[hoveredCategory] || MEGAMENU_DATA['Femmes']).shopByCategory.map((item) => (
                        <Link key={item} href={`/category/${hoveredCategory.toLowerCase()}`} className="text-[#333] hover:underline text-[14px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Featured section */}
                  <div className="w-[300px]">
                    <h3 className="font-bold text-[16px] text-black mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>Featured</h3>
                    <div className="flex flex-col gap-4">
                      {(MEGAMENU_DATA[hoveredCategory] || MEGAMENU_DATA['Femmes']).featured.map((item) => (
                        <Link key={item} href={`/category/${hoveredCategory.toLowerCase()}`} className="text-[#333] hover:underline text-[14px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* See all link */}
                <div className="mt-8 pt-4">
                  <Link href={`/category/${hoveredCategory.toLowerCase()}`} className="font-bold text-black text-[15px] hover:underline" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                    See all {hoveredCategory.toLowerCase()}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
