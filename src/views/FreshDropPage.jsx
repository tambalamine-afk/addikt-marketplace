"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '../lib/supabase/client';

export default function FreshDropPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchFreshDrops() {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          price,
          size,
          listing_images (url)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(30);

      if (data) {
        setListings(data);
      }
      setLoading(false);
    }
    fetchFreshDrops();
  }, [supabase]);

  return (
    <main className="w-full min-h-[60vh] bg-white pb-20">
      {/* Header */}
      <section className="w-full border-b border-surface-container-low">
        <div className="max-w-7xl mx-auto px-container-margin py-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Fresh DROP
            </h1>
            <svg className="text-black" fill="currentColor" height="28" viewBox="0 0 100 100" width="28">
              <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-container-margin py-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {listings.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="flex flex-col gap-3 group cursor-pointer">
                <div className="aspect-[3/4] bg-surface-container rounded-2xl w-full mb-2 overflow-hidden relative">
                  <div className="absolute top-2 right-2 z-20" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openAuthModal')); }}>
                    <span className="material-symbols-outlined text-xl text-on-surface hover:text-error transition-colors cursor-pointer drop-shadow-md">favorite</span>
                  </div>
                  <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.listing_images?.[0]?.url || 'https://via.placeholder.com/300x400?text=Pas+d%27image'} />
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[15px] text-[#111] leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.title}</span>
                  <span className="text-[14px] text-[#555] leading-tight mt-[1px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.size || 'Unique'}</span>
                  <span className="text-[16px] text-black font-bold leading-tight mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.price.toLocaleString('fr-FR')} F</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
              new_releases
            </span>
            <h2 className="text-xl font-bold text-on-surface mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Aucun article pour le moment
            </h2>
            <p className="text-on-surface-variant text-sm max-w-xs" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Les nouvelles pépites arrivent bientôt. Publie le premier article Fresh DROP !
            </p>
            <Link
              href="/publish"
              className="mt-8 bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:bg-accent-orange transition-colors"
              style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
            >
              Publier un article
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
