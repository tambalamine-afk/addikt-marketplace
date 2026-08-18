"use client";
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../components/Providers';

export default function Chat() {
  const navigate = useRouter();
  const { id } = useParams();
  const { user, supabase } = useContext(AppContext);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user || !id) return;
    
    async function loadChat() {
      setIsLoading(true);
      
      // 1. Fetch conversation details
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select(`
          id, 
          buyer_id, 
          seller_id,
          buyer:profiles!buyer_id(username, avatar_url),
          seller:profiles!seller_id(username, avatar_url),
          listing:listings(title, price, status, listing_images(url))
        `)
        .eq('id', id)
        .single();
        
      if (convError || !convData) {
        console.error("Conversation introuvable", convError);
        navigate.push('/messages');
        return;
      }
      
      setConversation(convData);
      
      // 2. Fetch messages
      const { data: msgData, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true });
        
      if (!msgError && msgData) {
        setMessages(msgData);
      }
      
      setIsLoading(false);
      
      // 3. Mark messages as read (Optional, skip for now to keep simple)
    }
    
    loadChat();

    // 4. Subscribe to Realtime for this conversation
    const channel = supabase
      .channel(`chat_${id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${id}`
      }, (payload) => {
        // Ajouter le message reçu à la liste s'il ne vient pas de nous
        // (S'il vient de nous, on l'ajoute déjà de façon optimiste à l'envoi)
        setMessages((currentMessages) => {
          // Éviter les doublons
          if (currentMessages.find(m => m.id === payload.new.id)) return currentMessages;
          return [...currentMessages, payload.new];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, user, supabase, navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user || !id) return;
    
    const textToSend = message.trim();
    setMessage(''); // Clear input optimistically
    
    // Create optimistic message
    const tempMessage = {
      id: `temp-${Date.now()}`,
      conversation_id: id,
      sender_id: user.id,
      content: textToSend,
      created_at: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, tempMessage]);
    
    // Send to Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: id,
        sender_id: user.id,
        content: textToSend
      })
      .select()
      .single();
      
    if (error) {
      console.error("Erreur envoi message:", error);
      // Ideally remove optimistic message on error, but for MVP it's fine
    } else {
      // Replace temp message with real one
      setMessages(prev => prev.map(m => m.id === tempMessage.id ? data : m));
    }
  };

  if (isLoading || !conversation) {
    return (
      <div className="bg-surface-container-lowest h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isBuyer = conversation.buyer_id === user?.id;
  const otherUser = isBuyer ? conversation.seller : conversation.buyer;
  const listingImages = conversation.listing.listing_images?.sort((a,b)=>a.position - b.position) || [];
  const productImage = listingImages.length > 0 ? listingImages[0].url : 'https://placehold.co/100x100/eaeaea/a0a0a0';
  const otherUserAvatar = otherUser?.avatar_url;
  const otherUserInitial = otherUser?.username ? otherUser.username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-sm h-[100dvh] flex flex-col overflow-hidden w-full selection:bg-accent-yellow selection:text-primary">
      {/* Header Chat */}
      <header className="flex-none bg-surface-container-lowest border-b border-outline-variant py-4 px-container-margin flex items-center justify-between z-20 shadow-sm max-w-[800px] w-full mx-auto">
        <button onClick={() => navigate.push('/messages')} aria-label="Retour" className="p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl overflow-hidden border border-outline-variant">
            {otherUserAvatar ? (
              <img alt="Avatar" className="w-full h-full object-cover" src={otherUserAvatar} />
            ) : (
              <span style={{ fontFamily: '"Monument Extended", sans-serif' }}>{otherUserInitial}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-button-text text-sm font-bold">@{otherUser?.username || 'Utilisateur'}</span>
            <span className="font-label-caps text-xs text-on-surface-variant flex items-center gap-1 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span> En ligne
            </span>
          </div>
        </div>
        
        <button aria-label="Options" className="p-2 -mr-2 rounded-full hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Pinned Product Fiche */}
      <div className="flex-none bg-trust-grey py-3 px-container-margin flex items-center justify-between border-b border-outline-variant z-10 shadow-sm max-w-[800px] w-full mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-surface-container-lowest overflow-hidden border border-outline-variant shrink-0">
            <img alt="Produit" className="w-full h-full object-cover" src={productImage} />
          </div>
          <div className="flex flex-col">
            <span className="font-nav-link font-semibold truncate max-w-[200px]">{conversation.listing.title}</span>
            <span className="font-headline-md text-[18px]" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>{conversation.listing.price} FCFA</span>
          </div>
        </div>
        <div className="bg-[#dcfce7] text-[#166534] font-label-caps text-xs px-2 py-1 rounded-sm uppercase tracking-wide border border-[#bbf7d0]">
          {conversation.listing.status === 'active' ? 'Disponible' : conversation.listing.status}
        </div>
      </div>

      {/* Message Thread */}
      <main className="flex-1 overflow-y-auto px-container-margin py-6 flex flex-col gap-4 bg-surface-container-lowest max-w-[800px] w-full mx-auto">
        {/* Date divider (Mocked for MVP) */}
        {messages.length > 0 && (
           <div className="flex justify-center mb-2">
             <span className="font-label-caps text-xs text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase">
               Début de la conversation
             </span>
           </div>
        )}
        
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 text-center">
            <span className="material-symbols-outlined text-4xl mb-2">waving_hand</span>
            <p>Envoyez le premier message !</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.sender_id === user?.id;
          const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div key={msg.id} className={`flex flex-col gap-1 max-w-[85%] ${isMe ? 'items-end self-end' : 'items-start'}`}>
              <div className={`px-4 py-3 shadow-sm relative group ${
                isMe 
                  ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm' 
                  : 'bg-surface-container-low text-on-surface rounded-2xl rounded-tl-sm border border-outline-variant'
              }`}>
                <p className="font-body-sm text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                <span className={`text-[10px] absolute -bottom-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isMe ? 'text-on-surface-variant right-1' : 'text-on-surface-variant left-1'
                }`}>
                  {time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <form onSubmit={handleSend} className="flex-none bg-surface-container-lowest border-t border-outline-variant px-container-margin py-4 flex flex-col gap-3 pb-safe max-w-[800px] w-full mx-auto">
        {/* Quick Action */}
        <div className="flex hidden"> {/* Masqué pour l'instant */}
          <button type="button" className="border-2 border-primary text-primary font-button-text px-4 py-1.5 rounded-full uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-2 text-[12px] font-bold">
            <span className="material-symbols-outlined text-[16px]">local_offer</span>
            Faire une offre
          </button>
        </div>
        
        {/* Text Input */}
        <div className="flex items-end gap-2">
          <button type="button" aria-label="Joindre un fichier" className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors shrink-0 mb-1">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          
          <div className="flex-1 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden min-h-[44px]">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4 font-body-sm text-on-surface placeholder:text-[#848484] max-h-32" 
              placeholder="Écrire un message..." 
              rows={1} 
              style={{ minHeight: '44px', outline: 'none' }}
            />
          </div>
          
          <button type="submit" disabled={!message.trim()} aria-label="Envoyer" className="w-11 h-11 bg-primary text-on-primary rounded-full hover:scale-95 transition-transform flex items-center justify-center shrink-0 mb-0.5 disabled:opacity-50 disabled:hover:scale-100">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
