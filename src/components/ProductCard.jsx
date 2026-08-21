"use client";
import React from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onSelect, onToggleLike }) {
  const priceStr = product.price?.toLocaleString('fr-FR') + ' F';
  const oldPriceStr = product.oldPrice ? product.oldPrice.toLocaleString('fr-FR') + ' F' : null;

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
          className="absolute bottom-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
          onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
          title="Favoris"
        >
          <Heart size={18} fill={product.liked ? '#e20020' : 'none'} className={product.liked ? 'text-error' : 'text-primary'} />
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
