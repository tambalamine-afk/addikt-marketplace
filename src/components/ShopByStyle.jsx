"use client";
import React from 'react';

const CATEGORY_CARDS = [
  {
    title: "Femmes",
    subtitle: "Blouses, robes et plus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN0hPZ7PccIkDRgVV3CXNQ362XwjArh7R41MNGUlbitiOPNnRSzW00afyffMi4WVQdbRG_OW1ZYZcvgQQodypwJCqWXLUJaUSaK7Eg3z9J1xy4eN4-KMGGX5gEezl2P8ou91zt5WOfv362OQWQRBZ5l7HR9hOX83uTAwKhJaGhWuK2Xz_dRyD122RU8GVuOz82w0BLKVov88Vzv4vlgnvspKfX3lHfwT4AU5PKOYOrfoJHPbmkVq6w"
  },
  {
    title: "Hommes",
    subtitle: "T-shirts, polos et plus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByQnOkEqxcocHqJ0PJiwvlKQv6i0TivIInYvMg8-wC9MuM2NJeDBix9Ro6xgmOYweX7B5Rg35TG6uXpC79HZmhtgmR_2RhlDsSt5RUblN206q5gDy2itBGZdPpUsjHEqjpAc_HmIqtBJ68j6rY-sNsroy_qNtjoG-iFhzrFrI1gmvRTBNWozpts9JJPhRRDt2cWX2ya32fgQwq_B9BC-WJSDbpAdvfBS26mo4FrYFwwTQFRumCk4P2"
  },
  {
    title: "Enfants",
    subtitle: "Pyjamas, tenues et plus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpUYzloC2GpHHinOyTXHNXemuf8G6iDaecwSDlknf25NXpQuGDXnm6gRDtCUqjAc03rL7UYbtSoDraFs_ida3Lix_rorFyLVQ8cwwevbHk6eZmiMPcLATiykG2BJ4j3jDUUtSZk09hU6rM3ud6fV9oCrOz_1u9F0ehVylPu4MGfzFBVMWfSp1nxlg7q1AUTenWk0NIp1bIH_FL54xrqmepHqTSDjdKM25ZBoT_kX5l1pOR_CkowHg0"
  },
  {
    title: "Accessoires",
    subtitle: "Sacs, bijoux et plus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_gP-u7CegtOVZgGVsvsgo99hSykmyCqTimv1pG2obRfCuzj8nOCd6pf78d0wtxF-OmdffGIY04I3VCShIJeWQFFxf3jxuzxHsrWhvT25JQwNd3r2M52FM0AUkgSQNRFE_xRBhuYO3WSMxbrQoTDtGRx4JugpWGaAAblR-e-ITdYaVFXYZUwDkSEUphIk9VrY_brxBgpWQjKI3k7tZY6koCvUt-paJCWrrMCAiGthBfWp_yLJtK2Z-"
  }
];

