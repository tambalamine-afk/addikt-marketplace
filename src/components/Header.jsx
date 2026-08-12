import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant w-full">
      <div className="flex justify-between items-center px-container-margin w-full max-w-7xl mx-auto py-2">
        <Link to="/" className="flex items-center shrink-0 mr-8">
          <div className="w-auto flex items-center h-10">
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLsFCxYE7eK95VjbH3aJcV9rRhANBoUUCv7x8BO5Kfou2x8qWh8LCx_zkxtnKlpIlOjEr7QHT44RKjog11KpaIN2KWRm-uBYdfREmd9YpDCforBbbIuCCfC_qUAiOMu3-kYtcxN5SCNjDwKCx0y7Mn5kpDTcEj9vSGEM7O9Hkk6cDUfUDbY-Uu1m_Vnbrq3sT1owXlL8seOU1IJSXplqDmMdmIwqFydCcS7LtrtvmLC-COAL5FZR7QaVzQ" alt="Addikt Logo" className="h-10 w-auto" />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 flex-1">
          <Link to="/category/femmes" className="font-nav-link text-nav-link text-secondary hover:text-primary transition-opacity duration-200">Femmes</Link>
          <Link to="/category/hommes" className="font-nav-link text-nav-link text-secondary hover:text-primary transition-opacity duration-200">Hommes</Link>
          <Link to="/category/enfants" className="font-nav-link text-nav-link text-secondary hover:text-primary transition-opacity duration-200">Enfants</Link>
          <Link to="/brands" className="font-nav-link text-nav-link text-secondary hover:text-primary transition-opacity duration-200">Marques</Link>
          <Link to="/publish" className="font-nav-link text-nav-link text-accent-orange font-bold hover:opacity-70 transition-opacity">Vendre</Link>
        </nav>
        
        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative items-center">
          <div className="relative w-full">
            <input type="text" placeholder="Cherchez ce que vous voulez" className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2 px-6 pr-12 text-sm font-body-sm focus:outline-none focus:border-accent-orange transition-colors" />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-accent-orange text-white p-1.5 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="Shopping Bag" className="hover:text-accent-orange transition-colors">
            <img alt="Shopping Bag" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida/AP1WRLtuusSDe8SDcQ9Ym3ZtmnqZxplA2K2NkQd-FZmzsngRxZwLWQJomUXt-hmbSL6z73lZB1D10kOB8TRaLDaUX4EfnqGYsLd9QPoSRlWsUSBIB5ChOdFO4CWYqfKNzx3g120gE1XHF87c3pBkFO-9D6oVmCpyZudoQY6I61tA0uvUCq7WDIOjXXum3IknBFc8uuwjrfj22ab6B9iyQHTIxpYLUzeDVfLYVuJYYlviEi3OdW17cbcv4rc2kQ" />
          </button>
          <Link to="/login" className="bg-primary text-on-primary font-button-text font-semibold text-button-text px-6 py-2 rounded-full hover:bg-accent-blue transition-colors hidden sm:block">
            Se connecter
          </Link>
          <Link to="/register" className="bg-surface-container text-primary font-button-text font-semibold text-button-text px-6 py-2 rounded-full hover:bg-surface-variant transition-colors hidden sm:block">
            S'inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}
