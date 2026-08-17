"use client";
import React from 'react';
import { PRICE_RANGES } from '../data/mockData';

export default function ShopByPrice() {
  return (
    <section style={{ margin: '48px auto', padding: '0 24px', maxWidth: 1280 }}>
      <div className="section-header">
        <h2 className="section-title">Magasiner par prix</h2>
      </div>
      <div className="price-grid">
        {PRICE_RANGES.map(p => (
          <button key={p.max} className="price-block">{p.label}</button>
        ))}
      </div>
    </section>
  );
}
