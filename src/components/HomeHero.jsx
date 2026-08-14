import React, { useState } from 'react';
import { ShieldCheck, Tags, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeHero({ onShopNow }) {
  const [activeTab, setActiveTab] = useState('Buy');
  const navigate = useNavigate();

  return (
    <section className="bg-accent-orange w-full min-h-[500px] flex items-center justify-center relative overflow-hidden py-16 mx-auto max-w-[98%] mt-4 rounded-[40px]">
      <div className="max-w-7xl mx-auto w-full px-container-margin grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Side: Copy and CTAs */}
        <div className="flex flex-col justify-center items-start pt-8 md:pt-0">
          <h1 className="text-headline-xl text-on-primary leading-[0.9] mb-8 font-display">
            Trouve tes <br />
            <span className="text-accent-yellow">pépites</span>
          </h1>

          {/* Buy / Sell Slider */}
          <div className="relative bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-full p-1.5 flex items-center transition-colors duration-300 border border-white/20 w-56">
            <div 
              className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full transition-transform duration-300 ease-in-out shadow-sm"
              style={{ transform: activeTab === 'Buy' ? 'translateX(0px)' : 'translateX(100%)' }}
            ></div>
            <button 
              onClick={() => setActiveTab('Buy')}
              className={`relative z-10 w-1/2 font-label-caps font-bold transition-colors duration-300 uppercase tracking-wide text-sm py-1 ${activeTab === 'Buy' ? 'text-primary' : 'text-white'}`}
            >
              Acheter
            </button>
            <button 
              onClick={() => {
                setActiveTab('Sell');
                // You could navigate to sell page or open modal
              }}
              className={`relative z-10 w-1/2 font-label-caps font-bold transition-colors duration-300 uppercase tracking-wide text-sm py-1 ${activeTab === 'Sell' ? 'text-primary' : 'text-white'}`}
            >
              Vendre
            </button>
          </div>
        </div>

        {/* Right Side: Collage */}
        <div className="relative h-[350px] flex justify-center items-center">
          <div className="absolute w-56 h-72 transform -rotate-[15deg] -translate-x-32 overflow-hidden rounded-[22px] shadow-lg border-0 z-0">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" alt="Fashion 1" className="w-full h-full object-cover" />
          </div>
          <div className="absolute w-56 h-72 transform rotate-0 z-10 translate-y-2 scale-105 overflow-hidden rounded-[22px] shadow-xl border-0">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600" alt="Fashion 2" className="w-full h-full object-cover" />
          </div>
          <div className="absolute w-56 h-72 transform rotate-[15deg] translate-x-32 -translate-y-2 overflow-hidden z-0 rounded-[22px] shadow-lg border-0">
             <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" alt="Fashion 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
