"use client";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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

  // Mock filters for UI
  const filterOptions = [
    { label: "Category", icon: true },
    { label: "Brand", icon: true },
    { label: "Price", icon: true },
    { label: "Size", icon: true },
    { label: "Color", icon: true },
    { label: "Condition", icon: true },
  ];

  useEffect(() => {
    async function fetchSearchResults() {
      setIsLoading(true);
      if (!query) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      // Fetch products matching query in title, brand or description
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
        // Format for ProductCard
        const formatted = data.map(item => {
          const sortedImages = item.listing_images?.sort((a, b) => a.position - b.position) || [];
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            size: item.size,
            brand: item.brand,
            image: sortedImages.length > 0 ? sortedImages[0].url : 'https://placehold.co/400x500/eaeaea/a0a0a0?text=Pas+d%27image',
            seller: item.profiles,
            liked: false
          };
        });
        setProducts(formatted);
        
        // Extract unique brands for the chips
        const brands = new Set();
        data.forEach(p => {
          if (p.brand) brands.add(p.brand);
        });
        setPopularBrands(Array.from(brands).slice(0, 5)); // max 5 brands
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

  return (
    <main className="w-full max-w-[1440px] mx-auto bg-white min-h-screen pt-4 pb-20 text-black">
      
      {/* Top Banner (Optional: Brands, Trending, Sale) */}
      <div className="w-full border-b border-gray-200 px-container-margin py-3 mb-6 hidden md:flex items-center gap-6 font-bold text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
        <Link href="#" className="hover:text-primary transition-colors text-black">Brands</Link>
        <Link href="#" className="hover:text-primary transition-colors text-black">Trending</Link>
        <Link href="#" className="text-red-600 hover:text-red-700 transition-colors">Sale</Link>
      </div>

      <div className="px-container-margin">
        {/* Title Section */}
        <div className="flex items-baseline gap-3 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            "{query}"
          </h1>
          <span className="text-[15px] text-gray-500 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            ({products.length} {products.length > 1 ? 'results' : 'result'})
          </span>
        </div>

        {/* Popular Brands Section */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="font-bold text-[15px] text-black" style={{ fontFamily: '"Google Sans", sans-serif' }}>Popular brands</span>
          <div className="flex flex-wrap gap-2">
            {popularBrands.length > 0 ? (
              popularBrands.map((brand, idx) => (
                <button key={idx} className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:border-gray-500 transition-colors bg-white">
                  {brand}
                </button>
              ))
            ) : (
              // Fallback static brands if none found to match the screenshot vibe
              <>
                <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:border-gray-500 transition-colors bg-white">Adidas</button>
                <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:border-gray-500 transition-colors bg-white">Nike</button>
                <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:border-gray-500 transition-colors bg-white">Yeezy</button>
              </>
            )}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between border-t border-b border-gray-200 py-3 mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {filterOptions.map((filter, idx) => (
              <button key={idx} className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors bg-white">
                {filter.label}
                {filter.icon && <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>}
              </button>
            ))}
            
            <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer ml-1">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
              On sale
            </label>
          </div>

          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors bg-white ml-auto">
            <span className="material-symbols-outlined text-[16px] transform rotate-90">swap_vert</span>
            Sort
          </button>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} onToggleLike={() => {}} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
            <h2 className="text-xl font-bold mb-2 font-headline">Aucun résultat trouvé</h2>
            <p className="text-gray-500 max-w-md font-body">Nous n'avons trouvé aucun article correspondant à "{query}". Essaie de modifier tes mots-clés ou de chercher une autre marque.</p>
          </div>
        )}
      </div>
    </main>
  );
}
