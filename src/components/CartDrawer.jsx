"use client";
import React, { useContext, useEffect } from 'react';
import { AppContext } from './Providers';
import { X, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, addToast } = useContext(AppContext);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const total = cart?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
  const safeCart = cart || [];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[100vw] bg-surface z-[201] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-white">
          <h2 className="text-[20px] font-bold text-primary uppercase tracking-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Ton Panier ({safeCart.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-surface-container rounded-full transition-colors text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-surface-container-low flex flex-col gap-4">
          {safeCart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant h-full py-20">
              <span className="material-symbols-outlined text-[64px] mb-4 opacity-50">shopping_bag</span>
              <p className="text-[16px] font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Ton panier est vide pour le moment.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-3 bg-white border-2 border-primary text-primary rounded-full font-bold uppercase text-[14px] hover:bg-surface-variant transition-colors"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            safeCart.map((item, idx) => {
              const image = item.listing_images?.[0]?.url || item.image || 'https://placehold.co/150x200/eaeaea/a0a0a0?text=Pas+d%27image';
              return (
                <div key={`${item.id}-${idx}`} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/30">
                  <div className="w-[80px] h-[100px] bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                    <img src={image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-primary text-[14px] line-clamp-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                          {item.title}
                        </h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-[13px] text-secondary mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                        {item.size && `Taille ${item.size}`} {item.brand && `• ${item.brand}`}
                      </p>
                    </div>
                    <p className="font-bold text-primary text-[16px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      {item.price?.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {safeCart.length > 0 && (
          <div className="p-6 bg-white border-t border-outline-variant/30">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[16px] font-medium text-secondary" style={{ fontFamily: '"Google Sans", sans-serif' }}>Total</span>
              <span className="text-[24px] font-bold text-primary" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                {total.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <button 
              onClick={() => addToast("Le système de paiement arrive bientôt !")}
              className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200 shadow-lg"
              style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
            >
              Commander
            </button>
          </div>
        )}
      </div>
    </>
  );
}
