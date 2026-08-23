"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function SellerProfile({ sellerId }) {
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchSellerData() {
      if (!sellerId) return;
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (user) setCurrentUser(user);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sellerId)
        .single();
        
      if (profileData) {
        setSeller(profileData);
      }

      // Fetch followers count
      const { count: followersCount } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', sellerId);
      
      setFollowerCount(followersCount || 0);

      // Check if current user is following
      if (user) {
        const { data: followData } = await supabase
          .from('followers')
          .select('*')
          .eq('follower_id', user.id)
          .eq('following_id', sellerId)
          .single();
          
        if (followData) {
          setIsFollowing(true);
        }
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

  const handleToggleFollow = async () => {
    if (!currentUser) {
      window.dispatchEvent(new Event('openAuthModal'));
      return;
    }
    if (isTogglingFollow) return;
    
    setIsTogglingFollow(true);
    if (isFollowing) {
      // Unfollow
      const { error } = await supabase
        .from('followers')
        .delete()
        .eq('follower_id', currentUser.id)
        .eq('following_id', sellerId);
        
      if (!error) {
        setIsFollowing(false);
        setFollowerCount(prev => Math.max(0, prev - 1));
      }
    } else {
      // Follow
      const { error } = await supabase
        .from('followers')
        .insert([{ follower_id: currentUser.id, following_id: sellerId }]);
        
      if (!error) {
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
      }
    }
    setIsTogglingFollow(false);
  };

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
      <div className="w-full bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto h-[250px] md:h-[350px] md:rounded-b-2xl overflow-hidden bg-accent-orange relative">
          {seller.cover_url ? (
            <img src={seller.cover_url} alt="Couverture" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-accent-orange to-accent-rose opacity-90"></div>
          )}
        </div>
      </div>
      
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
              <span className="material-symbols-outlined text-black text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            )}
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-2 text-black text-[14px]">
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
            <span className="text-black">(0 avis)</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center items-center gap-4 md:gap-12 mb-8 border-outline-variant py-6">
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">{followerCount}</div>
            <div className="text-sm text-black mt-1 font-body">Abonnés</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">{listings.length}</div>
            <div className="text-sm text-black mt-1 font-body">Articles en vente</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">100%</div>
            <div className="text-sm text-black mt-1 font-body">de réponses</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {currentUser?.id !== seller.id && (
            <button 
              onClick={handleToggleFollow}
              disabled={isTogglingFollow}
              className={`px-8 py-3 rounded-full border text-sm transition-colors duration-200 min-w-[140px] font-bold font-label-caps uppercase ${isFollowing ? 'border-outline-variant text-secondary bg-surface-container hover:bg-surface-container-high' : 'border-primary text-primary hover:bg-surface-container'}`}
            >
              {isTogglingFollow ? '...' : (isFollowing ? 'Suivi' : 'Suivre')}
            </button>
          )}
          <button 
            onClick={() => {
              if (!currentUser) {
                window.dispatchEvent(new Event('openAuthModal'));
              } else {
                router.push(`/messages/vendeur?id=${seller.id}`);
              }
            }}
            className="px-8 py-3 rounded-full bg-primary text-on-primary text-sm hover:opacity-90 transition-opacity duration-200 min-w-[140px] font-bold font-label-caps uppercase flex items-center justify-center"
          >
            Message
          </button>
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
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openAuthModal')); }}
                    className="absolute top-2 right-2 z-20 p-1.5 transition-transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-[24px] text-white hover:text-[#e20020] transition-colors cursor-pointer drop-shadow-md">favorite</span>
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
              <span className="text-black text-sm font-body">(0 avis)</span>
            </div>
          </div>
          <div className="space-y-8">
            <div className="py-6 text-center text-black border-t border-outline-variant">
              Aucun avis pour le moment.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
