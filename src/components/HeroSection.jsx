"use client";
import React, { useState } from 'react';

export default function HeroSection() {
  const [mode, setMode] = useState('acheter');

  return (
    <section className="bg-accent-orange w-full min-h-[500px] flex items-center justify-center relative overflow-hidden py-16 rounded-b-[40px] md:rounded-b-[80px] mx-auto max-w-[98%] mt-4">
      {/* Background Sparkles */}
      <svg className="absolute top-10 left-10 text-on-primary opacity-50 w-12 h-12" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z"></path>
      </svg>
      <svg className="absolute bottom-20 right-20 text-accent-yellow opacity-80 w-16 h-16" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z"></path>
      </svg>
      
      <div className="max-w-7xl mx-auto w-full px-container-margin grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col justify-center items-start pt-8 md:pt-0">
          <h1 className="text-headline-xl text-on-primary leading-[0.9] mb-8 font-headline-xl" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 900 }}>Trouve tes <br/><span className="text-accent-yellow">pépites</span></h1>
          
          <div className="relative bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-full p-1.5 flex items-center transition-colors duration-300 border border-white/20 w-56">
            <div 
              className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full transition-transform duration-300 ease-in-out shadow-sm"
              style={{ transform: mode === 'acheter' ? 'translateX(0)' : 'translateX(100%)' }}
            />
            <button 
              className={`relative z-10 w-1/2 font-button-text font-bold transition-colors duration-300 uppercase tracking-wide text-sm py-1 ${mode === 'acheter' ? 'text-primary' : 'text-white'}`}
              onClick={() => setMode('acheter')}
            >
              Acheter
            </button>
            <button 
              className={`relative z-10 w-1/2 font-button-text font-bold transition-colors duration-300 uppercase tracking-wide text-sm py-1 ${mode === 'vendre' ? 'text-primary' : 'text-white'}`}
              onClick={() => setMode('vendre')}
              style={{ fontFamily: '"Mona Sans Expanded", sans-serif', fontWeight: 700 }}
            >
              Vendre
            </button>
          </div>
        </div>
        
        <div className="relative h-[350px] flex justify-center items-center">
          <div className="absolute w-56 h-72 transform -rotate-[15deg] -translate-x-20 overflow-hidden" style={{ backgroundColor: 'rgb(249, 249, 249)', borderRadius: '22px' }}></div>
          <div className="absolute w-56 h-72 transform rotate-[5deg] z-10 translate-y-6 overflow-hidden" style={{ backgroundColor: 'rgb(255, 206, 84)', borderRadius: '22px' }}></div>
          <div className="absolute w-56 h-72 transform rotate-[15deg] translate-x-24 -translate-y-4 overflow-hidden z-20" style={{ backgroundColor: 'rgb(239, 71, 111)', borderRadius: '22px' }}>
            <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvEIXHuwB1OE5vnr6zarJbWV7ems_bSHAUEV68pEfgn3PpwMVkqI6XS-3BYRlLRjwWfK1DeY_cslS_q1d_JHPhZNzXFEL0xzHxYj1oYmOS6st78Dbl4TzuDmh55W22i4-QeoTYUilZgRVtiSVVkJ9-yPKAlYkuH_fyPeeQWDYfqUS8ym_95KaRedr8jZHpdYtlR6-y7kG6NEU4IsmPCcPtVtnQwO6IlH15c5YPucHVtp3iXy8c06Hy" alt="Hero img" />
          </div>
        </div>
      </div>
    </section>
  );
}
