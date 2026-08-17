"use client";
import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function CategoryNav({ activeCategory, setActiveCategory }) {
  return (
    <nav className="category-nav">
      <ul className="category-list">
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <button
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
