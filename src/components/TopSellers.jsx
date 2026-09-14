"use client";
import Link from 'next/link';
import React from 'react';

export default function TopSellers({ topBoutiques = [] }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
      <h2 className="font-headline-md text-primary text-2xl mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
        Les Top Boutiques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topBoutiques.length > 0 ? topBoutiques.map(seller => (
          <div key={seller.id} className="bg-white border border-outline-variant/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[0, 1, 2, 3].map(idx => {
                const imageSrc = seller.listings?.[idx]?.listing_images?.[0]?.url;
                return (
                  <div key={idx} className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                    {imageSrc ? (
                      <img src={imageSrc} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        <span className="material-symbols-outlined text-sm">inventory_2</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={seller.avatar_url || 'https://via.placeholder.com/100'} alt={seller.username} className="w-10 h-10 rounded-full object-cover bg-surface-container border border-gray-200" />
                <div>
                  <h3 className="font-bold text-sm text-primary leading-tight">{seller.username || 'Boutique'}</h3>
                  <p className="text-xs text-secondary">@{seller.username ? seller.username.toLowerCase().replace(/\s+/g, '') : 'boutique'}</p>
                </div>
              </div>
              <Link href={`/seller/${seller.id}`} className="bg-primary text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-black transition-colors">
                Voir la boutique
              </Link>
            </div>
          </div>
        )) : (
          <div className="col-span-full bg-surface-container-low rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="font-bold text-primary text-lg" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Deviens la première Top Boutique</h3>
              <p className="text-on-surface-variant text-sm mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Les boutiques les plus sérieuses sont mises en avant ici, avec un badge vérifié.</p>
            </div>
            <Link href="/top-seller" className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-full whitespace-nowrap hover:bg-black transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Découvrir le programme
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
