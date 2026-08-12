import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function ProfileLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-background text-on-background antialiased min-h-screen font-sans flex flex-col md:flex-row">
      {/* Mobile Top App Bar (Hidden on Desktop) */}
      <header className="md:hidden bg-surface border-b border-surface-variant flex justify-between items-center px-container-margin py-4 w-full sticky top-0 z-50">
        <Link to="/" className="font-headline-md text-2xl font-black text-primary italic" style={{ fontFamily: '"Monument Extended", sans-serif' }}>Addikt</Link>
        <div className="flex gap-4">
          <button aria-label="shopping_cart">
            <span className="material-symbols-outlined text-primary hover:text-accent-orange transition-colors">shopping_cart</span>
          </button>
          <button aria-label="favorite">
            <span className="material-symbols-outlined text-primary hover:text-accent-orange transition-colors">favorite</span>
          </button>
        </div>
      </header>

      {/* Desktop SideNav */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-surface-variant p-6 space-y-8 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
          <Link to="/" className="font-headline-md text-2xl text-primary italic font-black" style={{ fontFamily: '"Monument Extended", sans-serif' }}>Addikt</Link>
        </div>
        
        <div className="flex flex-col items-center py-6 border-b border-surface-variant">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-primary">
            <img alt="Photo de profil utilisateur" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Kj16Pg16KFHOygVXnq3JYVbRVPnfnF6L_5qszOG-8llAjMQJiGoguZLEKc0p7_lorijoQCsYMUS-CjSc7tSu2CKNaIlTXMKNNJD_eiE_BviVjL8eHFgTCkUBC2xY5FsOmZGovVbFOZaq3DaswUY7Lgn_iuG5iG-8oxmvKEKk6lmRVHZlNd3NbJ6oErgPbtgPj7GermrnLp0J9cFm3PvFnE4QhdPOh9p0MPJASMIPFribonCXH5l1" />
          </div>
          <h3 className="font-headline-md text-lg text-primary text-center" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Dakar Streetwear</h3>
          <p className="font-body-sm text-sm text-secondary mt-1">Membre depuis 2024</p>
        </div>
        
        <div className="flex-1 space-y-2">
          <Link to="/profile/me" className={`flex items-center gap-3 px-4 py-2 font-label-caps text-xs font-bold rounded-full transition-all ${currentPath === '/profile/me' ? 'bg-primary text-on-primary translate-x-1' : 'text-secondary hover:text-primary hover:bg-trust-grey'}`}>
            <span className="material-symbols-outlined">person</span>
            Mon Profil
          </Link>
          <Link to="/profile/orders" className={`flex items-center gap-3 px-4 py-2 font-label-caps text-xs font-bold rounded-full transition-all ${currentPath === '/profile/orders' ? 'bg-primary text-on-primary translate-x-1' : 'text-secondary hover:text-primary hover:bg-trust-grey'}`}>
            <span className="material-symbols-outlined">package</span>
            Commandes
          </Link>
          <Link to="/profile/favorites" className={`flex items-center gap-3 px-4 py-2 font-label-caps text-xs font-bold rounded-full transition-all ${currentPath === '/profile/favorites' ? 'bg-primary text-on-primary translate-x-1' : 'text-secondary hover:text-primary hover:bg-trust-grey'}`}>
            <span className="material-symbols-outlined">favorite</span>
            Favoris
          </Link>
          <Link to="/profile/payments" className={`flex items-center gap-3 px-4 py-2 font-label-caps text-xs font-bold rounded-full transition-all ${currentPath === '/profile/payments' ? 'bg-primary text-on-primary translate-x-1' : 'text-secondary hover:text-primary hover:bg-trust-grey'}`}>
            <span className="material-symbols-outlined">payments</span>
            Paiements
          </Link>
          <Link to="/profile/settings" className={`flex items-center gap-3 px-4 py-2 font-label-caps text-xs font-bold rounded-full transition-all ${currentPath === '/profile/settings' ? 'bg-primary text-on-primary translate-x-1' : 'text-secondary hover:text-primary hover:bg-trust-grey'}`}>
            <span className="material-symbols-outlined">settings</span>
            Paramètres
          </Link>
        </div>
        
        <div className="mt-auto flex flex-col gap-4">
          <Link to="/publish" className="bg-primary text-on-primary font-button-text text-sm py-3 px-6 rounded-full w-full text-center hover:bg-inverse-surface transition-colors font-bold">
            Vendre un article
          </Link>
          <ul className="flex flex-col gap-2 border-t border-surface-variant pt-4">
            <li>
              <a className="flex items-center gap-3 text-secondary hover:text-primary px-4 py-2 hover:bg-trust-grey transition-all font-label-caps text-xs font-bold rounded-full" href="#">
                <span className="material-symbols-outlined">help</span>
                Aide
              </a>
            </li>
            <li>
              <Link to="/login" className="flex items-center gap-3 text-accent-rose hover:text-error px-4 py-2 hover:bg-error-container transition-all font-label-caps text-xs font-bold rounded-full">
                <span className="material-symbols-outlined">logout</span>
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full flex flex-col min-h-[calc(100vh-64px)] md:min-h-screen">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Visible only on mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-surface-variant flex justify-around items-center h-16 z-50">
        <Link to="/" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">search</span>
        </Link>
        <Link to="/publish" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">add_circle</span>
        </Link>
        <Link to="/messages" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">chat</span>
        </Link>
        <Link to="/profile/me" className="flex flex-col items-center justify-center text-primary border-t-2 border-primary w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
        </Link>
      </nav>
    </div>
  );
}
