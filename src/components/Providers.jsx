"use client";
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { createClient } from '../lib/supabase/client';

export const AppContext = React.createContext();

export default function Providers({ children }) {
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoadingAuth(false);
    });

    // Écouter les changements d'état (connexion/déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  return (
    <AppContext.Provider value={{ addToast, user, isLoadingAuth, supabase }}>
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
