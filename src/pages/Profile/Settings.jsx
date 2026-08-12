import React from 'react';

export default function Settings() {
  return (
    <main className="pb-32 md:pb-12 pt-6 md:pt-12 px-container-margin max-w-3xl mx-auto flex-1 font-body-sm bg-background text-on-background">
      <h1 className="text-[32px] md:text-[48px] text-primary mb-12 uppercase tracking-tighter" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Paramètres</h1>
      <form className="space-y-12">
        {/* Profile Photo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary group cursor-pointer">
            <img alt="Photo de profil actuelle" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Kj16Pg16KFHOygVXnq3JYVbRVPnfnF6L_5qszOG-8llAjMQJiGoguZLEKc0p7_lorijoQCsYMUS-CjSc7tSu2CKNaIlTXMKNNJD_eiE_BviVjL8eHFgTCkUBC2xY5FsOmZGovVbFOZaq3DaswUY7Lgn_iuG5iG-8oxmvKEKk6lmRVHZlNd3NbJ6oErgPbtgPj7GermrnLp0J9cFm3PvFnE4QhdPOh9p0MPJASMIPFribonCXH5l1" />
            <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
            </div>
          </div>
          <button className="text-[14px] text-primary border-b-2 border-primary pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors uppercase tracking-widest" type="button" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>Modifier la photo</button>
        </div>
        
        {/* Basic Info Form */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="fullName" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>Nom complet</label>
            <input className="w-full bg-transparent border-0 border-b-2 border-primary rounded-none px-0 py-3 text-[18px] text-primary focus:ring-0 focus:border-accent-orange transition-colors placeholder:text-secondary-fixed-dim outline-none" id="fullName" type="text" defaultValue="Dakar Streetwear" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }} />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="phone" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>Numéro de téléphone</label>
            <div className="relative">
              <input className="w-full bg-transparent border-0 border-b-2 border-primary rounded-none px-0 py-3 pr-24 text-[18px] text-primary focus:ring-0 focus:border-accent-orange transition-colors outline-none" id="phone" type="tel" defaultValue="+221 77 123 45 67" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }} />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-trust-grey px-3 py-1 rounded-full border border-surface-variant">
                <span className="material-symbols-outlined text-accent-blue text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[12px] text-primary text-[10px]" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>Vérifié</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="quartier" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>Quartier</label>
            <select className="w-full bg-transparent border-0 border-b-2 border-primary rounded-none px-0 py-3 text-[18px] text-primary focus:ring-0 focus:border-accent-orange transition-colors appearance-none outline-none" id="quartier" defaultValue="medina" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              <option value="plateau">Plateau</option>
              <option value="medina">Médina</option>
              <option value="almadies">Almadies</option>
              <option value="ouakam">Ouakam</option>
              <option value="yoff">Yoff</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="bio" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>Bio</label>
            <textarea className="w-full bg-surface-container-low border-2 border-surface-variant rounded-lg p-4 text-[14px] text-primary focus:ring-0 focus:border-primary transition-colors resize-none placeholder:text-secondary-fixed-dim outline-none" id="bio" rows="4" defaultValue="Passionné de sneakers et de mode urbaine. Je vends principalement du M/L en excellent état." style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}></textarea>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="pt-8 border-t-4 border-primary">
          <h2 className="text-[24px] text-primary mb-6 uppercase tracking-tight" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Notifications</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-trust-grey p-4 rounded-lg">
              <span className="text-[16px] text-primary" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>Nouveaux messages</span>
              <input defaultChecked className="appearance-none w-12 h-6 bg-surface-variant rounded-full relative cursor-pointer outline-none transition-colors duration-300 checked:bg-accent-orange after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-primary after:rounded-full after:transition-transform after:duration-300 checked:after:translate-x-6 checked:after:bg-on-primary" type="checkbox" />
            </div>
            <div className="flex justify-between items-center bg-trust-grey p-4 rounded-lg">
              <span className="text-[16px] text-primary" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>Offres reçues</span>
              <input defaultChecked className="appearance-none w-12 h-6 bg-surface-variant rounded-full relative cursor-pointer outline-none transition-colors duration-300 checked:bg-accent-orange after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-primary after:rounded-full after:transition-transform after:duration-300 checked:after:translate-x-6 checked:after:bg-on-primary" type="checkbox" />
            </div>
            <div className="flex justify-between items-center bg-trust-grey p-4 rounded-lg">
              <span className="text-[16px] text-primary" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>Nouvelles annonces (Favoris)</span>
              <input className="appearance-none w-12 h-6 bg-surface-variant rounded-full relative cursor-pointer outline-none transition-colors duration-300 checked:bg-accent-orange after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-primary after:rounded-full after:transition-transform after:duration-300 checked:after:translate-x-6 checked:after:bg-on-primary" type="checkbox" />
            </div>
          </div>
        </div>
        
        {/* Confidentialité */}
        <div className="pt-8 border-t-4 border-primary">
          <h2 className="text-[24px] text-primary mb-6 uppercase tracking-tight" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Confidentialité</h2>
          <div className="flex justify-between items-center bg-surface-container-lowest border-2 border-surface-variant p-4 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[16px] text-primary" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>Afficher mon quartier précisément</span>
              <span className="text-[14px] text-secondary mt-1" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Aide les acheteurs à vous situer sur la carte.</span>
            </div>
            <input defaultChecked className="appearance-none w-12 h-6 bg-surface-variant rounded-full relative cursor-pointer outline-none transition-colors duration-300 checked:bg-accent-orange after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-primary after:rounded-full after:transition-transform after:duration-300 checked:after:translate-x-6 checked:after:bg-on-primary" type="checkbox" />
          </div>
        </div>
        
        {/* Actions */}
        <div className="pt-12 flex flex-col items-center gap-6">
          <div className="w-full">
            <button className="w-full md:w-auto md:min-w-[300px] bg-primary text-on-primary rounded-full py-4 px-8 text-[14px] uppercase tracking-widest hover:bg-accent-orange transition-colors" type="submit" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>
              Enregistrer les modifications
            </button>
          </div>
          <button className="text-[14px] text-outline hover:text-error underline transition-colors mb-20 md:mb-0" type="button" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Supprimer mon compte
          </button>
        </div>
      </form>
    </main>
  );
}
