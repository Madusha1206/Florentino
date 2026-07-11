import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-label">Fresh floral gifts from Biyagama</span>
            <h1 className="hero-title">Florentino</h1>
            <p className="hero-subtitle">Flowers, cakes, hampers, and surprise gifts made to feel personal.</p>
            <p className="hero-text">
              Browse by item code, add your favorites to the cart, and send your order directly through WhatsApp.
            </p>
            <div className="hero-actions">
              <Link to="/catalog" className="hero-button">
                Browse Catalog
              </Link>
              <a href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20order%20flowers" target="_blank" rel="noreferrer" className="secondary-button">
                Order on WhatsApp
              </a>
            </div>
            <div className="hero-trust-row" aria-label="Florentino services">
              <span>Islandwide delivery</span>
              <span>Custom arrangements</span>
              <span>WhatsApp ordering</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
