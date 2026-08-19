"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function SellerProfile({ sellerId }) {
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSellerData() {
      if (!sellerId) return;
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sellerId)
        .single();
        
      if (profileData) {
        setSeller(profileData);
      }

      // Fetch listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          price,
          size,
          listing_images (url, position)
        `)
        .eq('seller_id', sellerId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (listingsData) {
        setListings(listingsData);
      }
      
      setLoading(false);
    }
    fetchSellerData();
  }, [sellerId, supabase]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">person_off</span>
        <h2 className="text-xl font-bold">Profil introuvable</h2>
        <Link href="/" className="mt-4 text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <main className="w-full bg-surface-container-lowest text-on-surface font-semibold font-body text-sm">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-accent-orange relative"></div>
      
      {/* Main Profile Container */}
      <div className="max-w-[1200px] mx-auto px-container-margin relative pb-section-gap">
        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-20 md:-mt-24 mb-8">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-container-lowest bg-surface-container overflow-hidden z-10 shadow-lg">
            <img className="w-full h-full object-cover" alt="Seller profile" src={seller.avatar_url || 'https://via.placeholder.com/150?text=Profil'} />
          </div>
          
          {/* Name & Badge */}
          <div className="mt-4 flex items-center gap-2">
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight font-display">{seller.username || 'Utilisateur'}</h1>
            {seller.is_top_boutique && (
              <span className="material-symbols-outlined text-accent-blue text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            )}
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-2 text-secondary text-[14px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span> Sénégal
            </span>
            {seller.created_at && (
              <>
                <span>•</span>
                <span>Membre depuis {new Date(seller.created_at).getFullYear()}</span>
              </>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-3 bg-surface-container-low px-4 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-accent-yellow text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-bold text-on-surface">5.0</span>
            <span className="text-secondary">(0 avis)</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center items-center gap-4 md:gap-12 mb-8 border-outline-variant py-6">
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">0</div>
            <div className="text-sm text-secondary mt-1 font-body">Abonnés</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">{listings.length}</div>
            <div className="text-sm text-secondary mt-1 font-body">Articles en vente</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">100%</div>
            <div className="text-sm text-secondary mt-1 font-body">de réponses</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button className="px-8 py-3 rounded-full border border-primary text-primary text-sm hover:bg-surface-container transition-colors duration-200 min-w-[140px] font-bold font-label-caps uppercase">
            Suivre
          </button>
          <Link href={`/messages/vendeur?id=${seller.id}`} className="px-8 py-3 rounded-full bg-primary text-on-primary text-sm hover:opacity-90 transition-opacity duration-200 min-w-[140px] font-bold font-label-caps uppercase flex items-center justify-center">
            Message
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-8 mb-8 border-b border-outline-variant">
          <button className="pb-3 text-primary text-sm tracking-wider border-b-2 border-primary uppercase font-display font-bold">
            EN VENTE
          </button>
          <button className="pb-3 text-secondary hover:text-primary transition-colors duration-200 text-sm tracking-wider uppercase font-display font-bold">
            VENDU
          </button>
        </div>

        {/* Content Grid ("En vente") */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gutter">
            {listings.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group relative flex flex-col cursor-pointer">
                <div className="relative aspect-[3/4] bg-surface-container rounded-lg overflow-hidden mb-3">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.listing_images?.[0]?.url || 'https://via.placeholder.com/300x400?text=Pas+d%27image'} />
                  <button 
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-sm p-1.5 rounded-full text-secondary hover:text-accent-rose transition-colors z-20"
                  >
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[15px] text-[#111] leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.title}</span>
                  <span className="text-[14px] text-[#555] leading-tight mt-[1px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.size || 'Unique'}</span>
                  <span className="text-[16px] text-black font-bold leading-tight mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.price.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-secondary">
            <span className="material-symbols-outlined text-4xl mb-3 opacity-50">inventory_2</span>
            <p>Cet utilisateur n'a pas encore d'articles en vente.</p>
          </div>
        )}

        <section className="mt-16">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-headline-md uppercase font-display font-bold">Avis</h2>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-accent-yellow text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold font-body">5.0</span>
              <span className="text-secondary text-sm font-body">(0 avis)</span>
            </div>
          </div>
          <div className="space-y-8">
            <div className="py-6 text-center text-secondary border-t border-outline-variant">
              Aucun avis pour le moment.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
