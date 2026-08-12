import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-sm h-screen flex flex-col overflow-hidden w-full selection:bg-accent-yellow selection:text-primary">
      {/* Header Chat */}
      <header className="flex-none bg-surface-container-lowest border-b border-outline-variant py-4 px-container-margin flex items-center justify-between sticky top-0 z-20 shadow-sm max-w-[800px] w-full mx-auto">
        <button onClick={() => navigate(-1)} aria-label="Retour" className="p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9iDWIWIwXFjJHt8LMOQOMi_SVS59y96L42ptkA51tYfjMZ33AbaXNGqRgQF-pk1hHdMGmUv6McdyDs0OtnR2rMBV7ffhdugSM8rhvzDTHf64xTBiVGghf3XaS3bq9s1mKQFLOFVB_fEDFaloB_WK5vbEPhCCAFTFIyoWQ5XBHsOSSTA0NW1A5nqFZXPdZZAOmZopLS3JQBx5j7MC3Ou7ajA0z2WdFxjLZ_HwfJHvgnH4pRwMPVTae" />
          </div>
          <div className="flex flex-col">
            <span className="font-button-text text-sm font-bold">@youssouf_d</span>
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
            <img alt="Produit" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDej3ZCPv6vapdGfrQ3057mOc0IcsTFiMYRQOtp_TTJ8YMZ_zQGGHEFOC3usfkyEA6U45yYfY4F3KID7j9vNUAAMzVlmHb8LuSUZXDJhsg04YuNwsC7yxYsvTeAJrYb_u6zIVyIDKDR45d0Ol_xtkx_Excg_lRhiU8HA-NAMWNoJrUkiEbHWUwAoMY4vhqWsCXNk5fnqcMEz3moW3snrsRB-c14FMoqNaMaIF3z237zxi3Z0VzUUbVV" />
          </div>
          <div className="flex flex-col">
            <span className="font-nav-link font-semibold truncate max-w-[200px]">Veste Vintage Nike 90s</span>
            <span className="font-headline-md text-[18px]" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>45 000 FCFA</span>
          </div>
        </div>
        <div className="bg-[#dcfce7] text-[#166534] font-label-caps text-xs px-2 py-1 rounded-sm uppercase tracking-wide border border-[#bbf7d0]">
          Disponible
        </div>
      </div>

      {/* Message Thread */}
      <main className="flex-1 overflow-y-auto px-container-margin py-6 flex flex-col gap-6 bg-surface-container-lowest max-w-[800px] w-full mx-auto">
        {/* Date divider */}
        <div className="flex justify-center">
          <span className="font-label-caps text-xs text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase">AUJOURD'HUI</span>
        </div>
        
        {/* Contact Message (Left) */}
        <div className="flex flex-col items-start gap-1 max-w-[85%]">
          <div className="bg-surface-container-low text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm border border-outline-variant shadow-sm relative group">
            <p className="font-body-sm text-sm leading-relaxed">Salut ! La veste est toujours dispo ? Je suis très intéressé.</p>
            <span className="text-[10px] text-on-surface-variant absolute -bottom-4 left-1 opacity-0 group-hover:opacity-100 transition-opacity">10:42</span>
          </div>
        </div>
        
        {/* User Message (Right) */}
        <div className="flex flex-col items-end gap-1 max-w-[85%] self-end">
          <div className="bg-primary text-on-primary px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm relative group">
            <p className="font-body-sm text-sm leading-relaxed">Yes bro, toujours là. Propre, pas de défaut majeur.</p>
            <span className="text-[10px] text-on-surface-variant absolute -bottom-4 right-1 opacity-0 group-hover:opacity-100 transition-opacity">10:45</span>
          </div>
        </div>
        
        {/* Contact Message (Left) */}
        <div className="flex flex-col items-start gap-1 max-w-[85%]">
          <div className="bg-surface-container-low text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm border border-outline-variant shadow-sm relative group">
            <p className="font-body-sm text-sm leading-relaxed">Tu ferais un prix si je viens la chercher ce soir aux Almadies ?</p>
            <span className="text-[10px] text-on-surface-variant absolute -bottom-4 left-1 opacity-0 group-hover:opacity-100 transition-opacity">10:48</span>
          </div>
        </div>
        
        {/* Offer Card (User Side) */}
        <div className="flex flex-col items-end gap-1 max-w-[85%] self-end mt-4">
          <div className="bg-surface-container-lowest border-2 border-accent-rose px-5 py-4 rounded-xl shadow-sm relative w-full sm:w-auto min-w-[250px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-accent-rose" style={{ fontVariationSettings: '"FILL" 1' }}>sell</span>
              <span className="font-label-caps text-xs text-accent-rose uppercase font-bold tracking-widest">Offre reçue</span>
            </div>
            <p className="font-headline-md text-[20px] mb-4" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>40 000 FCFA</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-on-primary font-button-text text-sm py-2 rounded-full hover:bg-surface-tint transition-colors text-center uppercase tracking-wide">
                Accepter
              </button>
              <button className="flex-1 bg-surface-container-low text-on-surface font-button-text text-sm py-2 rounded-full hover:bg-surface-variant transition-colors border border-outline-variant text-center uppercase tracking-wide">
                Refuser
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="flex-none bg-surface-container-lowest border-t border-outline-variant px-container-margin py-4 flex flex-col gap-3 pb-safe max-w-[800px] w-full mx-auto">
        {/* Quick Action */}
        <div className="flex">
          <button className="border-2 border-primary text-primary font-button-text px-4 py-1.5 rounded-full uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-2 text-[12px] font-bold">
            <span className="material-symbols-outlined text-[16px]">local_offer</span>
            Faire une offre
          </button>
        </div>
        
        {/* Text Input */}
        <div className="flex items-end gap-2">
          <button aria-label="Joindre un fichier" className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors shrink-0 mb-1">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          
          <div className="flex-1 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden min-h-[44px]">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4 font-body-sm text-on-surface placeholder:text-[#848484] max-h-32" 
              placeholder="Écrire un message..." 
              rows={1} 
              style={{ minHeight: '44px', outline: 'none' }}
            />
          </div>
          
          <button aria-label="Envoyer" className="w-11 h-11 bg-primary text-on-primary rounded-full hover:scale-95 transition-transform flex items-center justify-center shrink-0 mb-0.5">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
