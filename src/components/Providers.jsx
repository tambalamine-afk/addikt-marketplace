"use client";
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { ConfirmProvider } from './ConfirmDialog';
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
    // Favoris et messages non lus du membre connecté
    const fetchFavorites = async (userId) => {
      const { data, error } = await supabase.from('favorites').select('listing_id').eq('user_id', userId);
      if (!error && data) {
        setLikedItems(data.map(f => f.listing_id));
      }
    };

    const fetchUnreadMessages = async (userId) => {
      // Les règles d'accès limitent déjà « messages » aux conversations du membre
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .neq('sender_id', userId)
        .is('read_at', null);

      if (!error && count !== null) {
        setUnreadMessagesCount(count);
      }
    };

    // Récupérer la session actuelle
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
        fetchUnreadMessages(session.user.id);
        fetchFavorites(session.user.id);
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

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('addikt_cart');
      if (savedCart) {
        // Lecture après l'affichage, volontairement : lu pendant le rendu, le panier du
        // serveur (vide) et celui du navigateur différeraient à l'hydratation.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('addikt_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = async (listingId) => {
    if (!user) {
      window.dispatchEvent(new Event('openAuthModal'));
      return;
    }
    const isLiked = likedItems.includes(listingId);
    
    if (isLiked) {
      setLikedItems(prev => prev.filter(id => id !== listingId));
      const { error } = await supabase.from('favorites').delete().match({ user_id: user.id, listing_id: listingId });
      if (error) console.error("Error removing favorite:", error);
      addToast("Retiré des favoris");
    } else {
      setLikedItems(prev => [...prev, listingId]);
      const { error } = await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId });
      if (error) console.error("Error adding favorite:", error);
      addToast("Ajouté aux favoris");
    }
  };

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // Badge des messages non lus en direct, et alerte quand une commande avance
  useEffect(() => {
    if (!user || !supabase.channel) return;

    const channel = supabase
      .channel(`inbox-${user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        // Les règles d'accès ne transmettent que les messages de ses propres conversations
        if (payload.new.sender_id === user.id) return;
        setUnreadMessagesCount((count) => count + 1);
        if (payload.new.kind === 'order') {
          addToast('Du nouveau sur une de tes commandes : ouvre tes messages.');
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

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
      <ConfirmProvider>{children}</ConfirmProvider>
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
