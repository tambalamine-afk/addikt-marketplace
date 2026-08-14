import React, { useState, useEffect, useCallback } from 'react';

const SLIDE_DATA = [
  { 
    title: "Vintage Vibes", 
    subtitle: "Des pièces uniques, à ne pas laisser filer.", 
    color: "#A8A29E",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxLgjMfUFExwuaqPvDCm-TZviw8WL3U4SHmcp7u3cvkhIIx1CpjzohYsejzpqx_abQIvviLLh-u45yYfgh_hvuQqGR_uNzEaNNknvcQYjk7yZzKeKCyqXCiJNsTTAWoIotGVgPFW8y0rXgsx3x_2aFs7ZFN9R9fC7JozICwJWPfycH1Wfvfw-gJ-RTdAU6GGl74MzC8MNCDCw1VhRymfJ91lUqOIXJ1YdwF_jIBxYLJEnSyT5OIvlK"
  },
  { 
    title: "Sneakers de la semaine", 
    subtitle: "Les paires les plus recherchées, en stock maintenant.", 
    color: "#22C55E",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiU-4HGh-ATzQvfsVrhatuBF1hLHnmeIQ2HLQK6E4X2AoE0YD0DFIMGr3d8i4g3X_b_m76-KhO6mKWt766QPpy5NSW9xhZLMxfSopUmlMnaBlnT7uQwx-4o83wc7di0wGafvg0NNm8BeAruXw7pLXIzjx_CSukej7tuGFSuwbFFQUbk840X9qRhAWhOeD5nNWj_c7oyuPi5-OGurgzQynkq2qhre4GtniezzxUWr3wSmjWYZDBJnzO"
  },
  { 
    title: "Looks Wax", 
    subtitle: "Le motif qui ne se démode jamais.", 
    color: "#D946EF",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxbqGSfDWXUEhaRcbeghlO4wxcF03GpYPW6Mq9zajiz7Y__NxpPNqa4bqXDK_l0CK4fh0mq7Cfr9TgZi3f560BfaImqAYkYX-FSPCGwGE8Ma9Juz1YLhCPA3uHE4F14E1boQepHJBYIoCZYlhgTFalpfNT1FjK6gPEg0rFwPd_8NFkI56-YmRQ1v_BEjEj_G0e2-s8x0VGgO2UshLhrfcfszGcaO1Wukm6N0mxS6MPCQKDekzkq8WJ"
  }
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDE_DATA.length);
  }, []);

  useEffect(() => {
    let intervalId;
    if (!isHovered) {
      intervalId = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, nextSlide]);

  const current = SLIDE_DATA[currentSlide];

  return (
    <section className="w-full px-container-margin py-8">
      <div 
        className="max-w-7xl mx-auto h-[260px] overflow-hidden flex flex-col md:flex-row shadow-sm relative group rounded-[30px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Side: Content */}
        <div 
          className="w-full md:w-1/3 p-12 flex flex-col justify-center items-start text-white transition-colors duration-500 z-10 absolute left-0 top-0 bottom-0"
          style={{ backgroundColor: current.color }}
        >
          <h3 className="text-3xl mb-2 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
            {current.title}
          </h3>
          <p className="mb-6 opacity-90 text-sm" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            {current.subtitle}
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-bold text-sm">
            Shop now
          </button>
        </div>

        {/* Right Side: Image Area */}
        <div className="w-full md:w-2/3 absolute right-0 top-0 bottom-0">
          <div 
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {SLIDE_DATA.map((slide, idx) => (
              <div key={idx} className="w-full h-full shrink-0">
                <img alt={slide.title} className="w-full h-full object-cover" src={slide.img} />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDE_DATA.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 hover:scale-125 ${
                  idx === currentSlide
                    ? 'w-2.5 h-2.5 rounded-full bg-white'
                    : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrow */}
        <button 
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-md hover:bg-gray-100 transition-colors z-20"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
