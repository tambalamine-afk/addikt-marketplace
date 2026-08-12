import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetail({ product, onClose, onToggleLike, addToast }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4">
      <div className="bg-background text-on-background w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-2xl overflow-y-auto relative flex flex-col antialiased selection:bg-accent-orange selection:text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-surface-variant transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <main className="max-w-[1200px] mx-auto px-6 py-8 w-full">
          {/* Breadcrumbs */}
          <div className="mb-6 text-[14px] text-secondary flex items-center gap-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link to="/category/femmes" className="hover:text-primary transition-colors text-primary border-b-2 border-primary pb-0.5">Femmes</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-outline">{product.name}</span>
          </div>

          {/* Product Container */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            
            {/* Gallery (55%) */}
            <div className="w-full md:w-[55%] flex flex-col gap-4 relative">
              {/* Main Image */}
              <div className="relative w-full aspect-[3/4] bg-surface-container rounded-2xl overflow-hidden group border border-outline-variant/30">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image} />
                
                {/* Overlays */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button 
                    className="w-12 h-12 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:text-accent-rose hover:scale-110 transition-all shadow-sm"
                    onClick={() => onToggleLike(product.id)}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: product.liked ? "'FILL' 1" : "'FILL' 0", color: product.liked ? 'var(--color-accent-rose)' : 'inherit' }}>favorite</span>
                  </button>
                  <button className="w-12 h-12 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:text-accent-blue hover:scale-110 transition-all shadow-sm">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>
                
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-white transition-all shadow-sm z-10" aria-label="Image précédente">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-white transition-all shadow-sm z-10" aria-label="Image suivante">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                <button className="aspect-square rounded-2xl overflow-hidden border-2 border-primary">
                  <img className="w-full h-full object-cover" alt="Thumbnail 1" src={product.image} />
                </button>
                <button className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-outline-variant transition-colors bg-surface-container flex items-center justify-center border-dashed">
                  <span className="material-symbols-outlined text-secondary">add_photo_alternate</span>
                </button>
              </div>
            </div>

            {/* Product Info (45%) */}
            <div className="w-full md:w-[45%] flex flex-col pt-2 lg:pt-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tighter mb-4 text-primary uppercase" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{product.name}</h1>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-[28px] font-bold text-primary">{product.price.toLocaleString('fr-SN')} F</span>
                  <span className="text-[18px] text-outline line-through mb-1 font-bold">{(product.price * 1.2).toLocaleString('fr-SN')} F</span>
                  <span className="bg-accent-orange text-white text-[12px] px-2 py-1 rounded-sm mb-1 uppercase font-bold transform -rotate-3" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif' }}>-15%</span>
                </div>
                <p className="text-[14px] text-secondary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Taille {product.size || 'M'} · Très bon état</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mb-8">
                <Link to={`/messages/${product.sellerId || 1}`} onClick={onClose} className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200 text-center">Envoyer un message</Link>
                <button className="w-full bg-white border border-primary text-primary font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200">Faire une offre</button>
              </div>

              {/* Reassurance */}
              <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start mb-8 border border-outline-variant/30">
                <span className="material-symbols-outlined text-accent-blue mt-0.5">verified_user</span>
                <div>
                  <p className="text-[14px] text-on-surface-variant font-medium leading-snug mb-1" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Vérifie toujours l'article en main propre avant de payer.</p>
                  <a className="text-[12px] text-primary underline decoration-2 underline-offset-4 hover:text-accent-blue transition-colors" href="#" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>En savoir plus</a>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-[16px] text-on-surface-variant leading-relaxed mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                  Magnifique article {product.name.toLowerCase()}. Coupe parfaite, couleurs vibrantes idéales pour la saison.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white" type="button">#mode</button>
                  <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white" type="button">#dakar</button>
                  <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white" type="button">#tendance</button>
                </div>
              </div>

              <hr className="border-outline-variant/50 mb-8" />

              {/* Seller Block */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container border border-outline-variant">
                      <img className="w-full h-full object-cover" alt="Vendeur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7dFp_KkAxEPK_P_ppYj28vXei2rCaxWwn7imZEnN9JrzteCDDx81SKxEH_m6MUfMGNFLk87XN1L1qQL4Wyz74z6guUDem4qsCxaaK1etD4PLWjBUCr5lrP3HrxoaMRmLzZLPefN51sBtk9sHEcmyWcCRrj3ireqMjZL19GXF5QwkSxH11LuPlGq-NIBomoo9qkXUpnGrdH9nyK6PvpgMCKmdVNAOewnx0QLE7ea9MXlhLLYGL3P4I" />
                    </div>
                    <div>
                      <h3 className="text-[18px] text-primary flex items-center gap-1 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                        {product.seller} 
                        <span className="material-symbols-outlined text-accent-blue text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </h3>
                      <p className="text-[12px] text-secondary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>42 vendus · Actif cette semaine</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[18px] font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>4.8</span>
                    <span className="material-symbols-outlined text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to={`/seller/${product.sellerId || 1}`} onClick={onClose} className="flex-1 bg-white border border-primary text-primary font-bold text-[12px] uppercase py-3 rounded-full hover:bg-surface-container-high transition-colors text-center block">Voir la boutique</Link>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
