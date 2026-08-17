import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PublishAd() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Create object URLs for the uploaded files to display them
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5)); // Max 5 photos
  };

  const categoriesData = {
    'Femmes': ['Hauts', 'Bas', 'Robes', 'Boubous & tenues trad', 'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 'Bijoux', 'Vintage'],
    'Hommes': ['T-shirts & Polos', 'Pantalons', 'Sweats & Pulls', 'Vestes & Manteaux', 'Costumes', 'Chaussures', 'Accessoires', 'Sneakers', 'Vintage'],
    'Enfants': ['Bébé', 'Filles (2-14 ans)', 'Garçons (2-14 ans)', 'Chaussures', 'Jouets', 'Livres', 'Puériculture', 'Accessoires'],
    'Sneakers': ['Basses', 'Montantes', 'Running', 'Lifestyle', 'Vintage', 'Éditions limitées', 'Accessoires'],
    'Beauté': ['Maquillage', 'Soins visage', 'Soins corps', 'Parfums', 'Accessoires beauté']
  };

  const navigate = useNavigate();

  const handlePublish = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille unique'];
  if (selectedCategory === 'Enfants') {
    sizes = ['0-2 ans', '3-5 ans', '6-8 ans', '9-14 ans', 'Taille unique'];
  } else if (selectedCategory === 'Sneakers' || selectedSubcategory === 'Chaussures') {
    sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47+'];
  } else if (selectedCategory === 'Beauté') {
    sizes = []; // No sizes for beauty, or we hide it
  }

  let brands = [];
  if (selectedCategory === 'Sneakers') {
    brands = ['Air Jordan', 'Nike Dunk', 'Yeezy', 'New Balance', 'Converse', 'Asics', 'Salomon', 'Vans', 'Puma', 'Balenciaga', 'Autre'];
  } else if (selectedCategory === 'Femmes' || selectedCategory === 'Hommes') {
    brands = ['Zara', 'H&M', 'Mango', 'Asos', 'Autre'];
  }

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
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
              />
              
              {/* Zone 1: Cover Photo */}
              <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-surface-container rounded-2xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-surface-dim transition-colors group overflow-hidden border border-dashed border-outline-variant">
                {photos[0] ? (
                  <img src={photos[0]} alt="Couverture" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors mb-1">add_a_photo</span>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm py-1 px-2 text-center">
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">Couverture</span>
                </div>
              </div>
              
              {/* Other Zones */}
              {[1, 2, 3, 4].map((index) => (
                <div key={index} onClick={() => fileInputRef.current?.click()} className={`aspect-square bg-surface-container rounded-2xl flex items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors group overflow-hidden border border-dashed border-outline-variant ${index === 4 ? 'hidden sm:flex' : ''}`}>
                  {photos[index] ? (
                    <img src={photos[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary transition-colors">add</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Title Section */}
          <section className="space-y-4">
            <label className="font-headline-md text-headline-md text-primary uppercase block font-bold" htmlFor="title" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Titre de l'annonce</label>
            <input className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium outline-none" id="title" placeholder="Ex: Robe wax imprimé, taille M" type="text" style={{ fontFamily: '"Google Sans", sans-serif' }} />
          </section>

          {/* Category Section */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Département</h2>
            <div className="flex flex-wrap gap-3">
              {Object.keys(categoriesData).map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { 
                    if (selectedCategory === cat) {
                      setSelectedCategory('');
                      setSelectedSubcategory('');
                      setSelectedBrand('');
                      setSelectedSize('');
                    } else {
                      setSelectedCategory(cat); 
                      setSelectedSubcategory(''); 
                      setSelectedBrand('');
                      setSelectedSize(''); 
                    }
                  }}
                  className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium ${selectedCategory === cat ? 'bg-primary text-white border-primary chip-active' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                  style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div className="pt-4">
                <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold mb-3" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Sous-catégorie</h2>
                <div className="flex flex-wrap gap-3">
                  {categoriesData[selectedCategory].map((sub) => (
                    <button 
                      key={sub}
                      onClick={() => { 
                        if (selectedSubcategory === sub) {
                          setSelectedSubcategory('');
                          setSelectedSize('');
                        } else {
                          setSelectedSubcategory(sub); 
                          setSelectedSize(''); 
                        }
                      }}
                      className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium ${selectedSubcategory === sub ? 'bg-primary text-white border-primary chip-active' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                      style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                      type="button"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Brand Section */}
          {brands.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Marque</h2>
              <div className="flex flex-wrap gap-3">
                {brands.map((brand) => (
                  <button 
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                    className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium ${selectedBrand === brand ? 'bg-primary text-white border-primary chip-active' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                    type="button"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Size Section */}
          {sizes.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Taille</h2>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`px-6 py-2.5 rounded-full border text-[14px] transition-colors font-medium ${selectedSize === size ? 'bg-primary text-white border-primary chip-active' : 'bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`} 
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 300 }} 
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Condition Section */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>État</h2>
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
              <label className="font-headline-md text-headline-md text-primary uppercase block font-bold" htmlFor="price" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Prix de vente</label>
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
            <label className="font-headline-md text-headline-md text-primary uppercase block font-bold" htmlFor="description" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Description</label>
            <textarea className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none font-medium outline-none" id="description" placeholder="Décris ton article, dis ce qui le rend spécial, précise les défauts éventuels..." rows="6" style={{ fontFamily: '"Google Sans", sans-serif' }}></textarea>
          </section>
        </form>
      </main>

      {/* Sticky Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 p-4 px-container-margin z-50">
        <div className="max-w-3xl mx-auto flex justify-center">
          <button 
            onClick={handlePublish}
            className="w-full md:w-auto md:min-w-[400px] bg-primary text-white font-headline-md font-bold text-[16px] py-4 px-8 rounded-full uppercase tracking-wider hover:bg-black/80 transition-colors shadow-lg" 
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }} 
            type="button"
          >
            Publier l'annonce
          </button>
        </div>
      </div>
    </div>
  );
}
