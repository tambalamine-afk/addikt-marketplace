"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../components/Providers';
import ProductCard from '../../components/ProductCard';

export default function MyProfile() {
  const { user, supabase, isLoadingAuth, addToast } = useContext(AppContext);
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('selling'); // 'selling', 'favorites', 'sold'
  const [phone, setPhone] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Profile & Data
  useEffect(() => {
    if (isLoadingAuth) return;
    
    if (!user) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        // 1. Fetch Profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
          if (profileData.phone) setPhone(profileData.phone);
        }

        // 2. Fetch Active Listings
        const { data: activeData } = await supabase
          .from('listings')
          .select(`*, listing_images (url, position)`)
          .eq('seller_id', user.id)
          .eq('status', 'active');

        if (activeData) {
          setListings(formatListings(activeData));
        }

        // 3. Fetch Sold Listings
        const { data: soldData } = await supabase
          .from('listings')
          .select(`*, listing_images (url, position)`)
          .eq('seller_id', user.id)
          .eq('status', 'sold');

        if (soldData) {
          setSoldListings(formatListings(soldData));
        }

        // 4. Fetch Favorites
        const { data: favData } = await supabase
          .from('favorites')
          .select(`
            listing_id,
            listings (
              *,
              listing_images (url, position)
            )
          `)
          .eq('user_id', user.id);

        if (favData) {
          // Flatten the favorites structure
          const formattedFavs = favData
            .filter(f => f.listings) // In case the listing was deleted
            .map(f => {
              const formatted = formatListing(f.listings);
              formatted.liked = true;
              return formatted;
            });
          setFavorites(formattedFavs);
        }

      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user, isLoadingAuth, supabase]);

  // Format Helper
  const formatListing = (item) => {
    // Sort images by position to get the cover
    const sortedImages = item.listing_images?.sort((a, b) => a.position - b.position) || [];
    const coverImage = sortedImages.length > 0 ? sortedImages[0].url : 'https://placehold.co/400x500/eaeaea/a0a0a0?text=Pas+d%27image';
    
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      size: item.size,
      brand: item.brand,
      image: coverImage,
      liked: false // By default, overridden in favorites
    };
  };

  const formatListings = (data) => {
    return data.map(formatListing);
  };

  const handleSelectProduct = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleSavePhone = async () => {
    try {
      const { error } = await supabase.from('profiles').update({ phone }).eq('id', user.id);
      if (error) throw error;
      setProfile(prev => ({ ...prev, phone }));
      setIsEditingPhone(false);
      addToast("Numéro WhatsApp mis à jour");
    } catch (err) {
      console.error(err);
      addToast("Erreur lors de la mise à jour du numéro");
    }
  };

  const handleToggleLike = async (productId) => {
    if (!user) {
      addToast("Connecte-toi pour ajouter aux favoris");
      return;
    }

    // Check if it's already liked
    const isLiked = favorites.some(f => f.id === productId);

    try {
      if (isLiked) {
        // Unlike
        await supabase.from('favorites').delete().match({ user_id: user.id, listing_id: productId });
        setFavorites(prev => prev.filter(f => f.id !== productId));
        addToast("Retiré des favoris");
      } else {
        // Like (Though in 'MyProfile' you usually interact with your own favs)
        await supabase.from('favorites').insert({ user_id: user.id, listing_id: productId });
        // Assuming we liked something in the 'selling' tab, we need to add it to favorites list
        // So we should find it in listings and add it to favorites state
        const likedItem = listings.find(l => l.id === productId) || soldListings.find(l => l.id === productId);
        if (likedItem) {
          setFavorites(prev => [...prev, { ...likedItem, liked: true }]);
        }
        addToast("Ajouté aux favoris");
      }
    } catch (err) {
      console.error(err);
      addToast("Erreur lors de la modification des favoris");
    }
  };

  // UI Helpers
  const getInitial = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (profile?.username) return profile.username;
    if (user?.email) return user.email.split('@')[0];
    return "Utilisateur";
  };

  if (isLoading) {
    return (
      <main className="flex-1 w-full flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center justify-center bg-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Connecte-toi</h2>
        <p className="text-on-surface-variant mb-6">Tu dois être connecté pour voir ton profil.</p>
        <Link href="/login" className="bg-[#1b1b1b] text-white font-bold py-3 px-8 rounded-full">
          Se connecter
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex flex-col bg-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
      
      {/* Profile Header */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-6">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-[100px] h-[100px] rounded-full object-cover" />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-[#757575] flex items-center justify-center text-white text-[32px] font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              {getInitial()}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[22px] font-bold text-gray-900 leading-none" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              {getDisplayName()}
            </h1>
            <div className="flex items-center gap-2 mt-0.5 text-gray-300 text-sm">
              <div className="flex gap-0.5 text-accent-yellow">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {i <= Math.round(profile?.rating_avg || 0) ? 'star' : 'star'} 
                  </span>
                ))}
              </div>
              <span className="text-gray-500 font-medium">({profile?.rating_count || 0})</span>
            </div>
            <div className="text-gray-500 text-sm mt-0.5 flex flex-col">
              <span>Actif aujourd'hui</span>
              <span className="text-[12px] opacity-70">Membre depuis {new Date(profile?.created_at || user?.created_at).getFullYear()}</span>
            </div>
            <div className="text-gray-500 text-sm mt-2 flex flex-col items-start gap-2">
              {isEditingPhone ? (
                <div className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Ex: +221..."
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-black text-black"
                  />
                  <button onClick={handleSavePhone} className="bg-black text-white px-3 py-1 rounded text-xs font-bold">Enregistrer</button>
                  <button onClick={() => setIsEditingPhone(false)} className="text-gray-500 text-xs underline">Annuler</button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-black">WhatsApp : {profile?.phone || 'Non renseigné'}</span>
                  <button onClick={() => setIsEditingPhone(true)} className="text-blue-600 text-xs underline">{profile?.phone ? 'Modifier' : 'Ajouter'}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-10 flex gap-8">
        <button 
          onClick={() => setActiveTab('selling')}
          className={`pb-3 font-bold text-[15px] transition-colors border-b-[3px] ${activeTab === 'selling' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`} 
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          En vente ({listings.length})
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 font-bold text-[15px] transition-colors border-b-[3px] ${activeTab === 'favorites' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`} 
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          Favoris ({favorites.length})
        </button>
        <button 
          onClick={() => setActiveTab('sold')}
          className={`pb-3 font-bold text-[15px] transition-colors border-b-[3px] ${activeTab === 'sold' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`} 
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          Vendues ({soldListings.length})
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'selling' && (
          listings.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {listings.map(product => (
                <ProductCard 
                  key={product.id}
                  product={{...product, liked: favorites.some(f => f.id === product.id)}}
                  onSelect={handleSelectProduct}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-gray-100 shadow-sm mt-8">
              <div className="mb-4 text-gray-800">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round"></path>
                  <circle cx="15.5" cy="15.5" r="3.5" fill="black" stroke="none"></circle>
                  <path d="M15.5 13.5v4M13.5 15.5h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
                </svg>
              </div>
              <p className="text-gray-500 text-[15px] mb-6 font-medium">
                Commence à vendre dès aujourd'hui et transforme tes vêtements en cash.
              </p>
              <Link href="/publish" className="bg-[#1b1b1b] text-white font-bold py-3 px-8 rounded-full text-[15px] hover:bg-black transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Publier une annonce
              </Link>
            </div>
          )
        )}

        {activeTab === 'favorites' && (
          favorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {favorites.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-gray-100 shadow-sm mt-8">
              <div className="mb-4 text-gray-800">
                <span className="material-symbols-outlined text-[48px] text-gray-300">favorite</span>
              </div>
              <h3 className="font-bold text-[18px] mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Aucun favori</h3>
              <p className="text-gray-500 text-[15px] mb-6 font-medium">
                Les pièces que tu aimes apparaîtront ici. Explore le catalogue pour trouver ton bonheur !
              </p>
              <Link href="/" className="bg-[#1b1b1b] text-white font-bold py-3 px-8 rounded-full text-[15px] hover:bg-black transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Explorer
              </Link>
            </div>
          )
        )}

        {activeTab === 'sold' && (
          soldListings.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {soldListings.map(product => (
                <ProductCard 
                  key={product.id}
                  product={{...product, liked: favorites.some(f => f.id === product.id)}}
                  onSelect={handleSelectProduct}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-gray-100 shadow-sm mt-8">
              <div className="mb-4 text-gray-800">
                <span className="material-symbols-outlined text-[48px] text-gray-300">check_circle</span>
              </div>
              <h3 className="font-bold text-[18px] mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Rien de vendu pour le moment</h3>
              <p className="text-gray-500 text-[15px] mb-6 font-medium">
                Tes pièces vendues avec succès apparaîtront ici.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
