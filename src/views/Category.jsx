"use client";
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { createClient } from '../lib/supabase/client';

export default function Category({ handleSelect }) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryId = id ? decodeURIComponent(id).toLowerCase() : 'nouveautes';

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
    case 'marques':
      title = 'Marques';
      subcategories = ['Nike', 'Zara', 'Levi\'s', 'Tongoro Studio', 'Adidas', 'Puma', 'Mango', 'Asos'];
      break;
    case 'sports':
      title = 'Sports';
      subcategories = ['Running', 'Fitness', 'Football', 'Basketball', 'Vêtements', 'Chaussures', 'Accessoires'];
      break;
    case 'beaute':
    case 'beauté':
    case 'beauty':
      title = 'Beauté';
      subcategories = ['Maquillage', 'Soins du visage', 'Soins du corps', 'Parfums', 'Cheveux', 'Outils & Accessoires', 'Hommes', 'Naturel & Bio'];
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
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*');
      if (data) setDbCategories(data);
    }
    fetchCategories();
  }, [supabase]);

  useEffect(() => {
    async function fetchProducts() {
      // Find category UUID if not 'nouveautes'
      let catId = null;
      let isCategoryMissing = false;
      if (categoryId !== 'nouveautes' && categoryId !== 'nouveautés' && dbCategories.length > 0) {
        const cat = dbCategories.find(c => c.name.toLowerCase() === title.toLowerCase());
        if (cat) {
          catId = cat.id;
        } else {
          isCategoryMissing = true;
        }
      }

      if (isCategoryMissing) {
        setProducts([]);
        return;
      }

      let query = supabase
        .from('listings')
        .select(`
          id,
          title,
          price,
          size,
          brand,
          created_at,
          listing_images (url),
          categories (name)
        `)
        .eq('status', 'active');
      
      if (catId) {
        query = query.eq('category_id', catId);
      }
      
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (data) setProducts(data);
    }
    if (dbCategories.length > 0 || categoryId === 'nouveautes' || categoryId === 'nouveautés') {
      fetchProducts();
    }
  }, [categoryId, title, dbCategories, supabase, searchQuery]);

  // Réinitialiser le filtre actif quand on change de catégorie
  useEffect(() => {
    setActiveSubcategory(subcategories[0]);
    setActiveFilters([]);
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
    // 0. Search Query
    if (searchQuery) {
      const sq = searchQuery.toLowerCase();
      if (!product.title?.toLowerCase().includes(sq) && 
          !product.categories?.name?.toLowerCase().includes(sq)) {
        return false;
      }
    }

    // 1. Sous-catégorie
    if (activeSubcategory !== 'Tous') {
      const sub = activeSubcategory.toLowerCase();
      let match = false;
      const title = (product.title || '').toLowerCase();
      const desc = (product.description || '').toLowerCase();
      
      const keywordsMap = {
        't-shirts & polos': ['t-shirt', 'tshirt', 'polo', 'chemise', 'haut'],
        'pantalons': ['pantalon', 'jean', 'jogging', 'short', 'bas'],
        'sweats & pulls': ['sweat', 'pull', 'hoodie', 'gilet'],
        'vestes & manteaux': ['veste', 'manteau', 'blouson', 'doudoune', 'trench', 'jacket'],
        'costumes': ['costume', 'tailleur', 'smoking', 'veston'],
        'chaussures': ['chaussure', 'sneaker', 'basket', 'botte', 'mocassin', 'talon', 'sandale', 'claquette'],
        'accessoires': ['montre', 'lunette', 'sac', 'bijou', 'ceinture', 'casquette', 'chapeau', 'bonnet', 'echarpe', 'accessoire', 'bracelet', 'collier', 'bague', 'foulard'],
        'sneakers': ['sneaker', 'basket', 'nike', 'jordan', 'yeezy', 'adidas', 'puma', 'new balance', 'asics'],
        'vintage': ['vintage', 'retro', 'ancien', '90s', '80s', 'y2k'],
        'bébé': ['bébé', 'bebe', 'body', 'pyjama', 'naissance', 'layette'],
        'filles (2-14 ans)': ['fille', 'robe', 'jupe', 't-shirt fille', 'pantalon fille'],
        'garçons (2-14 ans)': ['garcon', 'garçon', 't-shirt garçon', 'pantalon garçon'],
        'jouets': ['jouet', 'jeu', 'peluche', 'poupée', 'lego', 'figurine'],
        'livres': ['livre', 'bd', 'manga', 'roman', 'conte'],
        'puériculture': ['poussette', 'siège', 'biberon', 'couche', 'bain', 'lit', 'chaise'],
        'basses': ['basse', 'low'],
        'montantes': ['montante', 'high', 'mid'],
        'running': ['running', 'course', 'asics', 'salomon', 'new balance'],
        'lifestyle': ['lifestyle', 'dunk', 'force', 'casual', 'ville'],
        'éditions limitées': ['limité', 'limited', 'collab', 'exclusive', 'rare'],
        'robes': ['robe', 'tunique'],
        'hauts': ['haut', 'top', 'blouse', 'chemise', 't-shirt', 'caraco', 'débardeur'],
        'bas': ['bas', 'pantalon', 'jean', 'jupe', 'short', 'legging'],
        'boubous & tenues trad': ['boubou', 'traditionnel', 'bazin', 'wax', 'pagne', 'tailleur africain', 'thioup'],
        'sacs & accessoires': ['sac', 'pochette', 'montre', 'lunette', 'ceinture', 'bijou', 'foulard'],
        'bijoux': ['bijou', 'collier', 'bracelet', 'bague', 'boucle', 'montre'],
        'beauté': ['beauté', 'maquillage', 'soin', 'parfum', 'cheveux', 'cosmétique', 'crème', 'lotion'],
        'maquillage': ['maquillage', 'makeup', 'rouge à lèvres', 'mascara', 'fond de teint', 'fard', 'palette'],
        'soins du visage': ['visage', 'crème', 'sérum', 'nettoyant', 'masque', 'anti-âge', 'hydratant', 'skin care'],
        'soins du corps': ['corps', 'bain', 'douche', 'lotion', 'gommage', 'hydratant', 'body', 'savon'],
        'parfums': ['parfum', 'eau de toilette', 'fragrance', 'brume'],
        'cheveux': ['cheveux', 'shampoing', 'après-shampoing', 'masque cheveux', 'huile', 'hair care', 'perruque', 'mèche'],
        'outils & accessoires': ['pinceau', 'éponge', 'miroir', 'trousse', 'brosse', 'lisseur', 'sèche-cheveux'],
        'hommes': ['homme', 'barbe', 'rasage', 'soin homme', 'men'],
        'naturel & bio': ['bio', 'naturel', 'vegan', 'organique', 'karité', 'coco']
      };

      const keywords = keywordsMap[sub] || [sub];
      
      for (const kw of keywords) {
        if (title.includes(kw) || desc.includes(kw)) {
          match = true;
          break;
        }
      }
      
      if (!match) return false;
    }

    // 2. Filtres actifs
    for (const filter of activeFilters) {
      if (filter.type === 'size') {
        if (!product.size || product.size.toLowerCase() !== filter.value.toLowerCase()) return false;
      }
      if (filter.type === 'maxPrice') {
        if (product.price > filter.value) return false;
      }
      if (filter.type === 'brand') {
        const term = filter.value.toLowerCase();
        if (!product.brand?.toLowerCase().includes(term) && !product.title?.toLowerCase().includes(term)) return false;
      }
    }
    
    return true;
  });

  // Tri
  finalProducts.sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    // if (sortOrder === 'popular') return ...
    return new Date(b.created_at) - new Date(a.created_at); // recent
  });

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-container-margin py-8 bg-background text-on-background font-body-sm">
      {/* Category Header */}
      <div className="mb-section-gap pt-8">
        <h1 className="text-5xl md:text-[6rem] lg:text-[7.5rem] text-primary mb-2 font-bold leading-none tracking-tighter truncate" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800, opacity: 1 }}>{searchQuery ? `"${searchQuery}"` : title}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant md:ml-2 md:-mt-3">{finalProducts.length} article{finalProducts.length !== 1 ? 's' : ''}</p>
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
                  {(categoryId === 'enfants' ? ['0-2 ans', '3-5 ans', '6-8 ans', '9-14 ans'] : categoryId === 'sneakers' ? ['38', '39', '40', '41', '42', '43', '44', '45', '46'] : ['S', 'M', 'L', 'XL']).map(size => (
                    <button key={size} onClick={() => addFilter({ id: `size-${size.toLowerCase().replace(/\s+/g, '-')}`, type: 'size', label: `Taille ${size}`, value: size })} className="px-3 py-1 border border-outline-variant rounded hover:bg-black hover:text-white transition-colors text-sm">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-label text-sm font-bold mb-2">Marque</h4>
                <div className="flex gap-2 flex-wrap">
                  {(categoryId === 'sneakers' ? ['Air Jordan', 'Nike Dunk', 'Yeezy', 'New Balance'] : ['Zara', 'H&M', 'Mango', 'Asos']).map(brand => (
                    <button key={brand} onClick={() => addFilter({ id: `brand-${brand.toLowerCase().replace(/\s+/g, '-')}`, type: 'brand', label: brand, value: brand })} className="px-3 py-1 border border-outline-variant rounded hover:bg-black hover:text-white transition-colors text-sm">
                      {brand}
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

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0">
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-6 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
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
              <Link key={product.id} href={`/product/${product.id}`} className="group relative flex flex-col bg-transparent transition-all cursor-pointer">
                <div className="relative w-full aspect-[3/4] bg-surface-container-low rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.title} src={product.listing_images?.[0]?.url || 'https://via.placeholder.com/300x400?text=Pas+d%27image'} />
                  <button 
                    className="absolute top-2 right-2 transition-opacity z-10 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill={'rgba(40,40,40,0.8)'} stroke="white" strokeWidth="1.5">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
                <div className="pt-3 flex flex-col mt-2 text-left">
                  <span className="text-[15px] text-[#111] leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.title}</span>
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
