"use client";
import Link from 'next/link';

export default function PromosPage() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* Back button */}
      <div className="w-full max-w-7xl mx-auto px-container-margin pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-sm font-medium" style={{ fontFamily: '"Google Sans", sans-serif' }}>Retour</span>
        </Link>
      </div>

      {/* Hero coming soon - same style as landing page */}
      <div
        className="flex-1 w-full flex flex-col items-center justify-center py-20 md:py-32 overflow-x-clip text-[#1c1c1c] uppercase tracking-tight leading-[0.85]"
        style={{ fontFamily: '"Mango Grotesque", sans-serif', fontWeight: 'bold' }}
      >
        {/* LINE 1 */}
        <div className="relative inline-block text-[13vw] md:text-[13vw] z-10 whitespace-nowrap">
          {/* Teal shape - Top Left */}
          <div className="absolute -left-[5%] md:-left-[20%] -top-[10%] w-24 md:w-56 opacity-90 mix-blend-multiply pointer-events-none -z-10">
            <svg viewBox="-50 0 250 350" className="overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(-100, 0)"><path fill="#00b2ae" d="M206.55,187.13c-24.11,83.01-87.83,150.31-142.31,150.31S-14.86,270.15,9.26,187.13C33.37,104.12,97.09,36.82,151.57,36.82s79.1,67.3,54.98,150.31Z"></path></g>
            </svg>
          </div>

          <span className="relative z-20">BIENTÔT</span>

          {/* Orange shape - Top Right */}
          <div className="absolute -right-[5%] md:-right-[25%] -top-[15%] w-24 md:w-52 opacity-95 mix-blend-multiply pointer-events-none -z-10">
            <svg viewBox="500 -20 300 400" className="overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(100, 0)"><path fill="#ff4313" d="M651.31,226.37c27.59-27.6,7.04-92.89-45.92-145.85-52.95-52.95-118.25-73.51-145.85-45.92-21.47,21.47-13.78,65.78,15.64,109.33-20.45-3.73-38.03-.5-49.31,10.77-27.59,27.59-7.04,92.89,45.92,145.85,52.95,52.95,118.25,73.51,145.85,45.92,21.47-21.47,13.78-65.78-15.64-109.33,20.45,3.73,38.03.51,49.31-10.77Z"></path></g>
            </svg>
          </div>
        </div>

        {/* LINE 2 */}
        <div className="relative inline-block text-[13vw] md:text-[13vw] z-10 whitespace-nowrap mt-[-2%] md:mt-0">
          <span className="relative z-20">LES PROMOS</span>
        </div>

        {/* LINE 3 */}
        <div className="relative inline-block text-[13vw] md:text-[13vw] z-10 whitespace-nowrap mt-[-2%] md:mt-0">
          {/* Pink shape - Bottom Left */}
          <div className="absolute -left-[10%] md:-left-[40%] -bottom-[20%] w-28 md:w-56 opacity-95 mix-blend-multiply pointer-events-none -z-10">
            <svg viewBox="750 -50 260 410" className="overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(150, 0)"><path fill="#fd7f91" d="M798.46,0c74.9-.31,99.3,108.8,32.32,141.46,24.75,35.96,26.68,84.46.64,120.28,25.74,191.51-267.7,69.29-148.23-66.65C609.1,102.36,695.94,2.43,798.46,0Z"></path></g>
            </svg>
          </div>

          <span className="relative z-20">ADDIKT</span>

          {/* Blue shape - Bottom Right */}
          <div className="absolute -right-[10%] md:-right-[35%] -bottom-[10%] w-24 md:w-44 opacity-95 mix-blend-multiply pointer-events-none -z-10">
            <svg viewBox="200 20 240 300" className="overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0, 0)"><path fill="#00a6fb" d="M402.49,149.22c-5.07-5.57-11.09-9.96-17.8-13.19-9.06-59.14-48.45-102.49-90.61-98.11-44.05,4.58-74.43,59.52-67.86,122.73,1.48,14.25,4.72,27.69,9.34,39.93-23.27,37.23-25.92,78.64-3.23,103.56,29.81,32.75,92.07,24.61,139.06-18.16,46.99-42.78,60.92-104,31.11-136.75Z"></path></g>
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="mt-12 text-[#555] text-base md:text-lg uppercase tracking-widest"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.2em' }}
        >
          Les meilleures offres arrivent très bientôt
        </p>
      </div>
    </main>
  );
}
