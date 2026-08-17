"use client";
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductScroller({ title, products, onSelectProduct, onToggleLike, onOpenSeller }) {
  return (
    <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase' }}>{title}</h2>
        <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-orange)', textDecoration: 'none' }}>Voir plus</a>
      </div>
      
      <div 
        style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto', 
          paddingBottom: '16px',
          scrollbarWidth: 'none', // Firefox
        }}
        className="hide-scrollbar"
      >
        {products.map(product => (
          <div key={product.id} style={{ minWidth: '220px', maxWidth: '220px' }}>
            <ProductCard 
              product={product}
              onSelect={onSelectProduct}
              onToggleLike={onToggleLike}
              onOpenSeller={onOpenSeller}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
