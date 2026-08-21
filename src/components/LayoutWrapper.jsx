"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/phone-login' || pathname === '/verify-sms';
  const noFooterPage = isAuthPage || pathname === '/publish';

  return (
    <div className="app min-h-screen flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!noFooterPage && <Footer />}
      <CartDrawer />
    </div>
  );
}
