import React from 'react';
import { X, Heart, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { FIT_CHECK_POSTS } from '../data/mockData';

export default function FitCheckModal({ onClose, onSelectProduct, addToast }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', padding: '32px' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ backgroundColor: 'var(--brand-orange)', color: 'white', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>
            COMMUNAUTÉ
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase' }}>FIT CHECK FEED 🔥</h2>
        </div>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '28px' }}>
          Découvre les meilleurs outfits droppés par les créateurs et utilisateurs d'Addikt. Clique sur une pièce taguée pour l'acheter directement !
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {FIT_CHECK_POSTS.map((post) => (
            <div key={post.id} style={{ backgroundColor: '#F8F8F8', borderRadius: '20px', overflow: 'hidden', border: '1px solid #EEE' }}>
              {/* User Bar */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={post.avatar} alt={post.user} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontWeight: 800, fontSize: '14px' }}>{post.user}</span>
                </div>
                <button 
                  onClick={() => addToast(`Fit favorisé! ❤️`)} 
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700 }}
                >
                  <Heart size={16} fill="var(--brand-magenta)" color="var(--brand-magenta)" />
                  <span>{post.likes}</span>
                </button>
              </div>

              {/* Fit Image */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '120%', backgroundColor: '#E0E0E0' }}>
                <img 
                  src={post.image} 
                  alt={post.caption} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Caption & Tagged Item Pill */}
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '13px', color: '#333', marginBottom: '14px', fontWeight: 500 }}>{post.caption}</p>

                {/* Tagged Product Box */}
                {post.taggedProduct && (
                  <div 
                    onClick={() => {
                      onClose();
                      onSelectProduct(post.taggedProduct);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      border: '1px solid #E0E0E0',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <img src={post.taggedProduct.image} alt={post.taggedProduct.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={10} /> PIÈCE TAGUÉE
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {post.taggedProduct.title}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800 }}>
                        {post.taggedProduct.price?.toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>
                    <ShoppingBag size={18} color="var(--brand-orange)" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
