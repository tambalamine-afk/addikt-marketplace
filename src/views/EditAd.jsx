"use client";
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { AppContext } from '../components/Providers';
import { CheckCircle2, Trash2 } from 'lucide-react';

export default function EditAd() {
  const { id } = useParams();
  const { user, supabase, addToast } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [photos, setPhotos] = useState([]); // File objects for new photos
  const [existingPhotos, setExistingPhotos] = useState([]); // DB photos
  const [dbCategories, setDbCategories] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedListing, setPublishedListing] = useState(null);
  
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descRef = useRef(null);

  const navigate = useRouter();

  useEffect(() => {
    async function fetchData() {
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('*');
      if (catData) setDbCategories(catData);

      if (!id) return;

      // Fetch existing listing
      const { data: listingData, error } = await supabase
        .from('listings')
        .select(`*, categories(name, id), listing_images(id, url, position)`)
        .eq('id', id)
        .single();

      if (listingData && !error) {
        if (titleRef.current) titleRef.current.value = listingData.title || '';
        if (priceRef.current) priceRef.current.value = listingData.price || '';
        if (descRef.current) descRef.current.value = listingData.description || '';
        
        setSelectedBrand(listingData.brand || '');
        setSelectedSize(listingData.size || '');
        setSelectedCondition(listingData.condition || '');
        
        if (listingData.categories) {
          setSelectedCategory(listingData.categories.name);
        }

        const sortedImages = listingData.listing_images?.sort((a, b) => a.position - b.position) || [];
        setExistingPhotos(sortedImages);
      }
    }
    fetchData();
  }, [id, supabase]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    // Max 5 photos total (existing + new)
    const availableSlots = 5 - existingPhotos.length;
    setPhotos(prev => [...prev, ...newPhotos].slice(0, availableSlots));
  };

  const removeExistingPhoto = async (photoId) => {
    try {
      await supabase.from('listing_images').delete().eq('id', photoId);
      setExistingPhotos(prev => prev.filter(p => p.id !== photoId));
    } catch (err) {
      console.error(err);
      addToast("Erreur lors de la suppression de la photo");
    }
  };

  const removeNewPhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const categoriesData = {
    'Femmes': ['Hauts', 'Bas', 'Robes', 'Boubous & tenues trad', 'Vestes & manteaux', 'Chaussures', 'Sacs & accessoires', 'Bijoux', 'Vintage'],
    'Hommes': ['T-shirts & Polos', 'Pantalons', 'Sweats & Pulls', 'Vestes & Manteaux', 'Costumes', 'Chaussures', 'Accessoires', 'Sneakers', 'Vintage'],
    'Enfants': ['Bébé', 'Filles (2-14 ans)', 'Garçons (2-14 ans)', 'Chaussures', 'Jouets', 'Livres', 'Puériculture', 'Accessoires'],
    'Sneakers': ['Basses', 'Montantes', 'Running', 'Lifestyle', 'Vintage', 'Éditions limitées', 'Accessoires'],
    'Beauté': ['Maquillage', 'Soins visage', 'Soins corps', 'Parfums', 'Accessoires beauté']
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast("Tu dois être connecté pour modifier une annonce.");
      return;
    }
    
    const title = titleRef.current?.value;
    const price = priceRef.current?.value;
    const description = descRef.current?.value;

    if (!title || !price || !selectedCategory) {
      addToast("Remplis le titre, le prix et la catégorie !");
      return;
    }

    if (existingPhotos.length + photos.length === 0) {
      addToast("Il faut au moins 1 photo !");
      return;
    }

    setIsPublishing(true);

    try {
      const cat = dbCategories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase());
      const category_id = cat ? cat.id : null;

      // 1. Update listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .update({
          title,
          description,
          category_id,
          brand: selectedBrand || null,
          size: selectedSize || null,
          condition: selectedCondition || null,
          price: parseInt(price, 10),
        })
        .eq('id', id)
        .select()
        .single();

      if (listingError) throw listingError;

      // 2. Upload NEW photos
      const startingPosition = existingPhotos.length;
      for (let i = 0; i < photos.length; i++) {
        const { file } = photos[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/${startingPosition + i}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(fileName);

        await supabase
          .from('listing_images')
          .insert({
            listing_id: id,
            url: publicUrl,
            position: startingPosition + i
          });
      }

      setPublishedListing(listing);
    } catch (err) {
      console.error(err);
      addToast("Erreur lors de la modification : " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille unique'];
  if (selectedCategory === 'Enfants') {
    sizes = ['0-2 ans', '3-5 ans', '6-8 ans', '9-14 ans', 'Taille unique'];
  } else if (selectedCategory === 'Sneakers' || selectedSubcategory === 'Chaussures') {
    sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47+'];
  } else if (selectedCategory === 'Beauté') {
    sizes = []; 
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

  if (publishedListing) {
    return (
      <div className="antialiased flex flex-col min-h-screen bg-background text-on-background font-body-sm overflow-x-hidden">
        <main className="flex-1 w-full max-w-md mx-auto px-container-margin py-12 pb-40 flex flex-col items-center">
          <div className="animate-[scaleIn_0.5s_ease-out_forwards] mb-6">
            <CheckCircle2 size={80} className="text-[#25D366] mx-auto drop-shadow-md" />
          </div>
          <h1 className="text-[32px] text-primary text-center uppercase tracking-tight font-bold mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800 }}>
            Annonce modifiée !
          </h1>
          <div className="w-full flex flex-col gap-3 mt-10">
            <Link href={`/product/${publishedListing.id}`} className="w-full bg-[#1b1b1b] text-white font-bold py-3.5 rounded-full text-center text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Voir mon annonce
            </Link>
            <Link href="/" className="mt-6 text-center text-on-surface-variant text-[14px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Retour à l'accueil
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const totalPhotosCount = existingPhotos.length + photos.length;

  return (
    <div className="antialiased flex flex-col min-h-screen bg-background text-on-background font-body-sm overflow-x-hidden">
      <main className="flex-1 w-full max-w-3xl mx-auto px-container-margin py-12 pb-40">
        <div className="flex items-center justify-between mb-12">
          <Link href={`/product/${id}`} className="hidden md:block p-2 -ml-2 text-primary hover:bg-surface-container-low rounded-full transition-colors mr-4">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="text-[32px] text-primary flex-1 text-center uppercase tracking-tight font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 800 }}>Modifier l'annonce</h1>
        </div>
        
        <form className="space-y-12">
          {/* Upload Photos Section */}
          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[18px] md:text-[24px] text-primary uppercase" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Photos</h2>
            </div>
            <p className="text-[14px] text-on-surface-variant font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Gérez les photos de votre annonce.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
              />
              
              {/* Existing Photos */}
              {existingPhotos.map((photo, index) => (
                <div key={photo.id} className="aspect-square bg-surface-container rounded-2xl flex flex-col items-center justify-center relative group overflow-hidden border border-outline-variant">
                  <img src={photo.url} alt={`Existing ${index + 1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeExistingPhoto(photo.id)}
                    className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-error hover:bg-white"
                  >
                    <Trash2 size={16} />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm py-1 px-2 text-center">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">Couverture</span>
                    </div>
                  )}
                </div>
              ))}

              {/* New Photos */}
              {photos.map((photo, index) => (
                <div key={`new-${index}`} className="aspect-square bg-surface-container rounded-2xl flex flex-col items-center justify-center relative group overflow-hidden border border-dashed border-primary">
                  <img src={photo.preview} alt={`New ${index + 1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeNewPhoto(index)}
                    className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-error hover:bg-white"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-primary/20 backdrop-blur-sm py-1 px-2 text-center">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Nouvelle</span>
                  </div>
                </div>
              ))}

              {/* Add Button */}
              {totalPhotosCount < 5 && (
                <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-surface-container rounded-2xl flex items-center justify-center cursor-pointer hover:bg-surface-dim transition-colors group overflow-hidden border border-dashed border-outline-variant">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors mb-1">add_a_photo</span>
                </div>
              )}
            </div>
          </section>

          {/* Title Section */}
          <section className="space-y-4">
            <label className="font-headline-md text-headline-md text-primary uppercase block font-bold" htmlFor="title" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Titre de l'annonce</label>
            <input ref={titleRef} className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium outline-none" id="title" type="text" style={{ fontFamily: '"Google Sans", sans-serif' }} />
          </section>

          {/* Category Section */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary uppercase font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Département</h2>
            <div className="flex flex-wrap gap-3">
              {Object.keys(categoriesData).map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { 
                    if (selectedCategory === cat) return;
                    setSelectedCategory(cat); 
                    setSelectedSubcategory(''); 
                    setSelectedBrand('');
                    setSelectedSize(''); 
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
                      onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? '' : sub)}
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
                <input ref={priceRef} className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 pr-12 text-[20px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all font-bold outline-none" id="price" type="number" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-[20px] text-primary font-bold" style={{ fontFamily: '"Google Sans", sans-serif' }}>F</span>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="space-y-4">
            <label className="font-headline-md text-headline-md text-primary uppercase block font-bold" htmlFor="description" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 500 }}>Description</label>
            <textarea ref={descRef} className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none font-medium outline-none" id="description" rows="6" style={{ fontFamily: '"Google Sans", sans-serif' }}></textarea>
          </section>
        </form>
      </main>

      {/* Sticky Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 p-4 px-container-margin z-50">
        <div className="max-w-3xl mx-auto flex justify-center">
          <button 
            disabled={isPublishing}
            onClick={handleUpdate}
            className={`w-full md:w-auto md:min-w-[400px] text-white font-headline-md font-bold text-[16px] py-4 px-8 rounded-full uppercase tracking-wider transition-colors shadow-lg ${isPublishing ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-black/80'}`} 
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }} 
            type="button"
          >
            {isPublishing ? 'Mise à jour...' : "Sauvegarder"}
          </button>
        </div>
      </div>
    </div>
  );
}
