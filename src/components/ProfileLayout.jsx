"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';

export default function ProfileLayout() {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <div className="bg-background text-on-background antialiased min-h-screen font-sans flex flex-col">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1 relative bg-white">
        {/* Main Content Area */}
        <main className="flex-1 w-full flex flex-col min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (Visible only on mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-surface-variant flex justify-around items-center h-16 z-50">
        <Link href="/" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">search</span>
        </Link>
        <Link href="/publish" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">add_circle</span>
        </Link>
        <Link href="/messages" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">chat</span>
        </Link>
        <Link href="/profile/me" className="flex flex-col items-center justify-center text-primary border-t-2 border-primary w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
        </Link>
      </nav>
    </div>
  );
}
