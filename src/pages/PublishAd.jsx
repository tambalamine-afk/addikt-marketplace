import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PublishAd() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const categories = [
    'Hauts', 'Bas', 'Robes', 'Boubous & tenues trad', 
    'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 
    'Bijoux', 'Vintage'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille unique'];

  const conditions = [
    { label: 'Neuf avec étiquette', color: 'bg-primary' },
    { label: 'Très bon état', color: 'bg-accent-blue' },
    { label: 'Bon état', color: 'bg-accent-yellow' },
    { label: 'Usé', color: 'bg-accent-orange' }
  ];

  return (
    <div className="antialiased flex flex-col min-h-screen bg-background text-on-background font-body-sm overflow-x-hidden">
      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-container-margin py-12 pb-40">
        <div className="flex items-center justify-between mb-12">
          <Link to="/" aria-label="Retour" className="hidden md:block p-2 -ml-2 text-primary hover:bg-surface-container-low rounded-full transition-colors mr-4">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="text-[32px] text-primary flex-1 text-center uppercase tracking-tight font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800 }}>Publier une annonce</h1>
        </div>
        
        <form className="space-y-12">
          {/* Upload Photos Section */}
          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[18px] md:text-[24px] text-primary uppercase" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Photos</h2>
            </div>
            <p className="text-[14px] text-on-surface-variant font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Ajoute jusqu'à 5 photos. La première sera ta photo de couverture.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {/* Zone 1: Cover Photo */}
              <div className="aspect-square bg-surface-container rounded-2xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-surface-dim transition-colors group overflow-hidden border border-dashed border-outline-variant">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors mb-1">add_a_photo</span>
                <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm py-1 px-2 text-center">
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">Couverture</span>
                </div>
              </div>
              
              {/* Other Zones */}
              {[2, 3, 4, 5].map((num) => (
                <div key={num} className={`aspect-square bg-surface-container rounded-2xl flex items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors group border border-dashed border-outline-variant ${num === 5 ? 'hidden sm:flex' : ''}`}>
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary transition-colors">add</span>
                </div>
              ))}
            </div>
          </section>

          {/* Title Section */}
          <section className="space-y-4">
            <label className="text-[18px] md:text-[24px] text-primary uppercase block" htmlFor="title" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Titre de l'annonce</label>
            <input className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium outline-none" id="title" placeholder="Ex: Robe wax imprimé, taille M" type="text" style={{ fontFamily: '"Google Sans", sans-serif' }} />
          </section>

          {/* Category Section */}
          <section className="space-y-4">
            <h2 className="text-[18px] md:text-[24px] text-primary uppercase font-extrabold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Catégorie</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium bg-white ${selectedCategory === cat ? 'bg-primary text-white border-primary chip-active' : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Size Section */}
          <section className="space-y-4">
            <h2 className="text-[18px] md:text-[24px] text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Taille</h2>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium bg-white ${selectedSize === size ? 'bg-primary text-white border-primary chip-active' : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </section>

          {/* Condition Section */}
          <section className="space-y-4">
            <h2 className="text-[18px] md:text-[24px] text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>État</h2>
            <div className="flex flex-wrap gap-3">
              {conditions.map((cond) => (
                <button 
                  key={cond.label}
                  onClick={() => setSelectedCondition(cond.label)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium bg-white ${selectedCondition === cond.label ? 'border-primary text-primary chip-active' : 'border-outline-variant text-on-surface-variant hover:border-primary'}`} 
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                  type="button"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cond.color}`}></span> {cond.label}
                </button>
              ))}
            </div>
          </section>

          {/* Price & Offers Section */}
          <section className="space-y-6">
            <div className="space-y-4">
              <label className="text-[18px] md:text-[24px] text-primary uppercase block font-bold" htmlFor="price" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Prix de vente</label>
              <div className="relative max-w-[200px]">
                <input className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 pr-12 text-[20px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-bold outline-none" id="price" placeholder="0" type="number" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-[20px] text-primary font-bold" style={{ fontFamily: '"Google Sans", sans-serif' }}>F</span>
                </div>
              </div>
              <p className="text-[14px] text-on-surface-variant mt-2 flex items-center gap-1 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                <span className="material-symbols-outlined text-[16px]">info</span>
                Articles similaires vendus entre 5 000 F et 12 000 F
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <div>
                <h3 className="text-[16px] text-primary font-bold" style={{ fontFamily: '"Google Sans", sans-serif' }}>Accepter les offres</h3>
                <p className="text-[14px] text-on-surface-variant mt-1 font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Autoriser les acheteurs à proposer un prix inférieur.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          {/* Description */}
          <section className="space-y-4">
            <label className="text-[18px] md:text-[24px] text-primary uppercase block font-bold" htmlFor="description" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Description</label>
            <textarea className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none font-medium outline-none" id="description" placeholder="Décris ton article, dis ce qui le rend spécial, précise les défauts éventuels..." rows="6" style={{ fontFamily: '"Google Sans", sans-serif' }}></textarea>
          </section>
        </form>
      </main>

      {/* Sticky Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 p-4 px-container-margin z-50">
        <div className="max-w-3xl mx-auto flex justify-center">
          <button className="w-full md:w-auto md:min-w-[400px] bg-primary text-white font-bold text-[16px] py-4 px-8 rounded-full uppercase tracking-wider hover:bg-black/80 transition-colors shadow-lg" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }} type="button">
            Publier l'annonce
          </button>
        </div>
      </div>
    </div>
  );
}
