import React from 'react';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  return (
    <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col font-body-sm bg-background text-on-background">
      {/* Top Banner & Profile Header */}
      <div className="relative w-full">
        <div className="h-32 md:h-48 bg-accent-orange w-full relative overflow-hidden">
        </div>
        <div className="px-container-margin relative mb-8 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-10">
          <div className="relative inline-block">
            <img className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background object-cover bg-surface-variant" alt="Profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMwgCBKeBi4VqjSu6tIPJ8U80yA_W16AqOQ2omB13pitrAbUhsfRR0Q4YeZmFtOIYhXYXIfT8GNV2JUUUmJ8vjAWjOYSG_CW1lUiCvOUOr19pl17wlc_5Pq3yPYPw9bQ-e0QF-KLSvKZ07uRiq1efLZCrNrfT2RwYy_Q9IHIpaBnvVU_pFAgFTMKGw9Fejh9cFm88PqEkN-izHuhMr1-J8ckaePIkRe5mmmDdT3KAQb2c1-hePg4GQ" />
            <Link to="/profile/settings" aria-label="Edit Profile" className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-2 border-2 border-background hover:bg-accent-orange transition-colors">
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </Link>
          </div>
          <div className="flex-1">
            <h1 className="text-[24px] md:text-[48px] text-primary font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Ibrahima N.</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="text-[14px] text-secondary flex items-center gap-1" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Dakar Plateau
              </span>
              <span className="text-[14px] text-secondary flex items-center gap-1" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                Membre depuis Janvier 2024
              </span>
              <span className="text-[14px] text-primary flex items-center gap-1 bg-accent-yellow px-2 py-1 rounded" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-[12px] font-bold text-primary" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif' }}>4.8</span>
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <Link to="/profile/settings" className="block w-full md:w-auto border-2 border-primary text-primary text-[14px] text-center py-2 px-6 rounded-full hover:bg-primary hover:text-on-primary transition-colors" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>
              Modifier mon profil
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Grid (Bento Style) */}
      <div className="px-container-margin mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-surface-variant rounded-lg p-6 flex flex-col items-center justify-center hover:bg-trust-grey transition-colors">
            <span className="text-[24px] text-primary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>42</span>
            <span className="text-[12px] font-bold text-secondary mt-1" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif' }}>Articles vendus</span>
          </div>
          <div className="bg-white border border-surface-variant rounded-lg p-6 flex flex-col items-center justify-center hover:bg-trust-grey transition-colors">
            <span className="text-[24px] text-primary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>95%</span>
            <span className="text-[12px] font-bold text-secondary mt-1" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif' }}>Taux de réponse</span>
          </div>
          <div className="bg-primary rounded-lg p-6 flex flex-col items-center justify-center shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
            <span className="text-[24px] text-accent-yellow" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>0 F</span>
            <span className="text-[12px] font-bold text-white mt-1" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif' }}>Solde</span>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="px-container-margin pb-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex gap-8 border-b border-surface-variant">
              <button className="pb-4 border-b-2 border-primary">
                <span className="text-[24px] text-primary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Selling</span>
              </button>
              <button className="pb-4 hover:text-primary transition-colors">
                <span className="text-[24px] text-secondary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Likes</span>
              </button>
              <button className="pb-4 hover:text-primary transition-colors">
                <span className="text-[24px] text-secondary" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>Saves</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
