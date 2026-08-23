"use client";
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { createClient } from '../lib/supabase/client';

export const AppContext = React.createContext();

export default function Providers({ children }) {
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [likedItems, setLikedItems] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
      }
      setIsLoadingAuth(false);
    });

    // Écouter les changements d'état (connexion/déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
        fetchUnreadMessages(session.user.id);
        fetchFavorites(session.user.id);
      } else {
        setProfile(null);
        setUnreadMessagesCount(0);
        setLikedItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const fetchFavorites = async (userId) => {
    const { data, error } = await supabase.from('favorites').select('listing_id').eq('user_id', userId);
    if (!error && data) {
      setLikedItems(data.map(f => f.listing_id));
    }
  };

  const toggleFavorite = async (listingId) => {
    if (!user) {
      window.dispatchEvent(new Event('openAuthModal'));
      return;
    }
    const isLiked = likedItems.includes(listingId);
    
    if (isLiked) {
      setLikedItems(prev => prev.filter(id => id !== listingId));
      await supabase.from('favorites').delete().match({ user_id: user.id, listing_id: listingId });
      addToast("Retiré des favoris");
    } else {
      setLikedItems(prev => [...prev, listingId]);
      await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId });
      addToast("Ajouté aux favoris");
    }
  };

  const fetchUnreadMessages = async (userId) => {
    // We want messages where read_at is null, sender_id is not the current user
    // To do this simply without complex joins in the client:
    // Actually we need messages in conversations where the user is a participant.
    // The policy already restricts 'messages' to conversations where the user is a participant.
    // So we just count messages where sender_id != user.id and read_at is.null
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .neq('sender_id', userId)
      .is('read_at', null);
      
    if (!error && count !== null) {
      setUnreadMessagesCount(count);
    }
  };

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    setIsCartOpen(true);
    addToast("Ajouté au panier !");
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      addToast, user, profile, setProfile, isLoadingAuth, supabase, 
      cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, 
      unreadMessagesCount, setUnreadMessagesCount,
      likedItems, toggleFavorite
    }}>
      {children}
      <AuthModal />
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        {toasts.map(t => (
          <div key={t.id} className="bg-black text-white px-6 py-3 rounded-xl shadow-2xl text-[14px] font-bold text-center animate-bounce" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            {t.msg}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}
