"use client";
import React from 'react';

export default function BannerPromo() {
  return (
    <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ backgroundColor: '#2C2C2C', borderRadius: '16px', display: 'flex', overflow: 'hidden', height: '160px', position: 'relative' }}>
        
        <div style={{ padding: '32px', color: '#FFF', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Sacs à dos à moins de 15 000 FCFA</h2>
          <p style={{ fontSize: '14px', marginBottom: '16px' }}>Passez un cap avec un sac qui vous correspond.</p>
          <div>
            <button style={{ backgroundColor: '#FFF', color: '#000', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Shopper maintenant
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60%', display: 'flex', gap: '8px', padding: '16px' }}>
           <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" alt="Backpack 1" style={{ flex: 1, objectFit: 'cover', borderRadius: '12px', transform: 'rotate(5deg)' }} />
           <img src="https://images.unsplash.com/photo-1491849187382-7489ce4f35aa?w=300" alt="Backpack 2" style={{ flex: 1, objectFit: 'cover', borderRadius: '12px', transform: 'rotate(-2deg)' }} />
           <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300" alt="Backpack 3" style={{ flex: 1, objectFit: 'cover', borderRadius: '12px', transform: 'rotate(8deg)' }} />
        </div>
      </div>
    </section>
  );
}
