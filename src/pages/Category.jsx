import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Category({ products, handleSelect }) {
  const { id } = useParams();
  const categoryId = id ? id.toLowerCase() : 'femmes';
  
  let title = 'Femmes';
  let subcategories = [];

  switch (categoryId) {
    case 'hommes':
      title = 'Hommes';
      subcategories = ['T-shirts & Polos', 'Pantalons', 'Sweats & Pulls', 'Vestes & Manteaux', 'Costumes', 'Chaussures', 'Accessoires', 'Sneakers', 'Vintage'];
      break;
    case 'enfants':
      title = 'Enfants';
      subcategories = ['Bébé', 'Filles (2-14 ans)', 'Garçons (2-14 ans)', 'Chaussures', 'Jouets', 'Livres', 'Puériculture', 'Accessoires'];
      break;
    case 'femmes':
    default:
      title = 'Femmes';
      subcategories = ['Robes', 'Hauts', 'Bas', 'Boubous & tenues trad', 'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 'Bijoux', 'Vintage'];
      break;
  }

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-container-margin py-8 bg-background text-on-background font-body-sm">
      {/* Category Header */}
      <div className="mb-section-gap pt-8">
        <h1 className="text-5xl md:text-[6rem] lg:text-[7.5rem] text-primary mb-2 font-bold leading-none tracking-tighter" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800, opacity: 1 }}>{title}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant md:ml-2 md:-mt-3">1 240 articles</p>
      </div>

      {/* Subcategories (Scrollable Chips) */}
      <div className="mb-8 w-full overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {subcategories.map((sub, idx) => (
            <button 
              key={idx} 
              className={`flex-shrink-0 rounded-full px-6 py-3 font-button-text text-button-text border-2 transition-colors ${idx === 0 ? 'bg-primary text-on-primary border-primary' : idx === subcategories.length - 1 ? 'bg-surface-container-lowest text-accent-orange border-surface-variant hover:border-primary' : 'bg-surface-container-lowest text-primary border-surface-variant hover:border-primary'}`} 
              style={{ fontFamily: '"Zalando Sans Expanded Light", sans-serif' }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Sorting Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Filter Button */}
        <button className="flex items-center gap-2 border-2 border-primary rounded-full px-6 py-2 hover:bg-surface-variant transition-colors group">
          <span className="material-symbols-outlined text-primary group-hover:text-accent-blue transition-colors">tune</span>
          <span className="font-button-text text-button-text">Filtres</span>
        </button>
        
        {/* Active Filter Chips */}
        <div className="flex flex-wrap gap-2 flex-grow">
          <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1">
            <span className="font-label-caps text-label-caps">Taille M</span>
            <button className="material-symbols-outlined text-[16px] hover:text-accent-rose">close</button>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1">
            <span className="font-label-caps text-label-caps">Moins de 10 000 F</span>
            <button className="material-symbols-outlined text-[16px] hover:text-accent-rose">close</button>
          </div>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">Trier par:</span>
          <select className="bg-transparent border-none font-button-text text-button-text focus:ring-0 p-0 text-primary cursor-pointer hover:text-accent-blue outline-none">
            <option>Plus récent</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Populaire</option>
          </select>
        </div>
      </div>

      {/* Product Grid (4 columns desktop, 2 mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gutter mb-section-gap">
        {/* Using mock products instead of hardcoding all 8 to save space and match the app's data flow, but adapting styles to the new design */}
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="group relative flex flex-col bg-surface-container-lowest rounded-lg border border-transparent hover:border-surface-variant transition-all hover:-translate-y-1 cursor-pointer" onClick={() => handleSelect(product)}>
            <div className="relative w-full aspect-[3/4] bg-surface-container-low rounded-t-lg overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image} />
              <button 
                className="absolute top-3 right-3 text-primary hover:text-accent-rose transition-colors z-10 drop-shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  // toggleLike would normally be passed here, for now it's handled in App
                }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: product.liked ? "'FILL' 1" : "'FILL' 0", color: product.liked ? 'var(--color-accent-rose)' : 'inherit' }}>favorite</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <span className="text-body-lg font-bold text-primary tracking-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{product.price.toLocaleString('fr-SN')} FCFA</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{product.name}</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">{product.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex justify-center mb-section-gap">
        <button 
          className="bg-primary text-on-primary font-button-text text-button-text px-8 py-4 rounded-full uppercase tracking-wider hover:bg-inverse-surface hover:text-accent-blue transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}
        >
          Charger plus de pépites
        </button>
      </div>
    </main>
  );
}
