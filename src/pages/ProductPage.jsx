import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ProductPage({ products, toggleLike, addToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit introuvable</h2>
        <Link to="/" className="text-accent-orange underline">Retour à l'accueil</Link>
      </div>
    );
  }

  const handleLike = () => {
    if (toggleLike) toggleLike(product.id);
    else addToast && addToast("Fonctionnalité en cours de développement");
  };

  // Helper to render a generic product card for the carousels
  const renderProductCard = (p, index, isPopular = false, isNew = false) => (
    <Link key={p.id} to={`/product/${p.id}`} className={`group block ${index === 4 ? 'hidden lg:block' : ''}`}>
      <div className="aspect-[4/5] bg-surface-container rounded-2xl overflow-hidden mb-3 relative border border-outline-variant/30">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.title} src={p.image} />
        {isPopular && <div className="absolute top-2 left-2 bg-accent-rose text-white font-label text-[10px] uppercase px-2 py-1 rounded-sm">Populaire</div>}
        {isNew && <div className="absolute top-2 left-2 bg-primary text-white font-label text-[10px] uppercase px-2 py-1 rounded-sm">Nouveau</div>}
        <div className="absolute top-2 right-2 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px] text-primary" onClick={(e) => { e.preventDefault(); if(toggleLike) toggleLike(p.id); }}>
            {p.liked ? 'favorite' : 'favorite_border'}
          </span>
        </div>
      </div>
      <h4 className="font-label text-sm text-primary truncate mb-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{p.title}</h4>
      <p className="text-sm font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{p.price.toLocaleString('fr-SN')} F</p>
    </Link>
  );

  return (
    <>
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 font-label text-sm text-secondary flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to={`/category/${product.category?.toLowerCase() || 'femmes'}`} className="hover:text-primary transition-colors text-primary border-b-2 border-primary pb-0.5 capitalize">{product.category || 'Femmes'}</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-outline">{product.title}</span>
        </div>

        {/* Product Container */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Gallery (55%) */}
          <div className="w-full md:w-[55%] flex flex-col gap-4 relative">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-surface-container rounded-2xl overflow-hidden group border border-outline-variant/30">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={product.title} 
                src={product.image} 
              />
              {/* Overlays */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button 
                  onClick={handleLike}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:text-accent-rose hover:scale-110 transition-all drop-shadow-md"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: product.liked ? "'FILL' 1" : "'FILL' 0", color: product.liked ? 'var(--color-accent-rose)' : 'inherit' }}>favorite</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center text-primary hover:text-accent-blue hover:scale-110 transition-all drop-shadow-md">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
              </div>
              
              <button aria-label="Image précédente" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-white transition-all shadow-sm z-10">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button aria-label="Image suivante" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-white transition-all shadow-sm z-10">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              <button className="aspect-square rounded-2xl overflow-hidden border-2 border-primary">
                <img className="w-full h-full object-cover" alt="Thumb" src={product.image} />
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
              <h1 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tighter mb-4 text-primary uppercase font-body" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
                {product.title}
              </h1>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-[28px] font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{product.price.toLocaleString('fr-SN')} F</span>
                <span className="text-[18px] text-outline line-through mb-1 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{(product.price * 1.15).toLocaleString('fr-SN')} F</span>
                <span className="bg-accent-orange text-white font-label text-xs px-2 py-1 rounded-sm mb-1 uppercase font-bold transform -rotate-3">-15%</span>
              </div>
              <p className="font-body text-sm text-secondary" style={{ fontFamily: '"Google Sans", sans-serif' }}>Taille {product.size || 'M'} · Très bon état</p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={() => navigate(`/messages/${product.sellerId || 1}`)}
                className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Envoyer un message
              </button>
              <button className="w-full bg-white border border-primary text-primary font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Faire une offre
              </button>
            </div>
            
            {/* Reassurance */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start mb-8 border border-outline-variant/30">
              <span className="material-symbols-outlined text-accent-blue mt-0.5">verified_user</span>
              <div>
                <p className="font-body text-sm text-on-surface-variant font-medium leading-snug mb-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vérifie toujours l'article en main propre avant de payer.</p>
                <a className="font-label text-xs text-primary underline decoration-2 underline-offset-4 hover:text-accent-blue transition-colors" href="#" style={{ fontFamily: '"Google Sans", sans-serif' }}>En savoir plus</a>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <p className="font-body text-[16px] text-on-surface-variant leading-relaxed mb-4" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                Magnifique article {product.title?.toLowerCase()}. Coupe parfaite, couleurs vibrantes idéales pour la saison.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white">#dakar</button>
                <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white">#mode</button>
                <button className="px-6 py-2.5 rounded-full border border-outline-variant text-[14px] text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-medium bg-white">#tendance</button>
              </div>
            </div>
            
            <hr className="border-outline-variant/50 mb-8" />
            
            {/* Seller Block */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container border border-outline-variant">
                    <img className="w-full h-full object-cover" alt="Vendeur" src={product.seller?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC7dFp_KkAxEPK_P_ppYj28vXei2rCaxWwn7imZEnN9JrzteCDDx81SKxEH_m6MUfMGNFLk87XN1L1qQL4Wyz74z6guUDem4qsCxaaK1etD4PLWjBUCr5lrP3HrxoaMRmLzZLPefN51sBtk9sHEcmyWcCRrj3ireqMjZL19GXF5QwkSxH11LuPlGq-NIBomoo9qkXUpnGrdH9nyK6PvpgMCKmdVNAOewnx0QLE7ea9MXlhLLYGL3P4I"} />
                  </div>
                  <div>
                    <h3 className="font-label text-lg text-primary flex items-center gap-1 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                      {product.seller?.name || 'Ibrahima N.'}
                      <span className="material-symbols-outlined filled text-accent-blue text-[18px]">verified</span>
                    </h3>
                    <p className="font-body text-xs text-secondary" style={{ fontFamily: '"Google Sans", sans-serif' }}>42 vendus · Actif cette semaine</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-headline text-lg font-bold">4.8</span>
                  <span className="material-symbols-outlined filled text-accent-yellow">star</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to={`/seller/${product.sellerId || 1}`} className="flex-1 bg-white border border-primary text-primary font-bold text-xs uppercase py-3 rounded-full hover:bg-surface-container-high transition-colors text-center block" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                  Voir la boutique
                </Link>
                <button className="flex-1 bg-white border border-primary text-primary font-bold text-xs uppercase py-3 rounded-full hover:bg-surface-container-high transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                  Poser une question
                </button>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="mb-8">
              <h3 className="font-headline text-lg uppercase mb-4 text-primary font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Avis récents</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex text-accent-yellow text-[14px]">
                      <span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span>
                    </div>
                    <span className="font-label text-xs text-secondary">Awa D.</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant">Transaction parfaite, vendeuse très sympa. La robe est sublime !</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex text-accent-yellow text-[14px]">
                      <span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined filled">star</span><span className="material-symbols-outlined">star</span>
                    </div>
                    <span className="font-label text-xs text-secondary">Moussa F.</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant">Conforme à la description, livraison rapide sur Dakar.</p>
                </div>
              </div>
            </div>
            
            {/* Seller CTA */}
            <div className="bg-surface-container-low p-6 rounded-2xl text-center border border-dashed border-outline/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <p className="font-headline text-sm uppercase text-primary mb-3 relative z-10 font-bold">Toi aussi tu as un article comme celui-ci?</p>
              <Link className="font-label text-sm text-primary underline decoration-2 underline-offset-4 hover:text-accent-orange transition-colors relative z-10" to="/publish">Publier une annonce similaire</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Carousels Section */}
      <section className="bg-surface-container-low py-16 border-t border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          {/* More from seller */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-headline text-2xl font-bold uppercase text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Plus de ce vendeur</h2>
              <a className="font-label text-sm text-secondary hover:text-primary transition-colors underline decoration-1 underline-offset-4" href="#">Tout voir</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.slice(0, 5).map((p, i) => renderProductCard(p, i, i === 0, false))}
            </div>
          </div>
          
          {/* You might also like */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-headline text-2xl font-bold uppercase text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Tu pourrais aimer</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.slice(5, 10).map((p, i) => renderProductCard(p, i, i === 1, i === 3))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
