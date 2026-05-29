import React, { useState, useEffect } from 'react';
import { ShoppingCart, Truck, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const count = getStoredCart().reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    const handleCartUpdate = (event) => {
      if (typeof event.detail?.count === 'number') setCartCount(event.detail.count);
      else updateCount();
    };

    updateCount();
    window.addEventListener('cart:update', handleCartUpdate);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('cart:update', handleCartUpdate);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-banner">
        <div className="header-banner-left">
          <Truck className="banner-icon" />
          <span className="header-banner-text">Islandwide Delivery Available!</span>
        </div>
        <div className="header-banner-right">
          <a
            href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20know%20about%20delivery%20options"
            target="_blank"
            rel="noopener noreferrer"
            className="banner-link"
          >
            Click Here
          </a>
        </div>
      </div>

      <div className="header-main">
        <div className="header-layout">
          <div className="header-logo">
            <img src="/images/logo.jpeg" alt="Florentino Logo" className="header-logo-img" />
            <div>
              <h1 className="header-logo-title">Florentino</h1>
              <p className="header-logo-subtitle">Handmade floral gifts and bouquets</p>
            </div>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="icon-button cart-button" aria-label="Open cart">
              <ShoppingCart className="icon-svg" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link to="/" className="icon-button home-button" aria-label="Home">
              <HomeIcon className="icon-svg" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
