"use client";
import React, { useContext } from 'react';
import { Heart } from 'lucide-react';
import { AppContext } from './Providers';

export default function ProductCard({ product, onSelect, onToggleLike }) {
  const { user, likedItems, toggleFavorite } = useContext(AppContext);
  const priceStr = product.price?.toLocaleString('fr-FR') + ' F';
  const oldPriceStr = product.oldPrice ? product.oldPrice.toLocaleString('fr-FR') + ' F' : null;
  const isLiked = product.liked !== undefined ? product.liked : likedItems?.includes(product.id);

  return (
    <div className="flex flex-col cursor-pointer group w-full" onClick={() => onSelect(product)}>
      <div className="relative w-full aspect-[3/4] bg-surface-container-lowest overflow-hidden mb-2 rounded-sm border border-outline/10">
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          className="absolute bottom-2 right-2 p-1.5 transition-transform hover:scale-110 z-20"
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault();
            if (!user) {
              window.dispatchEvent(new Event('openAuthModal'));
              return;
            }
            if (onToggleLike) {
              onToggleLike(product.id); 
            } else {
              toggleFavorite(product.id);
            }
          }}
          title="Favoris"
        >
          <Heart 
            size={24} 
            stroke={isLiked ? '#e20020' : 'white'} 
            strokeWidth={2} 
            fill={isLiked ? '#e20020' : 'none'} 
            className="drop-shadow-md"
          />
        </button>
      </div>
      <div className="flex flex-col px-1">
        <div className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">{product.size}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`font-bold ${oldPriceStr ? 'text-error' : 'text-primary'}`}>{priceStr}</span>
          {oldPriceStr && <span className="text-xs text-on-surface-variant line-through">{oldPriceStr}</span>}
        </div>
      </div>
    </div>
  );
}
