import React, { useState } from 'react';
import { X, Camera, Info } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function SellModal({ onClose, onPublish, addToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('HAUTS');
  const [size, setSize] = useState('M');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('Très bon état');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('/assets/vintage_jacket.png');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'TU'];
  const conditions = [
    { label: 'Neuf avec étiquette', color: 'bg-primary' },
    { label: 'Très bon état', color: 'bg-accent-blue' },
    { label: 'Bon état', color: 'bg-accent-yellow' },
    { label: 'Satisfaisant', color: 'bg-accent-orange' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      addToast('Veuillez remplir le titre et le prix!');
      return;
    }

    const newProduct = {
      id: 'prod-' + Date.now(),
      title,
      price: parseFloat(price),
      priceEur: Math.round(parseFloat(price) / 655),
      category,
      size: size || 'Unique',
      brand: brand || 'Thrift',
      condition,
      seller: {
        handle: 'mon_shop_dakar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        rating: 5.0,
        salesCount: 1,
        location: 'Dakar'
      },
      images: [imagePreview],
      likes: 0,
      isLiked: false,
      description: description || 'Article friperie de qualité mis en vente sur Addikt.',
      tags: ['secondhand', category.toLowerCase()],
      createdAt: new Date().toISOString().split('T')[0]
    };

    onPublish(newProduct);
    addToast('🎉 Votre pièce a été publiée avec succès sur Addikt !');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-background rounded-[32px] w-full max-w-3xl my-8 relative overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-outline-variant/30 px-8 py-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-primary">
            Publier une annonce
          </h2>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pb-32 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Photos */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold font-display uppercase text-primary">Photos</h3>
              <p className="text-sm text-on-surface-variant font-medium">Ajoute jusqu'à 5 photos. La première sera ta photo de couverture.</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                <div 
                  className="aspect-square bg-surface-container rounded-2xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-surface-dim transition-colors group overflow-hidden border border-dashed border-outline-variant"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <img src={imagePreview} alt="Aperçu" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Camera size={32} className="text-white drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm py-1 px-2 text-center">
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">Couverture</span>
                  </div>
                </div>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                
                {/* Empty slots for demo */}
                {[1,2,3,4].map(i => (
                  <div key={i} className={`aspect-square bg-surface-container rounded-2xl flex items-center justify-center cursor-not-allowed border border-dashed border-outline-variant ${i === 4 ? 'hidden sm:flex' : ''}`}>
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant">add</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Title */}
            <section className="space-y-4">
              <label className="text-lg font-bold font-display uppercase text-primary block">Titre de l'annonce</label>
              <input 
                type="text" 
                placeholder="Ex: Robe wax imprimé, taille M" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-base text-primary placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium focus:outline-none"
                required
              />
            </section>

            {/* Category */}
            <section className="space-y-4">
              <label className="text-lg font-bold font-display uppercase text-primary block">Catégorie</label>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.filter(c => c.id !== 'TOUT').map(c => (
                  <button 
                    key={c.id} 
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`px-6 py-2.5 rounded-full border text-sm transition-colors font-medium ${category === c.id ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Size & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                <label className="text-lg font-bold font-display uppercase text-primary block">Taille</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button 
                      key={s} 
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors font-medium ${size === s ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-lg font-bold font-display uppercase text-primary block">Marque</label>
                <input 
                  type="text" 
                  placeholder="Ex: Vintage, Nike..." 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-base text-primary placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium focus:outline-none"
                />
              </section>
            </div>

            {/* Condition */}
            <section className="space-y-4">
              <label className="text-lg font-bold font-display uppercase text-primary block">État</label>
              <div className="flex flex-wrap gap-3">
                {conditions.map(c => (
                  <button 
                    key={c.label} 
                    type="button"
                    onClick={() => setCondition(c.label)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm transition-colors font-medium ${condition === c.label ? 'bg-white border-primary text-primary' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary'}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${c.color}`}></span>
                    {c.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Price */}
            <section className="space-y-4">
              <label className="text-lg font-bold font-display uppercase text-primary block">Prix de vente</label>
              <div className="relative max-w-[200px]">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 pr-12 text-xl text-primary placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-bold focus:outline-none"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-xl text-primary font-bold">F</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant mt-2 flex items-center gap-1 font-medium">
                <Info size={16} /> Articles similaires vendus entre 5 000 F et 12 000 F
              </p>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <label className="text-lg font-bold font-display uppercase text-primary block">Description</label>
              <textarea 
                rows="4" 
                placeholder="Décris ton article, dis ce qui le rend spécial..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-base text-primary placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none font-medium focus:outline-none"
              ></textarea>
            </section>

          </form>
        </div>

        {/* Sticky Submit Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 p-4 px-8 z-20 flex justify-center">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full md:w-auto md:min-w-[400px] bg-primary text-white font-bold text-base py-4 px-8 rounded-full uppercase tracking-wider hover:bg-black/80 transition-colors shadow-lg font-display"
          >
            Publier l'annonce
          </button>
        </div>
      </div>
    </div>
  );
}
