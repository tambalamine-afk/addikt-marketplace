"use client";
import React from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onSelect, onToggleLike }) {
  const priceStr = product.price?.toLocaleString('fr-FR') + ' F';
  const oldPriceStr = product.oldPrice ? product.oldPrice.toLocaleString('fr-FR') + ' F' : null;

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="card-img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          className={`card-heart ${product.liked ? 'liked' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
          title="Favoris"
        >
          <Heart size={16} fill={product.liked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-info">
        <div className="card-size">{product.size}</div>
        <div className="card-price">
          {oldPriceStr && <span className="card-price-old">{oldPriceStr}</span>}
          <span className={oldPriceStr ? 'card-price-promo' : ''}>{priceStr}</span>
        </div>
      </div>
    </div>
  );
}
