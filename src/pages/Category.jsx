import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Category({ products, handleSelect }) {
  const { id } = useParams();
  const categoryId = id ? id.toLowerCase() : 'nouveautes';
  
  if (categoryId === 'beauté' || categoryId === 'beaute' || categoryId === 'beauty') {
    const beautySections = [
      { id: 'bath', title: 'Bath & body', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500' },
      { id: 'fragrance', title: 'Fragrance', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500' },
      { id: 'hair', title: 'Hair care', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500' },
      { id: 'makeup', title: 'Makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500' },
      { id: 'skin', title: 'Skin care', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500' },
      { id: 'tools', title: 'Tools & accessories', image: 'https://images.unsplash.com/photo-1590156546946-cb567ea321d2?w=500' },
      { id: 'other', title: 'Other', image: 'https://images.unsplash.com/photo-1588145459345-0d7031da90fb?w=500' }
    ];

    return (
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-container-margin py-8 bg-white text-on-background">
        <div className="flex items-baseline gap-3 mb-12">
          <h1 className="text-3xl font-bold text-[#222]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Beauty</h1>
          <span className="text-[13px] text-gray-500 font-normal" style={{ fontFamily: '"Google Sans", sans-serif' }}>1000+ results</span>
        </div>

        {beautySections.map((section) => (
          <div key={section.id} className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-[18px] font-bold text-[#222]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{section.title}</h2>
              <Link to={`/category/beauté?section=${section.id}`} className="text-blue-600 text-[13px] font-medium hover:underline" style={{ fontFamily: '"Google Sans", sans-serif' }}>See all</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => {
                const price = 5000 + (idx * 1500);
                return (
                  <Link key={`${section.id}-${idx}`} to="/product/1" className="group relative flex flex-col bg-transparent transition-all cursor-pointer">
                    <div className="relative w-full aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={section.title} src={section.image} />
                      <button className="absolute top-2 right-2 transition-opacity z-10 hover:scale-110">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(40,40,40,0.8)" stroke="white" strokeWidth="1.5">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="pt-3 flex flex-col gap-0.5 text-left" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      <span className="text-[15px] text-[#222] font-normal truncate">{section.title} Item {idx}</span>
                      <span className="text-[16px] font-semibold text-black tracking-tight mt-0.5">{price.toLocaleString('fr-SN')} FCFA</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    );
  }

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
    case 'sneakers':
      title = 'Sneakers';
      subcategories = ['Basses', 'Montantes', 'Running', 'Lifestyle', 'Vintage', 'Éditions limitées', 'Accessoires'];
      break;
    case 'femmes':
      title = 'Femmes';
      subcategories = ['Robes', 'Hauts', 'Bas', 'Boubous & tenues trad', 'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 'Bijoux', 'Vintage'];
      break;
    case 'nouveautes':
    case 'nouveautés':
    default:
      title = 'Nouveautés';
      subcategories = ['Femmes', 'Hommes', 'Enfants', 'Sneakers', 'Beauté', 'Vintage', 'Accessoires'];
      break;
  }

  // Ajouter "Tous" au tout début des filtres
  subcategories = ['Tous', ...subcategories];

  const [activeSubcategory, setActiveSubcategory] = useState(subcategories[0]);
  const [activeFilters, setActiveFilters] = useState([
    { id: 'size-m', type: 'size', label: 'Taille M', value: 'M' },
    { id: 'price-10k', type: 'maxPrice', label: 'Moins de 10 000 FCFA', value: 10000 }
  ]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');

  // Réinitialiser le filtre actif quand on change de catégorie
  useEffect(() => {
    setActiveSubcategory(subcategories[0]);
  }, [categoryId]);

  const removeFilter = (id) => {
    setActiveFilters(prev => prev.filter(f => f.id !== id));
  };

  const addFilter = (filter) => {
    // Prevent duplicates of the same type if it's maxPrice, or just add it
    setActiveFilters(prev => {
      const existing = prev.find(f => f.type === filter.type && f.value === filter.value);
      if (existing) return prev;
      return [...prev.filter(f => f.type !== filter.type || filter.type === 'size'), filter]; // Only 1 maxPrice
    });
    setShowFilterMenu(false);
  };

  // Filtrer et trier les produits
  let finalProducts = products.filter(product => {
    // 1. Sous-catégorie
    let matchSub = false;
    if (!activeSubcategory || activeSubcategory === 'Tous') {
      matchSub = true;
    } else {
      const term = activeSubcategory.toLowerCase();
      matchSub = product.category.toLowerCase().includes(term) ||
                 product.title.toLowerCase().includes(term) ||
                 product.tags.some(tag => term.includes(tag.toLowerCase())) ||
                 term.includes(product.category.toLowerCase());
    }
    if (!matchSub) return false;

    // 2. Filtres actifs
    for (const filter of activeFilters) {
      if (filter.type === 'size') {
        if (!product.size || product.size.toLowerCase() !== filter.value.toLowerCase()) return false;
      }
      if (filter.type === 'maxPrice') {
        if (product.price > filter.value) return false;
      }
    }
    
    return true;
  });

  // Tri
  finalProducts.sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    if (sortOrder === 'popular') return (b.liked ? 1 : 0) - (a.liked ? 1 : 0);
    return 0; // recent (default, keep original order)
  });

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
              onClick={() => setActiveSubcategory(sub)}
              className={`flex-shrink-0 rounded-full px-6 py-2.5 font-normal text-[15px] border transition-colors ${activeSubcategory === sub ? 'bg-black text-white border-black' : 'bg-white text-[#333] border-gray-300 hover:border-gray-400'}`} 
              style={{ fontFamily: '"Google Sans", sans-serif' }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Sorting Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Filter Button & Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 border-2 border-primary rounded-full px-6 py-2 hover:bg-surface-variant transition-colors group"
          >
            <span className="material-symbols-outlined text-primary group-hover:text-accent-blue transition-colors">tune</span>
            <span className="font-button-text text-button-text">Filtres</span>
          </button>
          
          {showFilterMenu && (
            <div className="absolute top-full mt-2 left-0 w-64 bg-white shadow-lg border border-outline-variant/30 rounded-xl z-50 p-4 flex flex-col gap-4">
              <div>
                <h4 className="font-label text-sm font-bold mb-2">Taille</h4>
                <div className="flex gap-2 flex-wrap">
                  {(categoryId === 'enfants' ? ['0-2 ans', '3-5 ans', '6-8 ans', '9-14 ans'] : ['S', 'M', 'L', 'XL']).map(size => (
                    <button key={size} onClick={() => addFilter({ id: `size-${size.toLowerCase().replace(/\s+/g, '-')}`, type: 'size', label: `Taille ${size}`, value: size })} className="px-3 py-1 border border-outline-variant rounded hover:bg-black hover:text-white transition-colors text-sm">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-label text-sm font-bold mb-2">Prix Max</h4>
                <div className="flex gap-2 flex-wrap">
                  {[5000, 10000, 20000, 50000].map(price => (
                    <button key={price} onClick={() => addFilter({ id: `price-${price}`, type: 'maxPrice', label: `Moins de ${price.toLocaleString('fr-SN')} FCFA`, value: price })} className="px-3 py-1 border border-outline-variant rounded hover:bg-black hover:text-white transition-colors text-sm">
                      &lt; {price / 1000}k
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Active Filter Chips */}
        <div className="flex flex-wrap gap-2 flex-grow">
          {activeFilters.map(filter => (
            <div key={filter.id} className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1">
              <span className="font-label-caps text-label-caps">{filter.label}</span>
              <button onClick={() => removeFilter(filter.id)} className="material-symbols-outlined text-[16px] hover:text-accent-rose">close</button>
            </div>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">Trier par:</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent border-none font-button-text text-button-text focus:ring-0 p-0 text-primary cursor-pointer hover:text-accent-blue outline-none"
          >
            <option value="recent">Plus récent</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
            <option value="popular">Populaire</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {finalProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-section-gap">
            {finalProducts.slice(0, 12).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group relative flex flex-col bg-transparent transition-all cursor-pointer">
                <div className="relative w-full aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image} />
                  <button 
                    className="absolute top-2 right-2 transition-opacity z-10 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill={product.liked ? '#e20020' : 'rgba(40,40,40,0.8)'} stroke="white" strokeWidth="1.5">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
                <div className="pt-3 flex flex-col mt-2 text-left">
                  <span className="text-[15px] text-[#111] leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.name || product.title}</span>
                  {product.size && (
                    <span className="text-[14px] text-[#555] leading-tight mt-[1px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.size}</span>
                  )}
                  <span className="text-[16px] text-black font-bold leading-tight mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.price.toLocaleString('fr-SN')} FCFA</span>
                </div>
              </Link>
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center mb-section-gap">
          <span className="material-symbols-outlined text-[32px] text-[#555] mb-4">search_off</span>
          <h2 className="text-[22px] font-bold text-black mb-2" style={{ fontFamily: '"Google Sans", sans-serif' }}>Aucune pépite trouvée</h2>
          <p className="text-[15px] text-[#555] mb-8" style={{ fontFamily: '"Google Sans", sans-serif' }}>Essaie de modifier tes filtres ou d'élargir ta recherche.</p>
          <button 
            onClick={() => setActiveSubcategory('Tous')} 
            className="bg-black text-white px-8 py-3 rounded-full font-bold text-[13px] hover:bg-gray-800 transition-colors"
            style={{ fontFamily: '"Google Sans", sans-serif' }}
          >
            VOIR TOUT LE CATALOGUE
          </button>
        </div>
      )}
    </main>
  );
}
