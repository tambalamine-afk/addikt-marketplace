import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: 'Aminata D.',
    time: '14:32',
    lastMessage: 'Dispo ce soir pour la remise en main propre ?',
    unread: true,
    online: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9fv8I1n-4_fRzqCiOFadnpJRGbulRM4dLAEkEEwK_If-eS1LEyJIAK4MqqAeY7kFRPDMFxbEom2KzstSRcozxYVVZRP5fj6KYU6XTpdzaP3BPiYEIvqsJ6_pqKMy_Ml2AVoPl9g3MJPlkSnXdY8WaSUBcVv8cGsuNpBxgZ0kcPHjmK2HWf9waHYo7IxesMOSAl-5wnXvj0TsE5sUGFOV_D2h3YPVF_pojnzRT16aCigQ2tm1YUphg',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJP0WYvYHbjjy9GZ_jB8LCmJb8U6OQRY65sIy61EH5kAk-WpxAj57Ah4EblCPkUerumutoimgIvmP7_gaIqGmxSNWAjXM3SskwG3wxQdfcgCasHaI79gvE4JC-lvAUEkbPBgpUKMwTchV5WlqGiuux8UwyihOT9tNX-lBf0pcOK2TwzTi5AmY45THXBZjdrKB7CtCLkioQ8ghdoo3Fxd_I8oIdXi45N50cWzjXVGduhUv6pL0Ptzx2'
  },
  {
    id: 2,
    name: 'SneakerHead_221',
    time: 'Hier',
    lastMessage: 'C\'est parfait, je te confirme ça demain.',
    unread: false,
    online: false,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC64mWMYRwQxWJulZKPappUn5EjYkAFzuJ0bERGFD9waoIz-QOJCWP-a-C1qXJuYs6ZOkPJpIVCmahtBmbmY0ce_D-wdrT1p8leHC8wVy62Q66r5iT5UYFy4azTJYOF5frfE6RfNsOe0Vk0tvFnxX7o_t_62FD38jWA_YhSI9IETiNuBbzS7V5DEKASkkfmaJkizccQ0RZAOwbYTBnM3Oq5cQblXUFSEPeHmR0sjM4bjXKWA1jQJx9X',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsurcIpbcG5_ubyJ7GyO7wI0t593S9zDi6ia0xu-IN3_YUKUl_l-i5alGLOW5iYLINjhnJ1tI2kW93fHe1eCoOQPPMsPuKAl9KlgJuToNQT7gZJRIrFvfur7Al4cZtTiZOcI-Y8id1Oj4VUcJgZwbytFfP2Rhf1xWB8i29a1weWZ8Q8-g2EEaGeSkAymvc73VVdGG2PklqGFK0mngnrYqTkuGYnsJOQi8SPN-6CS8OAcIOCFIsCdVJ'
  },
  {
    id: 3,
    name: 'VintageDakar',
    time: 'Lun.',
    lastMessage: 'Merci pour l\'achat ! Le colis part aujourd\'hui.',
    unread: false,
    online: true,
    avatarUrl: null,
    avatarInitial: 'V',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcCRrAbZDHH67Qm00jTYTNmH8Zm6J1HY_Cf5sWDUVR2Qzb1BLEMy-9U0NpLZe_DYNIkViUufgJBk_PFOK21yRcJqygrdubN4GY7d_Y92hsL5dxJY8GlukS9mtASQIkC4WI_mnrvmL4hYgpL1Kz3CKXwJU5thOLVR-RZfbCJ_lrEZ4A5mC7wZ9r_NftLvudnys4IZmdIxupRq1lfTPfFfBKUuQ5YPSXXSkNkzhRjyC4omgfhsLx-wH6'
  }
];

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-grow w-full max-w-[800px] mx-auto px-container-margin py-12 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl text-primary tracking-tight" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>
          Messages
        </h1>
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">search</span>
          </div>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-[#848484] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
            placeholder="Rechercher..." 
            type="text" 
          />
        </div>
      </div>
      
      {/* Conversation List */}
      {filteredConversations.length > 0 ? (
        <div className="flex flex-col border-t border-outline-variant">
          {filteredConversations.map((conv) => (
            <Link key={conv.id} to={`/messages/${conv.id}`} className="group flex items-center p-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors relative">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {conv.avatarUrl ? (
                  <img alt={conv.name} className="w-14 h-14 rounded-full object-cover border-2 border-surface-container-lowest" src={conv.avatarUrl} />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-xl border-2 border-surface-container-lowest" style={{ fontFamily: '"Monument Extended", sans-serif' }}>
                    {conv.avatarInitial}
                  </div>
                )}
                {/* Online indicator */}
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent-yellow border-2 border-surface-container-lowest rounded-full"></span>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-grow ml-4 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h2 className="font-label-caps text-xs font-bold text-primary truncate uppercase tracking-wider">{conv.name}</h2>
                  <span className={`text-xs ml-2 flex-shrink-0 ${conv.unread ? 'text-primary font-bold' : 'text-[#848484]'}`}>{conv.time}</span>
                </div>
                <p className={`font-body-sm text-sm truncate ${conv.unread ? 'text-primary font-bold' : 'text-[#848484]'}`}>{conv.lastMessage}</p>
              </div>
              
              {/* Trailing / Product */}
              <div className="flex items-center ml-4 gap-3 flex-shrink-0">
                {/* Unread Badge */}
                <div className={`w-3 h-3 rounded-full ${conv.unread ? 'bg-accent-rose' : 'opacity-0'}`}></div>
                {/* Product Thumbnail */}
                <img alt="Product" className="w-12 h-12 rounded bg-surface-container object-cover border border-outline-variant" src={conv.productImage} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: '"FILL" 0' }}>chat_bubble_outline</span>
            <h3 className="font-headline-md text-2xl text-primary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Aucun message</h3>
            <p className="font-body-sm text-sm text-[#848484] max-w-sm">Dès que vous commencerez à discuter avec des acheteurs ou des vendeurs, vos conversations apparaîtront ici.</p>
            <Link to="/" className="mt-4 px-8 py-3 bg-primary text-on-primary rounded-full font-button-text text-sm uppercase tracking-widest hover:opacity-80 transition-colors">
              Explorer la boutique
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
