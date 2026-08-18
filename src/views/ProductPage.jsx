"use client";
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../components/Providers';
import ProductCard from '../../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const { user, supabase, addToast } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
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

        // 3. Fetch Like Status if user logged in
        if (user) {
          const { data: favData } = await supabase
            .from('favorites')
            .select('*')
            .match({ user_id: user.id, listing_id: id })
            .single();
          if (favData) setIsLiked(true);
        }

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
  }, [id, supabase, user]);

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

  const handleLike = async (e) => {
    if (e) e.preventDefault();
    if (!user) {
      addToast("Connecte-toi pour ajouter aux favoris");
      return;
    }
    
    try {
      if (isLiked) {
        await supabase.from('favorites').delete().match({ user_id: user.id, listing_id: id });
        setIsLiked(false);
        addToast("Retiré des favoris");
      } else {
        await supabase.from('favorites').insert({ user_id: user.id, listing_id: id });
        setIsLiked(true);
        addToast("Ajouté aux favoris");
      }
    } catch (error) {
      console.error(error);
      addToast("Une erreur est survenue");
    }
  };

  const handleSelectProduct = (p) => {
    navigate.push(`/product/${p.id}`);
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
              {/* Overlays */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button 
                  onClick={handleLike}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:text-accent-rose hover:scale-110 transition-all drop-shadow-md"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0", color: isLiked ? 'var(--color-accent-rose)' : 'inherit' }}>favorite</span>
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
              <button 
                onClick={() => navigate.push(`/messages/${product.seller_id}`)}
                className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200"
                style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
              >
                Envoyer un message
              </button>
              <button className="w-full bg-white border border-primary text-primary font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                Faire une offre
              </button>
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
                      <span className="material-symbols-outlined filled text-accent-blue text-[18px]">verified</span>
                    </h3>
                    <p className="font-body text-xs text-secondary" style={{ fontFamily: '"Google Sans", sans-serif' }}>Membre depuis {new Date(seller?.created_at).getFullYear()}</p>
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
                <p className="text-secondary font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Ce vendeur n'a pas encore reçu d'avis.</p>
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
                  <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} onToggleLike={() => {}} />
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
                  <ProductCard key={p.id} product={p} onSelect={handleSelectProduct} onToggleLike={() => {}} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
