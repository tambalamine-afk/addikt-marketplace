import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ searchQuery, setSearchQuery, onSell, cartCount, likedCount }) {
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
      <Footer />
    </div>
  );
}
