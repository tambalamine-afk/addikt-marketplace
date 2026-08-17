"use client";
import Link from 'next/link';
import React from 'react';

export default function SellerProfile() {
  return (
    <main className="w-full bg-surface-container-lowest text-on-surface font-semibold font-body text-sm">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-accent-orange relative"></div>
      
      {/* Main Profile Container */}
      <div className="max-w-[1200px] mx-auto px-container-margin relative pb-section-gap">
        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-20 md:-mt-24 mb-8">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-container-lowest bg-surface-container overflow-hidden z-10 shadow-lg">
            <img className="w-full h-full object-cover" alt="Seller profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDDYyt4UtJ5itLW3SiYfE8Ori9qIPUywC-jEhST1JpZ52wREV-yRGj_xXzmsTAdMADNEyK2-hvAOPWpwnEMgCLkDj9m6NnbdAuyzm5r3rDZJIfr2TZLd3806TNl20pxJWN0LtxPHG_T947pSIUb51zvZeX27e8T4f2RyKxY1tngwTfmNayf3a-mbumg9KhJ158GBLBchP5-pbjgJ77tzMgzBYrh14tynWWAg5HKMxxct-GxWSorP_" />
          </div>
          
          {/* Name & Badge */}
          <div className="mt-4 flex items-center gap-2">
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight font-display">DAKARVIBES</h1>
            <span className="material-symbols-outlined text-accent-blue text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-2 text-secondary text-[14px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span> Almadies, Dakar
            </span>
            <span>•</span>
            <span>Membre depuis Juin 2023</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-3 bg-surface-container-low px-4 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-accent-yellow text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-bold text-on-surface">4.9</span>
            <span className="text-secondary">(156 avis)</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center items-center gap-4 md:gap-12 mb-8 border-outline-variant py-6">
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">1.2K</div>
            <div className="text-sm text-secondary mt-1 font-body">Abonnés</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">84</div>
            <div className="text-sm text-secondary mt-1 font-body">Articles vendus</div>
          </div>
          <div className="text-center">
            <div className="text-headline-md text-on-surface font-display">98%</div>
            <div className="text-sm text-secondary mt-1 font-body">de réponses</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button className="px-8 py-3 rounded-full border border-primary text-primary text-sm hover:bg-surface-container transition-colors duration-200 min-w-[140px] font-bold font-label-caps uppercase">
            Suivre
          </button>
          <Link href="/messages/vendeur" className="px-8 py-3 rounded-full bg-primary text-on-primary text-sm hover:opacity-90 transition-opacity duration-200 min-w-[140px] font-bold font-label-caps uppercase flex items-center justify-center">
            Message
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-8 mb-8 border-b border-outline-variant">
          <button className="pb-3 text-primary text-sm tracking-wider border-b-2 border-primary uppercase font-display font-bold">
            EN VENTE
          </button>
          <button className="pb-3 text-secondary hover:text-primary transition-colors duration-200 text-sm tracking-wider uppercase font-display font-bold">
            VENDU
          </button>
        </div>

        {/* Content Grid ("En vente") */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gutter">
          {[
            { title: "T-Shirt Vintage Oversize", price: "15 000 FCFA", size: "M", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-OTDiTQydGENAUTH8brstXN7C-mlr1e5K5CKaPI20E-HNsa6_YpLJQU_w50HDm7jLMWv3dqaSDiT6gISoK1w0KtNVTXXEURd9NBYEIfhKcnQbZeEe_mTgqxULZZXHrUXVJPt2qg5nP37v0Dz9ilG2LCsnC0zNnDY9WxYf_iCmGCOIcKMHPaL1DIeQJ06C6uHyMbt7KI3cf_9L30GZUhl8bv0JomZ-R1EhYjMFHBOKSteEtl3ZcW64" },
            { title: "Cargo Pants Y2K", price: "22 000 FCFA", size: "L", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPArCBcb6xiSi2KWU2OVNnitm9Ew-UpTy0gMh3eWPcF719SwvhJC0LEfJOIBeaw7ktjtMcp0Pi5vyqcWeHeJKP75zNtVeLEUINMOTsGeu4Oof9uNKE2zKS8ii_ZTGJCPuWv0Q4-eH8ZGb2OSsy61-1E8YcExL_OwfOoGv6KhaSWKbTKKCCFfntcYmIp3V9971zU_esBpiIIZjBJrmuWtF_MJyagve6XbgLbRYACJzUfhXzReQ7KZD" },
            { title: "Sneakers Retro 90s", price: "35 000 FCFA", size: "42", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOY-xslynltgfu1qq_nUMrzwFaAlw4Y6yj_DXtrd7XBGPZCzlyCDW1EG64BrvMBv31n0TKOSR43OoBJWFVsStRLgOvkcGt_qFgosHa74NVORyR7hPFOq2WFVvIzRgWz-e6cLCmIMAYIbBAstbRvBGHnXWAwVubUDohnv14J7IO8oGIkjsc6OlJW6wCcN9GdNQB9bEMVPfXKZsD8xDrfTUeuGy_hwGukv2Btp5fpeOs0DFFmFYgmIBn" },
            { title: "Beanie Orange Fluo", price: "5 000 FCFA", size: "TU", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyO-kN_m73p3pqqhCbnRdmxNe9FtQeDDquiaAzsTzlzoiejxxA8D1l_-au8Y4pqOihWXWIGkMPUkmWMCDL0acGida0kHeMsCeR_ZR1ugeGaqMhLtvPCwPVhTHNiQXLjckfGXwo58IVUirP5fSRw-0l0fWCEyL5lSx2LjRSmDlp4coyJoOdRG6kuooGsPLPlg0YhOFWAlB1e5l9JTTbQ6AspAXH1dDHZglq2EuwbppxNfl5ZfeBVwzW" }
          ].map((item, idx) => (
            <Link key={idx} href={`/product/${idx + 20}`} className="group relative flex flex-col cursor-pointer">
              <div className="relative aspect-[3/4] bg-surface-container rounded-lg overflow-hidden mb-3">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.img} />
                <button 
                  onClick={(e) => { e.preventDefault(); }}
                  className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-sm p-1.5 rounded-full text-secondary hover:text-accent-rose transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-[15px] text-[#111] leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.title}</span>
                <span className="text-[14px] text-[#555] leading-tight mt-[1px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.size}</span>
                <span className="text-[16px] text-black font-bold leading-tight mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.price}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More button */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-2 rounded-full border border-outline text-secondary hover:border-primary hover:text-primary transition-colors text-sm uppercase tracking-wide">Voir plus</button>
        </div>

        <section className="mt-16">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-headline-md uppercase font-display font-bold">Avis</h2>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-accent-yellow text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold font-body">4.9</span>
              <span className="text-secondary text-sm font-body">(156 avis)</span>
            </div>
          </div>
          <div className="space-y-8">
            {/* Example Review */}
            <div className="border-b border-outline-variant pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
                  <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDDYyt4UtJ5itLW3SiYfE8Ori9qIPUywC-jEhST1JpZ52wREV-yRGj_xXzmsTAdMADNEyK2-hvAOPWpwnEMgCLkDj9m6NnbdAuyzm5r3rDZJIfr2TZLd3806TNl20pxJWN0LtxPHG_T947pSIUb51zvZeX27e8T4f2RyKxY1tngwTfmNayf3a-mbumg9KhJ158GBLBchP5-pbjgJ77tzMgzBYrh14tynWWAg5HKMxxct-GxWSorP_" />
                </div>
                <div>
                  <p className="font-bold text-sm">Moussa D.</p>
                  <div className="flex text-accent-yellow">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs text-secondary">Il y a 2 jours</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
