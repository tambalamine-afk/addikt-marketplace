"use client";
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../components/Providers';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const { user, supabase, addToast, addToCart, likedItems, toggleFavorite } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const isLiked = likedItems?.includes(id);
  const [relatedSellerProducts, setRelatedSellerProducts] = useState([]);
  const [relatedCategoryProducts, setRelatedCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id || !supabase) return;

    async function fetchProduct() {
      setIsLoading(true);
      try {
        // 1. Fetch Product with images and category
        const { data: listingData, error: listingError } = await supabase
          .from('listings')
          .select(`
            *,
            categories(name, slug),
            listing_images(url, position)
          `)
          .eq('id', id)
          .single();

        if (listingError || !listingData) {
          setNotFound(true);
          return;
        }

        setProduct(listingData);

        // Extract Images
        const sortedImages = listingData.listing_images?.sort((a, b) => a.position - b.position).map(img => img.url) || [];
        setImages(sortedImages);
        if (sortedImages.length > 0) setMainImage(sortedImages[0]);

        // 2. Fetch Seller Profile
        const { data: sellerData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', listingData.seller_id)
          .single();
        
        if (sellerData) setSeller(sellerData);

        // 4. Fetch Related Seller Products (limit 5)
        const { data: sellerProducts } = await supabase
          .from('listings')
          .select(`*, listing_images(url, position)`)
          .eq('seller_id', listingData.seller_id)
          .eq('status', 'active')
          .neq('id', id)
          .limit(5);
        if (sellerProducts) setRelatedSellerProducts(formatListings(sellerProducts));

        // 5. Fetch Related Category Products (limit 5)
        if (listingData.category_id) {
          const { data: categoryProducts } = await supabase
            .from('listings')
            .select(`*, listing_images(url, position)`)
            .eq('category_id', listingData.category_id)
            .eq('status', 'active')
            .neq('id', id)
            .limit(5);
          if (categoryProducts) setRelatedCategoryProducts(formatListings(categoryProducts));
        }

      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id, supabase]);

  const handleDeleteListing = async () => {
    if (window.confirm("Es-tu sûr de vouloir supprimer cette annonce ? Cette action est irréversible.")) {
      try {
        const { error } = await supabase.from('listings').delete().eq('id', id);
        if (error) throw error;
        addToast("Annonce supprimée avec succès.");
        navigate.push('/profile');
      } catch (error) {
        addToast("Erreur lors de la suppression de l'annonce.");
        console.error("Error deleting listing:", error);
      }
    }
  };

  const formatListings = (data) => {
    return data.map(item => {
      const sortedImages = item.listing_images?.sort((a, b) => a.position - b.position) || [];
      const coverImage = sortedImages.length > 0 ? sortedImages[0].url : 'https://placehold.co/400x500/eaeaea/a0a0a0?text=Pas+d%27image';
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        size: item.size,
        brand: item.brand,
        image: coverImage,
        liked: false 
      };
    });
  };

  const handleLike = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleFavorite(id);
  };

  const handleSelectProduct = (p) => {
    navigate.push(`/product/${p.id}`);
  };

  const handleContactSeller = async () => {
    if (!user) {
      addToast("Connecte-toi pour contacter le vendeur");
      return;
    }
    
    if (user.id === product.seller_id) {
      addToast("Ceci est ta propre annonce !");
      return;
    }
    
    try {
      // 1. Check if conversation exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('listing_id', product.id)
        .eq('buyer_id', user.id)
        .maybeSingle();
        
      if (existingConv) {
        navigate.push(`/messages/${existingConv.id}`);
        return;
      }
      
      // 2. Create new conversation
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert({
          listing_id: product.id,
          buyer_id: user.id,
          seller_id: product.seller_id
        })
        .select('id')
        .single();
        
      if (error) throw error;
      navigate.push(`/messages/${newConv.id}`);
      
    } catch (err) {
      console.error(err);
      addToast("Erreur lors de la création de la conversation");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center min-h-[70vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center flex flex-col items-center">
        <span className="material-symbols-outlined text-[64px] text-gray-300 mb-4">search_off</span>
        <h2 className="text-2xl font-bold mb-4 font-headline" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Oups ! Produit introuvable</h2>
        <p className="text-on-surface-variant mb-6" style={{ fontFamily: '"Google Sans", sans-serif' }}>L'annonce que tu cherches n'existe plus ou a été retirée.</p>
        <Link href="/" className="bg-[#1b1b1b] text-white px-8 py-3 rounded-full font-bold">Retour à l'accueil</Link>
      </div>
    );
  }

  const categoryName = product.categories?.name || 'Vêtements';
  const categorySlug = product.categories?.slug || 'vetements';

  const getSellerInitial = () => {
    if (seller?.username) return seller.username.charAt(0).toUpperCase();
    if (seller?.full_name) return seller.full_name.charAt(0).toUpperCase();
    return "V";
  };

  return (
    <>
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 font-label text-sm text-secondary flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-primary transition-colors text-primary border-b-2 border-primary pb-0.5 capitalize">{categoryName}</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-outline truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </div>

        {/* Product Container */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Gallery (55%) */}
          <div className="w-full md:w-[55%] flex flex-col gap-4 relative">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-surface-container rounded-2xl overflow-hidden group border border-outline-variant/30">
              {mainImage ? (
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={product.title} 
                  src={mainImage} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">Pas d'image</div>
              )}
              {/* Image Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const currentIndex = images.indexOf(mainImage);
                      const prevIndex = (currentIndex - 1 + images.length) % images.length;
                      setMainImage(images[prevIndex]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors z-20 shadow-md"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const currentIndex = images.indexOf(mainImage);
                      const nextIndex = (currentIndex + 1) % images.length;
                      setMainImage(images[nextIndex]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors z-20 shadow-md"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </>
              )}
              {/* Overlays */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button 
                  onClick={handleLike}
                  className="p-2 flex items-center justify-center hover:scale-110 transition-all z-20"
                >
                  <span 
                    className="material-symbols-outlined text-[32px] drop-shadow-md" 
                    style={{ 
                      fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0", 
                      color: isLiked ? '#e20020' : 'white'
                    }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`}
                  >
                    <img className="w-full h-full object-cover" alt={`Thumb ${idx}`} src={img} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info (45%) */}
          <div className="w-full md:w-[45%] flex flex-col pt-2 lg:pt-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[20px] md:text-[24px] font-semibold leading-[1.1] tracking-tighter mb-4 text-primary uppercase font-body break-words" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
                {product.title}
              </h1>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-[28px] font-bold text-primary" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.price?.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <p className="font-body text-sm text-secondary" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                {product.size && `Taille ${product.size}`} {product.condition && `· ${product.condition}`}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              {user?.id !== product.seller_id ? (
                <>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200"
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    Ajouter au panier
                  </button>
                  <button 
                    onClick={handleContactSeller}
                    className="w-full bg-white border border-primary text-primary font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200"
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    Envoyer un message
                  </button>
                  <a 
                    href={seller?.phone ? `https://wa.me/${seller.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre article "${product.title}" à ${product.price?.toLocaleString('fr-FR')} FCFA sur Addikt. Est-il toujours disponible ?`)}` : `https://wa.me/?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre article "${product.title}" à ${product.price?.toLocaleString('fr-FR')} FCFA sur Addikt. Est-il toujours disponible ?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-[#20bd5a] transition-all duration-200"
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Contacter via WhatsApp
                  </a>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => navigate.push(`/edit/${product.id}`)}
                    className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200 text-center" 
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    Modifier l'annonce
                  </button>
                  <button 
                    onClick={handleDeleteListing}
                    className="w-full bg-white border border-primary text-primary font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200" 
                    style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
                  >
                    Supprimer l'annonce
                  </button>
                </div>
              )}
            </div>
            
            {/* Reassurance */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start mb-8 border border-outline-variant/30">
              <span className="material-symbols-outlined text-accent-blue mt-0.5">verified_user</span>
              <div>
                <p className="font-body text-sm text-on-surface-variant font-medium leading-snug mb-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vérifie toujours l'article en main propre avant de payer.</p>
              </div>
            </div>
            
            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <p className="font-body text-[16px] text-on-surface-variant leading-relaxed mb-4 whitespace-pre-line" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.brand && <span className="px-4 py-2 rounded-full border border-outline-variant text-[13px] text-on-surface-variant font-medium bg-white">{product.brand}</span>}
                  {product.color && <span className="px-4 py-2 rounded-full border border-outline-variant text-[13px] text-on-surface-variant font-medium bg-white">{product.color}</span>}
                </div>
              </div>
            )}
            
            <hr className="border-outline-variant/50 mb-8" />
            
            {/* Seller Block */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {seller?.avatar_url ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container border border-outline-variant">
                      <img className="w-full h-full object-cover" alt="Vendeur" src={seller.avatar_url} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xl">
                      {getSellerInitial()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-label text-lg text-primary flex items-center gap-1 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                      {seller?.username || 'Utilisateur'}
                      <span className="material-symbols-outlined filled text-black text-[18px]">verified</span>
                    </h3>
                    <p className="font-body text-xs text-black" style={{ fontFamily: '"Google Sans", sans-serif' }}>Membre depuis {new Date(seller?.created_at).getFullYear()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-headline text-lg font-bold">{seller?.rating_avg || '0.0'}</span>
                  <span className="material-symbols-outlined filled text-accent-yellow">star</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/seller/${product.seller_id}`} className="flex-1 bg-white border border-primary text-primary font-bold text-xs uppercase py-3 rounded-full hover:bg-surface-container-high transition-colors text-center block" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                  Voir la boutique
                </Link>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="mb-8">
              <h3 className="font-headline text-lg mb-4 text-primary font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Avis récents</h3>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 text-center">
                <p className="text-black font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Ce vendeur n'a pas encore reçu d'avis.</p>
              </div>
            </div>
            
            {/* Seller CTA */}
            <div className="bg-surface-container-low p-6 rounded-2xl text-center border border-dashed border-outline/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <p className="font-headline text-sm uppercase text-primary mb-3 relative z-10 font-bold">Toi aussi tu as un article comme celui-ci?</p>
              <Link className="font-label text-sm text-primary underline decoration-2 underline-offset-4 hover:text-black transition-colors relative z-10" href="/publish">Publier une annonce similaire</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Carousels Section */}
      <section className="bg-surface-container-low py-16 border-t border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          
          {/* More from seller */}
          {relatedSellerProducts.length > 0 && (
            <div className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Plus de ce vendeur</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedSellerProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} />
                ))}
              </div>
            </div>
          )}
          
          {/* You might also like */}
          {relatedCategoryProducts.length > 0 && (
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Tu pourrais aimer</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedCategoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
