import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ searchQuery, setSearchQuery, onSell, cartCount, likedCount }) {
  const location = useLocation();
  const isPublishPage = location.pathname === '/publish';

  return (
    <div className="app min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSell={onSell}
        cartCount={cartCount}
        likedCount={likedCount}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isPublishPage && <Footer />}
    </div>
  );
}
