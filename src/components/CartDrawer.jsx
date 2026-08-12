import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';

export default function CartDrawer({ cart, onClose, onRemoveFromCart, onClearCart, addToast }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('WAVE');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const shippingFee = cart.length > 0 ? 2000 : 0; // 2000 FCFA Dakar delivery
  const discountAmount = Math.round((subtotal * discount) / 100);
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ADDIKT10') {
      setDiscount(10);
      addToast('Code promo ADDIKT10 appliqué (-10%) ! 🎉');
    } else {
      addToast('Code promo invalide (Essaye ADDIKT10)');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSuccess(true);
    setTimeout(() => {
      onClearCart();
      addToast('Commande confirmée ! Tu recevras un SMS de livraison. 🚚');
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} />
            <h2 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase' }}>MON PANIER ({cart.length})</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Success screen */}
        {isSuccess ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
            <CheckCircle size={64} color="var(--brand-orange)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>COMMANDE VALIDÉE !</h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              Paiement via <strong>{paymentMethod}</strong> pris en compte. Ton livreur Addikt te contactera très rapidement.
            </p>
            <button className="btn-primary-hero" onClick={onClose}>
              CONTINUER MES ACHATS
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '60px' }}>
                  <ShoppingBag size={48} strokeWidth={1} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p style={{ fontWeight: 700 }}>Ton panier est vide pour l'instant</p>
                  <p style={{ fontSize: '13px' }}>Ajoute des pièces depuis le feed!</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px', borderRadius: '12px', backgroundColor: '#F9F9F9', border: '1px solid #EFEFEF' }}>
                    <img src={item.images?.[0]} alt={item.title} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Taille: {item.size} • @{item.seller?.handle}</div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--brand-orange)', marginTop: '4px' }}>
                        {item.price?.toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>
                    <button onClick={() => onRemoveFromCart(idx)} style={{ color: '#999', padding: '6px' }} title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid #EEE', backgroundColor: '#FAFAFA' }}>
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Code promo (ex: ADDIKT10)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CCC', fontSize: '13px' }}
                  />
                  <button type="submit" className="btn-secondary-hero" style={{ padding: '10px 16px', color: '#000', borderColor: '#000', fontSize: '12px' }}>
                    Appliquer
                  </button>
                </form>

                {/* Payment Selector */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    MODE DE PAIEMENT SÉNÉGAL 🇸🇳
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('WAVE')}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 800,
                        border: paymentMethod === 'WAVE' ? '2px solid #1DC5D8' : '1px solid #DDD',
                        backgroundColor: paymentMethod === 'WAVE' ? '#E0F7FA' : '#FFF'
                      }}
                    >
                      🌊 WAVE
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('ORANGE MONEY')}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 800,
                        border: paymentMethod === 'ORANGE MONEY' ? '2px solid #FF6600' : '1px solid #DDD',
                        backgroundColor: paymentMethod === 'ORANGE MONEY' ? '#FFF3E0' : '#FFF'
                      }}
                    >
                      🍊 OM
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('CARTE BANCAIRE')}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 800,
                        border: paymentMethod === 'CARTE BANCAIRE' ? '2px solid #000' : '1px solid #DDD',
                        backgroundColor: paymentMethod === 'CARTE BANCAIRE' ? '#F0F0F0' : '#FFF'
                      }}
                    >
                      💳 CARTE
                    </button>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', marginBottom: '16px', borderTop: '1px dashed #DDD', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                    <span>Sous-total:</span>
                    <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                    <span>Livraison Dakar express:</span>
                    <span>{shippingFee.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-orange)', fontWeight: 700 }}>
                      <span>Réduction ({discount}%):</span>
                      <span>-{discountAmount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, marginTop: '6px', color: '#000' }}>
                    <span>TOTAL:</span>
                    <span>{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                {/* Checkout button */}
                <button 
                  className="btn-primary-hero" 
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onClick={handleCheckout}
                >
                  <span>PASSER LA COMMANDE</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
