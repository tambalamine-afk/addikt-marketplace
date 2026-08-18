"use client";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../lib/supabase/client';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  const supabase = createClient();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popularBrands, setPopularBrands] = useState([]);

  // Filter states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    brand: null,
    size: null,
    maxPrice: null,
    condition: null
  });
  const [onSale, setOnSale] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent'); // recent, asc, desc

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchSearchResults() {
      setIsLoading(true);
      if (!query) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images(url, position),
          profiles(username, avatar_url)
        `)
        .eq('status', 'active')
        .or(`title.ilike.%${query}%,brand.ilike.%${query}%`);

      if (data) {
        const formatted = data.map(item => {
          const sortedImages = item.listing_images?.sort((a, b) => a.position - b.position) || [];
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            size: item.size,
            brand: item.brand,
            condition: item.condition,
            created_at: item.created_at,
            image: sortedImages.length > 0 ? sortedImages[0].url : 'https://placehold.co/400x500/eaeaea/a0a0a0?text=Pas+d%27image',
            seller: item.profiles,
            liked: false
          };
        });
        setProducts(formatted);
        
        const brands = new Set();
        data.forEach(p => {
          if (p.brand) brands.add(p.brand);
        });
        setPopularBrands(Array.from(brands).slice(0, 8));
      } else {
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchSearchResults();
  }, [query, supabase]);

  const handleSelectProduct = (p) => {
    router.push(`/product/${p.id}`);
  };

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
    setActiveDropdown(null);
  };

  // Client-side filtering
  let filteredProducts = products.filter(p => {
    if (activeFilters.brand && p.brand !== activeFilters.brand) return false;
    if (activeFilters.size && p.size !== activeFilters.size) return false;
    if (activeFilters.maxPrice && p.price > activeFilters.maxPrice) return false;
    if (activeFilters.condition && p.condition !== activeFilters.condition) return false;
    return true;
  });

  // Client-side sorting
  filteredProducts.sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    // Default to recent
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // UI Filter configs
  const filterMenus = {
    brand: popularBrands.length > 0 ? popularBrands : ['Adidas', 'Nike', 'Zara'],
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
    maxPrice: [5000, 10000, 20000, 50000, 100000],
    condition: ['Neuf avec étiquette', 'Neuf sans étiquette', 'Très bon état', 'Bon état', 'Satisfaisant']
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto bg-white min-h-screen pt-4 pb-20 text-black">
      <div className="w-full border-b border-gray-200 px-container-margin py-3 mb-6 hidden md:flex items-center gap-6 font-bold text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
        <Link href="#" className="hover:text-primary transition-colors text-black">Brands</Link>
        <Link href="#" className="hover:text-primary transition-colors text-black">Trending</Link>
        <Link href="#" className="text-red-600 hover:text-red-700 transition-colors">Sale</Link>
      </div>

      <div className="px-container-margin">
        <div className="flex items-baseline gap-3 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight truncate" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            "{query}"
          </h1>
          <span className="text-[15px] text-gray-500 font-medium whitespace-nowrap" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            ({filteredProducts.length} {filteredProducts.length > 1 ? 'résultats' : 'résultat'})
          </span>
        </div>

        {/* Popular Brands (act as quick filters) */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="font-bold text-[15px] text-black" style={{ fontFamily: '"Google Sans", sans-serif' }}>Popular brands</span>
          <div className="flex flex-wrap gap-2">
            {(popularBrands.length > 0 ? popularBrands : ['Adidas', 'Nike', 'Yeezy']).map((brand, idx) => (
              <button 
                key={idx} 
                onClick={() => toggleFilter('brand', brand)}
                className={`border rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilters.brand === brand ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:border-gray-500 text-black'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between border-t border-b border-gray-200 py-3 mb-8 gap-4" ref={dropdownRef}>
          <div className="flex flex-wrap items-center gap-3 relative">
            
            {/* Brand Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'brand' ? null : 'brand')}
                className={`flex items-center gap-1 border rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeFilters.brand || activeDropdown === 'brand' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {activeFilters.brand ? activeFilters.brand : 'Marque'}
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              {activeDropdown === 'brand' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-30 py-2">
                  {filterMenus.brand.map(b => (
                    <button key={b} onClick={() => toggleFilter('brand', b)} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${activeFilters.brand === b ? 'font-bold' : ''}`}>
                      {b}
                    </button>
                  ))}
                  {activeFilters.brand && (
                    <button onClick={() => toggleFilter('brand', null)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t mt-1">Effacer</button>
                  )}
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
                className={`flex items-center gap-1 border rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeFilters.maxPrice || activeDropdown === 'price' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {activeFilters.maxPrice ? `< ${activeFilters.maxPrice/1000}k FCFA` : 'Prix'}
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              {activeDropdown === 'price' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-30 py-2">
                  {filterMenus.maxPrice.map(p => (
                    <button key={p} onClick={() => toggleFilter('maxPrice', p)} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${activeFilters.maxPrice === p ? 'font-bold' : ''}`}>
                      Moins de {p.toLocaleString('fr-SN')} FCFA
                    </button>
                  ))}
                  {activeFilters.maxPrice && (
                    <button onClick={() => toggleFilter('maxPrice', null)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t mt-1">Effacer</button>
                  )}
                </div>
              )}
            </div>

            {/* Size Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
                className={`flex items-center gap-1 border rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeFilters.size || activeDropdown === 'size' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {activeFilters.size ? `Taille: ${activeFilters.size}` : 'Taille'}
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              {activeDropdown === 'size' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-30 py-3 px-3 flex flex-wrap gap-2">
                  {filterMenus.size.map(s => (
                    <button key={s} onClick={() => toggleFilter('size', s)} className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${activeFilters.size === s ? 'bg-black text-white border-black hover:bg-gray-800' : 'border-gray-300'}`}>
                      {s}
                    </button>
                  ))}
                  {activeFilters.size && (
                    <button onClick={() => toggleFilter('size', null)} className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-gray-100 border-t mt-1">Effacer</button>
                  )}
                </div>
              )}
            </div>

            {/* Condition Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'condition' ? null : 'condition')}
                className={`flex items-center gap-1 border rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeFilters.condition || activeDropdown === 'condition' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {activeFilters.condition ? activeFilters.condition : 'État'}
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              {activeDropdown === 'condition' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-30 py-2">
                  {filterMenus.condition.map(c => (
                    <button key={c} onClick={() => toggleFilter('condition', c)} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${activeFilters.condition === c ? 'font-bold' : ''}`}>
                      {c}
                    </button>
                  ))}
                  {activeFilters.condition && (
                    <button onClick={() => toggleFilter('condition', null)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t mt-1">Effacer</button>
                  )}
                </div>
              )}
            </div>
            
            <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer ml-1">
              <input type="checkbox" checked={onSale} onChange={(e) => setOnSale(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
              On sale
            </label>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
              className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors bg-white ml-auto"
            >
              <span className="material-symbols-outlined text-[16px] transform rotate-90">swap_vert</span>
              {sortOrder === 'recent' ? 'Trier par' : sortOrder === 'asc' ? 'Prix croissant' : 'Prix décroissant'}
            </button>
            {activeDropdown === 'sort' && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-30 py-2">
                <button onClick={() => { setSortOrder('recent'); setActiveDropdown(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOrder === 'recent' ? 'font-bold' : ''}`}>Plus récent</button>
                <button onClick={() => { setSortOrder('asc'); setActiveDropdown(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOrder === 'asc' ? 'font-bold' : ''}`}>Prix croissant</button>
                <button onClick={() => { setSortOrder('desc'); setActiveDropdown(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOrder === 'desc' ? 'font-bold' : ''}`}>Prix décroissant</button>
              </div>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} onToggleLike={() => {}} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
            <h2 className="text-xl font-bold mb-2 font-headline">Aucun résultat trouvé</h2>
            <p className="text-gray-500 max-w-md font-body">Aucun article ne correspond à ces filtres. Essaie d'élargir ta recherche.</p>
          </div>
        )}
      </div>
    </main>
  );
}
