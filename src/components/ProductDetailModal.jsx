"use client";
import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, MapPin, Star, MessageSquare, Tag } from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleLike, 
  onOpenSeller,
  addToast
}) {
  const [activeImage, setActiveImage] = useState(product?.images?.[0] || '');
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showMessageDrawer, setShowMessageDrawer] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  if (!product) return null;

  const formattedPrice = product.price ? product.price.toLocaleString('fr-FR') + ' FCFA' : '0 FCFA';

  const handleMakeOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || isNaN(offerAmount)) return;
    addToast(`Offre de ${parseInt(offerAmount).toLocaleString('fr-FR')} FCFA envoyée à @${product.seller?.handle} ! 📩`);
    setShowOfferModal(false);
    setOfferAmount('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    addToast(`Message envoyé à @${product.seller?.handle} ! 💬`);
    setShowMessageDrawer(false);
    setChatMessage('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '0', overflow: 'hidden' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left Column: Gallery */}
          <div style={{ padding: '24px', backgroundColor: '#F9F9F9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '110%', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#EEEEEE' }}>
              <img 
                src={activeImage} 
                alt={product.title} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <button 
                className={`like-btn ${product.isLiked ? 'liked' : ''}`}
                style={{ top: '16px', right: '16px', bottom: 'auto' }}
                onClick={() => onToggleLike(product.id)}
              >
                <Heart size={20} fill={product.isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
                {product.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt={`Vue ${idx}`}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: activeImage === img ? '2px solid #000' : '2px solid transparent'
                    }}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Purchase */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Seller Bar */}
            <div 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '16px', borderBottom: '1px solid #EEE' }}
              onClick={() => onOpenSeller(product.seller)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={product.seller?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                  alt={product.seller?.handle} 
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>@{product.seller?.handle}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666' }}>
                    <MapPin size={12} />
                    <span>{product.seller?.location || 'Dakar'}</span>
                    <span>•</span>
                    <Star size={12} fill="#FFC107" color="#FFC107" />
                    <span>{product.seller?.rating || '5.0'}</span>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange)' }}>
                VOIR BOUTIQUE ➔
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '8px', lineHeight: '1.2' }}>{product.title}</h1>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--brand-orange)' }}>{formattedPrice}</div>
              {product.priceEur && <div style={{ fontSize: '13px', color: '#888' }}>environ €{product.priceEur} EUR</div>}
            </div>

            {/* Product Specs Pill grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', backgroundColor: '#F8F8F8', padding: '16px', borderRadius: '12px', fontSize: '13px' }}>
              <div><strong style={{ color: '#888' }}>Taille:</strong> {product.size}</div>
              <div><strong style={{ color: '#888' }}>Marque:</strong> {product.brand || 'Vintage'}</div>
              <div><strong style={{ color: '#888' }}>État:</strong> {product.condition}</div>
              <div><strong style={{ color: '#888' }}>Catégorie:</strong> {product.category}</div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6' }}>{product.description}</p>

            {/* Buyer Trust Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFF3E0', padding: '12px', borderRadius: '12px', color: '#E65100', fontSize: '12px', fontWeight: 600 }}>
              <ShieldCheck size={20} />
              <span>Achat sécurisé Addikt Guarantee. Remboursement si l'article ne correspond pas.</span>
            </div>

            {/* Actions Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
              <button 
                className="btn-primary-hero" 
                style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                <ShoppingBag size={18} />
                <span>ACHETER MAINTENANT</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button 
                  className="btn-secondary-hero" 
                  style={{ color: '#000', borderColor: '#000', textAlign: 'center' }}
                  onClick={() => setShowOfferModal(true)}
                >
                  Faire une offre
                </button>
                <button 
                  className="btn-secondary-hero" 
                  style={{ color: '#000', borderColor: '#000', textAlign: 'center' }}
                  onClick={() => setShowMessageDrawer(true)}
                >
                  Envoyer un msg
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Sub-Modal */}
        {showOfferModal && (
          <div className="modal-backdrop" style={{ zIndex: 1100 }} onClick={() => setShowOfferModal(false)}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', maxWidth: '400px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Faire une offre</h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Prix initial: {formattedPrice}</p>
              <form onSubmit={handleMakeOffer}>
                <input 
                  type="number" 
                  placeholder="Montant proposé (FCFA)" 
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CCC', marginBottom: '16px' }}
                  required
                />
                <button type="submit" className="btn-sell" style={{ width: '100%', justifyContent: 'center' }}>
                  ENVOYER L'OFFRE
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Message Sub-Modal */}
        {showMessageDrawer && (
          <div className="modal-backdrop" style={{ zIndex: 1100 }} onClick={() => setShowMessageDrawer(false)}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', maxWidth: '400px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Contacter @{product.seller?.handle}</h3>
              <form onSubmit={handleSendMessage}>
                <textarea 
                  rows="4" 
                  placeholder="Bonjour! L'article est-il toujours disponible ? Est-il possible d'organiser une remise en main propre à Dakar ?" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CCC', marginBottom: '16px', fontFamily: 'inherit' }}
                  required
                ></textarea>
                <button type="submit" className="btn-sell" style={{ width: '100%', justifyContent: 'center' }}>
                  ENVOYER
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
