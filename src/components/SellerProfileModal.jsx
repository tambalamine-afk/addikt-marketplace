"use client";
import React from 'react';
import { X, Star, MapPin, CheckCircle, Package } from 'lucide-react';
import ProductCard from './ProductCard';

export default function SellerProfileModal({ seller, products, onClose, onSelectProduct, onToggleLike, onOpenSeller }) {
  if (!seller) return null;

  // Filter products by this seller handle
  const sellerProducts = products.filter(p => p.seller?.handle === seller.handle);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px', padding: '32px' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Seller Banner */}
        <div className="flex items-center gap-5 pb-6 border-b border-surface-variant mb-6">
          <img 
            src={seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
            alt={seller.handle} 
            className="w-20 h-20 rounded-full object-cover border-4 border-accent-orange"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black font-display uppercase">@{seller.handle}</h2>
              <span className="bg-surface-container text-accent-blue text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 font-body">
                <CheckCircle size={12} /> VENDEUR VÉRIFIÉ
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-secondary font-body flex-wrap mt-2">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{seller.location || 'Dakar, Sénégal'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} fill="#FFD700" color="#FFD700" />
                <strong className="text-on-surface">{seller.rating || '5.0'}</strong> (48 avis)
              </div>
              <div className="flex items-center gap-1">
                <Package size={14} />
                <span>{seller.salesCount || '100+'} ventes effectuées</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Inventory Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black uppercase font-display">
            PIÈCES DU VENDEUR ({sellerProducts.length})
          </h3>
        </div>

        {/* Seller Grid */}
        <div className="product-grid">
          {sellerProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelect={(p) => {
                onClose();
                onSelectProduct(p);
              }}
              onToggleLike={onToggleLike}
              onOpenSeller={onOpenSeller}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
