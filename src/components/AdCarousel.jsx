"use client";
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const MOCK_BANNERS = [
  {
    id: 1,
    title: "Vends en confiance",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
    link: "/publish",
    alt: "Vends en confiance"
  },
  {
    id: 2,
    title: "Fresh DROP de la semaine",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    link: "/fresh-drop",
    alt: "Fresh DROP de la semaine"
  },
  {
    id: 3,
    title: "Rejoins la communauté sur Instagram",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    link: "https://instagram.com",
    alt: "Rejoins la communauté sur Instagram"
  }
];

export default function AdCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-6 px-container-margin w-full max-w-7xl mx-auto" aria-roledescription="carousel" role="region" aria-label="Bannières promotionnelles">
      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex -ml-3 md:-ml-8">
            {MOCK_BANNERS.map((banner) => (
              <div 
                key={banner.id} 
                className="pl-3 md:pl-8 flex-none w-full md:w-2/3"
                role="group" 
                aria-roledescription="slide"
              >
                {banner.link.startsWith('http') ? (
                  <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[2/1] rounded-xl overflow-hidden relative group">
                    <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
                      <h3 className="text-white font-headline-md md:text-3xl text-xl" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>{banner.title}</h3>
                    </div>
                  </a>
                ) : (
                  <Link href={banner.link} className="block w-full aspect-[2/1] rounded-xl overflow-hidden relative group">
                    <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
                      <h3 className="text-white font-headline-md md:text-3xl text-xl" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>{banner.title}</h3>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-black/10 shadow-sm transition-all z-10 ${prevBtnDisabled ? 'opacity-0 cursor-default' : 'hover:bg-gray-50'}`}
          aria-label="Voir la bannière précédente"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-black/10 shadow-sm transition-all z-10 ${nextBtnDisabled ? 'opacity-0 cursor-default' : 'hover:bg-gray-50'}`}
          aria-label="Voir la bannière suivante"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
