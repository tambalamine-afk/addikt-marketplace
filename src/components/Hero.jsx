import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenSell, onOpenFitCheck, scrollToFeed }) {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Column: Messaging */}
        <div className="hero-text-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>MADE IN SÉNÉGAL 🇸🇳</span>
          </div>

          <h1 className="hero-title">
            LA MODE DAKAROISE, <br />
            <span className="hero-title-highlight">DE MAIN EN MAIN.</span>
          </h1>

          <p className="hero-subtitle">
            Addikt, c'est la marketplace où la jeunesse sénégalaise vend, chine et drope ses pièces. Streetwear, boubous, vintage, sneakers.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary-hero" onClick={onOpenSell}>
              COMMENCER À VENDRE
            </button>
            <button className="btn-secondary-hero" onClick={scrollToFeed}>
              EXPLORER LE FEED
            </button>
          </div>
        </div>

        {/* Right Column: Visual Graphic FIT CHECK Card Cluster */}
        <div className="hero-graphic">
          <div className="fit-check-card-container" onClick={onOpenFitCheck} title="Découvrir le Feed FIT CHECK">
            <div className="card-layer card-layer-bg1"></div>
            <div className="card-layer card-layer-bg2"></div>
            <div className="card-layer card-layer-main">
              <span className="fit-check-text">FIT</span>
              <span className="fit-check-text">CHECK</span>
              <div style={{ marginTop: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
                FEED COMMUNAUTÉ ➔
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
