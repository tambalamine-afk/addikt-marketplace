import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import AuthModal from './components/AuthModal';
import { PRODUCTS } from './data/mockData';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifySMS from './pages/Auth/VerifySMS';
import Inbox from './pages/Messages/Inbox';
import Chat from './pages/Messages/Chat';
import ProfileLayout from './components/ProfileLayout';
import MyProfile from './pages/Profile/MyProfile';
import Settings from './pages/Profile/Settings';
import SellerProfile from './pages/Profile/SellerProfile';
import Category from './pages/Category';
import PublishAd from './pages/PublishAd';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const toggleLike = (id) => {
    window.dispatchEvent(new Event('openAuthModal'));
  };

  const likedCount = products.filter(p => p.liked).length;

  const handleSelect = (product) => {
    // Legacy modal function - can be removed or kept for backward compatibility
  };

  return (
    <Router>
      <AuthModal />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-sms" element={<VerifySMS />} />
        
        {/* Layout with Header and Footer */}
        <Route element={<Layout 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSell={() => addToast('Fonctionnalité de vente bientôt disponible !')}
            cartCount={0}
            likedCount={likedCount}
          />}>
          <Route path="/" element={<LandingPage products={products} handleSelect={handleSelect} />} />
          <Route path="/category/:id?" element={<Category products={products} handleSelect={handleSelect} />} />
          <Route path="/product/:id" element={<ProductPage products={products} toggleLike={toggleLike} addToast={addToast} />} />
          <Route path="/messages" element={<Inbox />} />
          <Route path="/seller/:id" element={<SellerProfile />} />
          <Route path="/publish" element={<PublishAd />} />
        </Route>
        
        {/* Profile Routes with dedicated Sidebar Layout */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path="me" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Chat without Layout */}
        <Route path="/messages/:id" element={<Chat />} />
      </Routes>

      <div className="toast-container">
        {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
      </div>
    </Router>
  );
}
