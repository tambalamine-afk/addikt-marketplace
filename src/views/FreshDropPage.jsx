"use client";
import Link from 'next/link';

export default function FreshDropPage() {
  return (
    <main className="w-full min-h-[60vh] bg-white">
      {/* Header */}
      <section className="w-full border-b border-surface-container-low">
        <div className="max-w-7xl mx-auto px-container-margin py-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Fresh DROP
            </h1>
            <svg className="text-black" fill="currentColor" height="28" viewBox="0 0 100 100" width="28">
              <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Empty State */}
      <section className="w-full max-w-7xl mx-auto px-container-margin py-24 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
          new_releases
        </span>
        <h2 className="text-xl font-bold text-on-surface mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
          Aucun article pour le moment
        </h2>
        <p className="text-on-surface-variant text-sm max-w-xs" style={{ fontFamily: '"Google Sans", sans-serif' }}>
          Les nouvelles pépites arrivent bientôt. Publie le premier article Fresh DROP !
        </p>
        <Link
          href="/publish"
          className="mt-8 bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:bg-accent-orange transition-colors"
          style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
        >
          Publier un article
        </Link>
      </section>
    </main>
  );
}
