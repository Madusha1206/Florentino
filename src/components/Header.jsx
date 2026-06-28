import React, { useState, useEffect } from 'react';
import { ChevronDown, LayoutGrid, Search, ShoppingCart, Truck, Home as HomeIcon } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const catalogCategories = [
  { label: 'Balloon Hampers', path: '/catalog/ballon-hampers' },
  { label: 'Brownies', path: '/catalog/brownies' },
  { label: 'Cakes', path: '/catalog/cakes' },
  { label: 'Flower Bunches', path: '/catalog/flower-bunches' },
  { label: 'Rose Bunches', path: '/catalog/rose-bunches' },
  { label: 'Money Bunches', path: '/catalog/money-bunches' },
  { label: 'Teddies', path: '/catalog/teddies' },
  { label: 'Cake with Flower Bunch', path: '/catalog/cake-with-flower-bunch' },
  { label: 'Brownies with Gifts', path: '/catalog/brownies-with-gifts' },
  { label: 'Balloon Hampers with Gifts', path: '/catalog/ballon-hampers-with-gifts' },
  { label: 'Wedding Bouquets', path: '/catalog/wedding-bouquets' },
];

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/catalog?search=${encodeURIComponent(query)}` : '/catalog');
  };

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
              {/* <p className="header-logo-subtitle">Handmade floral gifts and bouquets</p> */}
            </div>
          </div>

          <form className="header-search" role="search" onSubmit={handleSearchSubmit}>
            <Search className="header-search-icon" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search code or price"
              aria-label="Search catalog by item code or price"
              className="header-search-input"
            />
          </form>

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

      <nav className="catalog-category-bar" aria-label="Catalog categories">
        <div className="catalog-category-inner">
          <NavLink
            to="/catalog/index"
            className={({ isActive }) =>
              `catalog-category-button ${isActive ? 'catalog-category-active' : ''}`
            }
          >
            <LayoutGrid className="catalog-category-icon" />
            <span>Categories</span>
            <ChevronDown className="catalog-category-chevron" />
          </NavLink>

          <div className="catalog-category-scroll">
            {catalogCategories.map((category) => (
              <NavLink
                key={category.path}
                to={category.path}
                className={({ isActive }) =>
                  `catalog-category-link ${isActive ? 'catalog-category-link-active' : ''}`
                }
              >
                {category.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
