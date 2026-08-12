import React from 'react';
import { Link } from 'react-router-dom';

export default function Category({ products, handleSelect }) {
  // We'll use mock subcategories for now
  const subcategories = [
    'Robes', 'Hauts', 'Bas', 'Boubous & tenues trad', 'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 'Bijoux', 'Vintage'
  ];

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-container-margin py-8 bg-background text-on-background font-body-sm">
      {/* Category Header */}
      <div className="mb-section-gap pt-8">
        <h1 className="text-[80px] text-primary uppercase mb-2 font-bold tracking-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}>Femmes</h1>
        <p className="text-[18px] text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>1 240 articles</p>
      </div>

      {/* Subcategories (Scrollable Chips) */}
      <div className="mb-8 w-full overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {subcategories.map((sub, idx) => (
            <button 
              key={idx} 
              className={`flex-shrink-0 rounded-full px-6 py-3 text-[14px] border-2 transition-colors font-body-sm ${idx === 0 ? 'bg-primary text-on-primary border-primary' : idx === subcategories.length - 1 ? 'bg-surface-container-lowest text-accent-orange border-surface-variant hover:border-primary' : 'bg-surface-container-lowest text-primary border-surface-variant hover:border-primary'}`} 
              style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}
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
          <span className="text-[14px] text-primary" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>Filtres</span>
        </button>
        
        {/* Active Filter Chips */}
        <div className="flex flex-wrap gap-2 flex-grow">
          <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1">
            <span className="text-[12px] uppercase" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>Taille M</span>
            <button className="material-symbols-outlined text-[16px] hover:text-accent-rose">close</button>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1">
            <span className="text-[12px] uppercase" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>Moins de 10 000 F</span>
            <button className="material-symbols-outlined text-[16px] hover:text-accent-rose">close</button>
          </div>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-on-surface-variant uppercase" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>Trier par:</span>
          <select className="bg-transparent border-none text-[14px] focus:ring-0 p-0 text-primary cursor-pointer hover:text-accent-blue outline-none" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>
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
                className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full p-2 text-primary hover:text-accent-rose hover:bg-surface-container-lowest transition-colors z-10"
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
                <span className="text-[18px] font-bold text-primary tracking-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{product.price.toLocaleString('fr-SN')} FCFA</span>
              </div>
              <span className="text-[14px] text-on-surface-variant truncate" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.name}</span>
              <span className="text-[12px] text-on-surface-variant mt-1 uppercase" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>{product.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex justify-center mb-section-gap">
        <button className="bg-primary text-on-primary text-[14px] px-8 py-4 rounded-full uppercase tracking-wider hover:bg-inverse-surface hover:text-accent-blue transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>
          Charger plus de pépites
        </button>
      </div>
    </main>
  );
}