export default function ShopByStyle() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_CARDS.map((card, idx) => (
            <div key={idx} className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110">
                <img alt={card.title} className="w-full h-full object-cover" src={card.image} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                <p className="text-sm mb-1" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600, color: '#ffffff' }}>
                  {card.subtitle}
                </p>
                <h3 className="text-2xl" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600, color: '#ffffff' }}>
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-16 flex flex-col items-center justify-center overflow-hidden min-h-[600px] bg-surface">
        <h2 className="font-headline-lg text-primary text-center mb-24 relative z-20" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
          Catégories
        </h2>
        <div className="w-full max-w-7xl mx-auto px-container-margin relative z-10 mt-[-50px]">
          <svg className="w-full h-auto" data-name="Calque 2" id="Calque_2" viewBox="-100 -50 1490.71 460.67" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`
                .cls-1 { fill: #c77dff; }
                .cls-2 { fill: #febfc8; }
                .cls-3 { fill: #fee19d; }
                .cls-4 { fill: #feced5; }
                .cls-5 { fill: #fee2a1; }
                .cls-6 { fill: #fec0c9; }
                .cls-7 { fill: #fedc8d; }
                .cls-8 { fill: #fef3d9; }
                .cls-9 { fill: #feedc4; }
                .cls-10 { fill: #fedc8a; }
                .cls-11 { fill: #fedee3; }
                .cls-12 { fill: #fe9fad; }
                .cls-13 { fill: #feedc5; }
                .cls-14 { fill: #fd7f91; }
                .cls-15 { fill: #fdcf65; }
                .cls-16 { fill: #ff4313; }
                .cls-17 { fill: #00b2ae; }
                .cls-18 { fill: #00a6fb; }
                @keyframes float-1 { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(3deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                @keyframes float-2 { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-2deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                @keyframes float-3 { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(1deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                .shape-group-1 { animation: float-1 6s ease-in-out infinite; transform-origin: center; }
                .shape-group-2 { animation: float-2 7s ease-in-out infinite 1s; transform-origin: center; }
                .shape-group-3 { animation: float-3 8s ease-in-out infinite 2s; transform-origin: center; }
                .shape-group-4 { animation: float-1 6.5s ease-in-out infinite 0.5s; transform-origin: center; }
                .shape-group-5 { animation: float-2 7.5s ease-in-out infinite 1.5s; transform-origin: center; }
                .shape-group-6 { animation: float-3 8.5s ease-in-out infinite 2.5s; transform-origin: center; }
              `}</style>
            </defs>
            <g data-name="Calque 1" id="Calque_1-2">
              <g className="shape-group-1" transform="translate(100, 0)"><path className="cls-16" d="M651.31,226.37c27.59-27.6,7.04-92.89-45.92-145.85-52.95-52.95-118.25-73.51-145.85-45.92-21.47,21.47-13.78,65.78,15.64,109.33-20.45-3.73-38.03-.5-49.31,10.77-27.59,27.59-7.04,92.89,45.92,145.85,52.95,52.95,118.25,73.51,145.85,45.92,21.47-21.47,13.78-65.78-15.64-109.33,20.45,3.73,38.03.51,49.31-10.77Z"></path></g>
              <g className="shape-group-2" transform="translate(0, 0)"><path className="cls-18" d="M402.49,149.22c-5.07-5.57-11.09-9.96-17.8-13.19-9.06-59.14-48.45-102.49-90.61-98.11-44.05,4.58-74.43,59.52-67.86,122.73,1.48,14.25,4.72,27.69,9.34,39.93-23.27,37.23-25.92,78.64-3.23,103.56,29.81,32.75,92.07,24.61,139.06-18.16,46.99-42.78,60.92-104,31.11-136.75Z"></path></g>
              <g className="shape-group-3" transform="translate(150, 0)">
                <path className="cls-4" d="M656.16,127.22h-.22v-1.97c.06-.19.14-.19.22,0v1.97Z"></path>
                <path className="cls-2" d="M656.16,115.85c-.06.19-.14.19-.22,0v-1.31c.38.28.22.88.22,1.31Z"></path>
                <path className="cls-12" d="M655.94,117.16v-1.31h.22c0,.43.16,1.03-.22,1.31Z"></path>
                <path className="cls-12" d="M656.16,125.25h-.22v-1.31c.4.28.22.88.22,1.31Z"></path>
                <g>
                  <path className="cls-14" d="M798.46,0c74.9-.31,99.3,108.8,32.32,141.46,24.75,35.96,26.68,84.46.64,120.28,25.74,191.51-267.7,69.29-148.23-66.65C609.1,102.36,695.94,2.43,798.46,0Z"></path>
                  <path className="cls-6" d="M870.37,76.94c-.06.19-.14.19-.22,0v-3.5c.06-.19.14-.19.22,0v3.5Z"></path>
                  <path className="cls-11" d="M870.37,73.45h-.22c0-.51-.04-1.03,0-1.53h.22v1.53Z"></path>
                  <rect className="cls-11" height="1.53" width=".22" x="870.16" y="76.94"></rect>
                </g>
              </g>
              <g className="shape-group-4" transform="translate(200, 0)">
                <path className="cls-8" d="M1088.31,202.2h-.22c-.04-.87-.03-1.76,0-2.62h.22v2.62Z"></path>
                <path className="cls-9" d="M845.24,275.21c-.06.19-.14.19-.22,0v-1.75h.22v1.75Z"></path>
                <path className="cls-13" d="M845.24,285.48h-.22v-1.75c.06-.19.14-.19.22,0v1.75Z"></path>
                <path className="cls-7" d="M845.02,276.52v-1.31h.22c0,.44.18,1.03-.22,1.31Z"></path>
                <path className="cls-10" d="M845.24,283.73h-.22v-1.31c.4.28.22.88.22,1.31Z"></path>
                <g>
                  <path className="cls-15" d="M949.07,18.58c55.94.32,82.41,62.01,88.5,109.9,46.94,15.15,66.09,77.08,37.1,116.49-10.3,14.7-25.55,25.51-42.91,30.18-13.86,8.74-26.62,19.26-37.98,31.04-28.35,78.42-147.79,59.38-148.76-23.76-.86-46.13,30.24-85.09,39.65-129.12.5-24.16-23.71-33.33-13.51-76.66,8-34.74,42.21-60.75,77.9-58.06Z"></path>
                  <path className="cls-3" d="M951.25,18.58c-.58.38-1.61.38-2.19,0h2.19Z"></path>
                  <path className="cls-5" d="M942.51,18.58c-.55.42-1.3.18-1.97.22v-.22h1.97Z"></path>
                </g>
              </g>
              <g className="shape-group-5" transform="translate(-100, 0)"><path className="cls-17" d="M206.55,187.13c-24.11,83.01-87.83,150.31-142.31,150.31S-14.86,270.15,9.26,187.13C33.37,104.12,97.09,36.82,151.57,36.82s79.1,67.3,54.98,150.31Z"></path></g>
              <g className="shape-group-6" transform="translate(250, 0)"><path className="cls-1" d="M1167.17,61.22l23.89,17.36,29.45-2.2c43.87-3.28,77.05,38.98,63.45,80.82l-9.13,28.09,11.19,27.33c16.67,40.71-13.27,85.32-57.26,85.32h-29.53s-22.53,19.09-22.53,19.09c-33.56,28.44-85.25,13.75-98.84-28.09l-9.13-28.09-25.12-15.53c-37.42-23.13-39.42-76.82-3.83-102.68l23.89-17.36,7.01-28.69c10.44-42.73,60.88-61.23,96.47-35.37Z" style={{ fill: 'rgb(199, 125, 255)' }}></path></g>
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}
