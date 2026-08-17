"use client";
import React from 'react';

export default function AppPromoBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-8">
      <div className="flex flex-col md:flex-row bg-[#F8F2EC] rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full md:w-1/2 min-h-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1512413914483-e18e697855b7?w=800&q=80" 
            alt="Personnes utilisant l'application mobile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl text-primary font-headline-lg mb-6 leading-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
            L'appli Addikt dans ta poche
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">touch_app</span>
              <span className="text-on-surface-variant font-body">Gère tes annonces facilement où que tu sois</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">monetization_on</span>
              <span className="text-on-surface-variant font-body">Suis tes ventes et paiements en un clic</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">smartphone</span>
              <span className="text-on-surface-variant font-body">Réponds aux acheteurs instantanément</span>
            </li>
          </ul>
          <div className="flex gap-4">
            <a href="#" className="h-10 hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Télécharger dans l'App Store" className="h-full w-auto" />
            </a>
            <a href="#" className="h-10 hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Disponible sur Google Play" className="h-full w-auto" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
