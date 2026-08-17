"use client";
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({ 
  products, 
  activeCategory, 
  onSelectProduct, 
  onToggleLike, 
  onOpenSell,
  onOpenSeller,
  searchQuery
}) {
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'price-low', 'price-high', 'popular'
  const [conditionFilter, setConditionFilter] = useState('ALL');

  // Filter products by category
  let filtered = products.filter((p) => {
    if (activeCategory !== 'TOUT' && p.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand?.toLowerCase().includes(q);
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchTags) return false;
    }
    if (conditionFilter !== 'ALL' && p.condition !== conditionFilter) {
      return false;
    }
    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
    return 0; // recent
  });

  return (
    <section className="main-content" id="feed-section">
      {/* Header Bar */}
      <div className="feed-header">
        <div className="feed-title-group">
          <h2 className="feed-title">{activeCategory}</h2>
          <span className="feed-count">{filtered.length} pièce(s)</span>
        </div>

        {filtered.length > 0 && (
          <div className="filter-bar">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Nouveautés</option>
              <option value="popular">Plus populaires</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
            </select>

            <select
              className="sort-select"
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
            >
              <option value="ALL">Toutes conditions</option>
              <option value="Neuf avec étiquette">Neuf avec étiquette</option>
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onToggleLike={onToggleLike}
              onOpenSeller={onOpenSeller}
            />
          ))}
        </div>
      ) : (
        /* Empty State Matching Screenshot */
        <div className="empty-state-box">
          <h3 className="empty-state-title">AUCUNE PIÈCE ICI POUR L'INSTANT</h3>
          <p className="empty-state-sub">Sois le premier à dropper une pièce.</p>
          <button className="btn-empty-action" onClick={onOpenSell}>
            PUBLIER UNE ANNONCE
          </button>
        </div>
      )}
    </section>
  );
}
