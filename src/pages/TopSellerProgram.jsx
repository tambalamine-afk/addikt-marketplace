import React from 'react';
import { Link } from 'react-router-dom';

export default function TopSellerProgram() {
  return (
    <main className="w-full bg-white">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 15s linear infinite;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-[#e20020] to-[#ff4d00] min-h-[500px] flex items-center justify-center relative overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-container-margin w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold uppercase tracking-wider text-sm" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>ADDIKT</span>
              <span className="border border-white/40 px-2 py-0.5 rounded text-xs font-bold bg-white/10">Top Vendeur ✦</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', letterSpacing: '-0.02em' }}>
              Le Programme Top Vendeur Addikt
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Le programme Top Vendeur Addikt est une offre unique pour nos meilleurs vendeurs, récompensant leur travail acharné et leur dévouement avec des avantages exclusifs.
            </p>
            <Link to="/publish" className="bg-white text-black font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform inline-block" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Vendre maintenant
            </Link>
          </div>
          <div className="relative h-[400px] hidden md:block">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" className="absolute right-[20%] top-[10%] w-[200px] h-[250px] object-cover rounded-2xl shadow-xl transform rotate-[-5deg] z-20" alt="Fashion 1" />
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600" className="absolute right-[5%] top-[5%] w-[180px] h-[220px] object-cover rounded-2xl shadow-lg transform rotate-[10deg] z-10" alt="Fashion 2" />
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" className="absolute right-[15%] bottom-[5%] w-[220px] h-[180px] object-cover rounded-2xl shadow-xl transform rotate-[5deg] z-30" alt="Fashion 3" />
          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-container-margin grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center md:justify-end">
          {/* Rotating Badge */}
          <div className="relative w-64 h-64 animate-[spin_20s_linear_infinite]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#e20020] drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M100,0 l12.4,24.1 l26.9,-2.8 l4.2,26.7 l24.1,12.4 l-9.5,25.3 l18.3,20 l-18.3,20 l9.5,25.3 l-24.1,12.4 l-4.2,26.7 l-26.9,-2.8 l-12.4,24.1 l-12.4,-24.1 l-26.9,2.8 l-4.2,-26.7 l-24.1,-12.4 l9.5,-25.3 l-18.3,-20 l18.3,-20 l-9.5,-25.3 l24.1,-12.4 l4.2,-26.7 l26.9,2.8 Z" />
              <path id="curve" fill="transparent" d="M30,100 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
              <text className="fill-white font-bold text-[22px] uppercase tracking-widest" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                <textPath href="#curve" startOffset="50%" textAnchor="middle">Top Vendeur • Addikt •</textPath>
              </text>
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Quels sont les avantages des Top Vendeurs sur Addikt ?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-accent-orange mt-1">verified</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Badge vérifié</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Vérification officielle montrant que vous êtes l'un des meilleurs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-accent-orange mt-1">payments</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Paiements plus rapides</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Soyez payé dès que vous vendez, sans attendre la livraison.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-accent-orange mt-1">visibility</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Plus de visibilité</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Opportunités exclusives d'être mis en avant sur Addikt et au-delà.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-accent-orange mt-1">support_agent</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Support prioritaire</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Notre équipe dédiée est toujours là pour vous aider.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-accent-orange mt-1">forum</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Accès au Forum Top Vendeur</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Connectez-vous et apprenez des autres Top Vendeurs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REQUIREMENTS SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-container-margin grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Comment devenir Top Vendeur ?</h2>
          <p className="text-sm text-on-surface-variant mb-8" style={{ fontFamily: '"Google Sans", sans-serif' }}>Pour devenir Top Vendeur, vous devez atteindre les objectifs suivants pendant 3 mois consécutifs :</p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface mt-1 text-[20px]">sell</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Ventes</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>650 000 FCFA de ventes mensuelles ou 1 300 000 FCFA au total.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface mt-1 text-[20px]">star</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Avis</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Maintenir une moyenne de 4.5 étoiles sur l'ensemble de vos avis.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface mt-1 text-[20px]">gavel</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Problèmes de commande</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Garder les litiges acheteurs en dessous de 3% des ventes totales.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface mt-1 text-[20px]">inventory_2</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Annonces</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Publier au moins 50 nouveaux articles par mois.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface mt-1 text-[20px]">gpp_good</span>
              <div>
                <h3 className="font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Conditions d'utilisation</h3>
                <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>Respecter strictement les conditions d'utilisation d'Addikt.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img src="https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800" className="w-full h-auto rounded-3xl shadow-xl" alt="Seller requirements" />
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-container-margin">
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Ce que nos Top Vendeurs disent du programme</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f9f9f9] border border-outline-variant/30 p-8 rounded-3xl">
            <h3 className="font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>@vintage_dakar</h3>
            <p className="text-sm text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif', lineHeight: '1.6' }}>
              Devenir un Top Vendeur Addikt était un de mes plus grands objectifs ! C'est un programme incroyable et une belle opportunité de développer ma boutique tout en gardant une plus grande part de mes revenus. La communauté est d'un grand soutien, et pouvoir transformer ma passion en un travail à temps plein a été un rêve devenu réalité.
            </p>
          </div>
          <div className="bg-[#f9f9f9] border border-outline-variant/30 p-8 rounded-3xl">
            <h3 className="font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>@style_sn</h3>
            <p className="text-sm text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif', lineHeight: '1.6' }}>
              Faire partie du programme Top Vendeur m'a donné accès à une communauté fantastique de passionnés de mode, ainsi qu'à des conseils importants pour booster ma boutique et augmenter ma visibilité, ce qui m'aide à prospérer tout en travaillant de chez moi.
            </p>
          </div>
          <div className="bg-[#f9f9f9] border border-outline-variant/30 p-8 rounded-3xl">
            <h3 className="font-bold mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>@sneakers_addict</h3>
            <p className="text-sm text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif', lineHeight: '1.6' }}>
              Le programme Top Vendeur a apporté plus qu'un simple badge vérifié - il m'a donné une feuille de route. Voir mon travail acharné récompensé en maintenant mon statut de Top Vendeur depuis des années est ce qui me motive à continuer de grandir et de m'améliorer.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MARQUEE BANNER */}
      <section className="w-full bg-[#e20020] overflow-hidden py-4 border-b border-t border-black/10">
        <div className="flex w-[200%] animate-custom-marquee">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 whitespace-nowrap">
              <span className="text-white font-bold text-lg uppercase tracking-wider" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Addikt Top Vendeur</span>
              <span className="text-white ml-8 opacity-50">✦</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
