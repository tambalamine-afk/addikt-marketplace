"use client";
import React from 'react';

export default function AppPromoBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-8">
      <div className="flex flex-col md:flex-row bg-[#F8F2EC] rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full md:w-1/2 min-h-[300px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- visuel de maquette externe, gardé pour l'instant */}
          <img
            src="https://images.unsplash.com/photo-1512413914483-e18e697855b7?w=800&q=80"
            alt="Personnes utilisant un téléphone"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl text-primary font-headline-lg mb-6 leading-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
            L'appli Addikt arrive bientôt
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">touch_app</span>
              <span className="text-on-surface-variant font-body">Gère tes annonces où que tu sois</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
              <span className="text-on-surface-variant font-body">Suis tes ventes et tes commandes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">smartphone</span>
              <span className="text-on-surface-variant font-body">Réponds aux acheteurs instantanément</span>
            </li>
          </ul>
          <span className="self-start inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            Bientôt sur iOS et Android
          </span>
        </div>
      </div>
    </section>
  );
}
