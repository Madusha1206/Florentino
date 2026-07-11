import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Truck, Home as HomeIcon } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const catalogMenuGroups = [
  {
    label: 'Catalog',
    path: '/catalog/index',
    items: [
      { label: 'Balloon Hampers', path: '/catalog/ballon-hampers' },
      { label: 'Balloon Hampers with Gifts', path: '/catalog/ballon-hampers-with-gifts' },
      { label: 'Rose Bunches', path: '/catalog/rose-bunches' },
      { label: 'Flower Bunches', path: '/catalog/flower-bunches' },
      { label: 'Cake with Flower Bunch', path: '/catalog/cake-with-flower-bunch' },
      { label: 'Cakes', path: '/catalog/cakes' },
      { label: 'Brownies', path: '/catalog/brownies' },
      { label: 'Brownies with Gifts', path: '/catalog/brownies-with-gifts' },
      { label: 'Teddies', path: '/catalog/teddies' },
      { label: 'Money Bunches', path: '/catalog/money-bunches' },
      { label: 'Wedding Bouquets', path: '/catalog/wedding-bouquets' },
    ],
  },
];

const primaryNavLinks = [
  { label: 'Events', path: '/other-services' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
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

      <nav className="primary-nav-bar" aria-label="Primary navigation">
        <div className="primary-nav-inner">
          {catalogMenuGroups.map((group) => (
            <div key={group.label} className="primary-nav-item">
              <NavLink
                to={group.path}
                className={({ isActive }) => {
                  const isGroupActive =
                    isActive ||
                    group.items.some((item) => item.path === location.pathname) ||
                    (group.label === 'Catalog' && location.pathname === '/catalog');

                  return `primary-nav-link ${isGroupActive ? 'primary-nav-link-active' : ''}`;
                }}
              >
                {group.label}
              </NavLink>
              <div className="primary-nav-dropdown" role="menu" aria-label={`${group.label} categories`}>
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `primary-nav-dropdown-link ${isActive ? 'active' : ''}`
                    }
                    role="menuitem"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
          {primaryNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `primary-nav-link ${isActive ? 'primary-nav-link-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
