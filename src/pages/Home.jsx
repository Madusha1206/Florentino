import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-card">
            <span className="hero-label">Flower Bunch Offer</span>
            <h1 className="hero-title">20% OFF</h1>
            <p className="hero-subtitle">Fresh flower bunches for every moment</p>
            <p className="hero-text">
              Choose your favorite bunch and send your order through WhatsApp from the catalog.
            </p>
            <div className="hero-actions">
              <Link to="/catalog" className="hero-button">
                Shop Catalog
              </Link>
              <a href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20order%20flowers" target="_blank" rel="noreferrer" className="secondary-button">
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
