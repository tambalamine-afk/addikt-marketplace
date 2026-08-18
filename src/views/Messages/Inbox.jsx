"use client";
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../components/Providers';

export default function Inbox() {
  const { user, supabase } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchConversations() {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id, 
          created_at, 
          buyer_id, 
          seller_id,
          buyer:profiles!buyer_id(username, avatar_url),
          seller:profiles!seller_id(username, avatar_url),
          listing:listings(title, listing_images(url)),
          messages(content, created_at, sender_id, read_at)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);
        
      if (error) {
        console.error("Error fetching conversations:", error);
      } else if (data) {
        const formatted = data.map(conv => {
          const isBuyer = conv.buyer_id === user.id;
          const otherUser = isBuyer ? conv.seller : conv.buyer;
          const sortedImages = conv.listing?.listing_images?.sort((a,b) => a.position - b.position) || [];
          
          const sortedMessages = (conv.messages || []).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
          const lastMessage = sortedMessages.length > 0 ? sortedMessages[0] : null;
          
          let lastMessageText = 'Nouvelle conversation';
          let time = new Date(conv.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          let sortDate = new Date(conv.created_at);
          let unread = false;
          
          if (lastMessage) {
            lastMessageText = lastMessage.content;
            sortDate = new Date(lastMessage.created_at);
            time = sortDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            if (lastMessage.sender_id !== user.id && !lastMessage.read_at) {
              unread = true;
            }
          }
          
          return {
            id: conv.id,
            name: otherUser?.username || 'Utilisateur',
            time,
            sortDate,
            lastMessage: lastMessageText,
            unread,
            online: false,
            avatarUrl: otherUser?.avatar_url || null,
            avatarInitial: otherUser?.username ? otherUser.username.charAt(0).toUpperCase() : 'U',
            productImage: sortedImages.length > 0 ? sortedImages[0].url : 'https://placehold.co/100x100/eaeaea/a0a0a0'
          };
        });
        
        // Sort by most recent activity
        formatted.sort((a, b) => b.sortDate - a.sortDate);
        setConversations(formatted);
      }
      setIsLoading(false);
    }
    
    fetchConversations();
  }, [user, supabase]);

  const filteredConversations = conversations.filter(conv => 
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
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredConversations.length > 0 ? (
        <div className="flex flex-col border-t border-outline-variant">
          {filteredConversations.map((conv) => (
            <Link key={conv.id} href={`/messages/${conv.id}`} className="group flex items-center p-4 border-b border-outline-variant hover:bg-surface-container-low transition-colors relative">
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
            <h3 className="font-headline-md text-2xl text-primary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Aucune conversation</h3>
            <p className="font-body-sm text-sm text-[#848484] max-w-sm">Dès que vous commencerez à discuter avec des acheteurs ou des vendeurs, vos conversations apparaîtront ici.</p>
            <Link href="/" className="mt-4 px-8 py-3 bg-primary text-on-primary rounded-full font-button-text text-sm uppercase tracking-widest hover:opacity-80 transition-colors">
              Explorer la boutique
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
