"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/phone-login', '/verify-sms', '/forgot-password', '/reset-password'].includes(pathname);
  const noFooterPage = isAuthPage || pathname === '/publish';

  return (
    <div className="app min-h-screen flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!noFooterPage && <Footer />}
      <CartDrawer />
      <AuthModal />
    </div>
  );
}
