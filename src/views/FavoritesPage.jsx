"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '../components/Providers';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const { user, supabase, isLoadingAuth, likedItems } = useContext(AppContext);
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!user) {
      setIsLoading(false);
      return;
    }
    
    async function fetchFavorites() {
      setIsLoading(true);
      
      if (!likedItems || likedItems.length === 0) {
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
        .in('id', likedItems);

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
            liked: true
          };
        });
        setProducts(formatted);
      } else {
        console.error("Favorites fetch error:", error);
      }
      setIsLoading(false);
    }

    fetchFavorites();
  }, [user, supabase, isLoadingAuth, likedItems]);

  const handleSelectProduct = (p) => {
    router.push(`/product/${p.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-container-margin py-8 min-h-[60vh]">
      <h1 className="text-[32px] font-bold text-primary uppercase tracking-tight mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
        Mes Favoris
      </h1>

      {isLoading || isLoadingAuth ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !user ? (
        <div className="text-center py-20 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-[64px] text-secondary opacity-50 mb-4">favorite</span>
          <h2 className="text-[20px] font-bold text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Connectez-vous pour voir vos favoris</h2>
          <p className="text-secondary mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vous devez être connecté pour retrouver vos articles sauvegardés.</p>
          <button 
            onClick={() => window.dispatchEvent(new Event('openAuthModal'))}
            className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
          >
            Se connecter
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-[64px] text-secondary opacity-50 mb-4">heart_broken</span>
          <h2 className="text-[20px] font-bold text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Aucun favori</h2>
          <p className="text-secondary mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vous n'avez pas encore d'articles favoris.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-white border border-primary text-primary font-bold py-3 px-8 rounded-full hover:bg-surface-variant transition-colors"
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
          >
            Découvrir des articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onSelect={handleSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
