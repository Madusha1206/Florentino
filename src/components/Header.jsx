import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Home as HomeIcon, Facebook, Instagram, Menu, X, ChevronDown, Search } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const catalogMenuGroups = [
  {
    label: 'Catalog',
    path: '/catalog',
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
  { label: 'About Us', path: '/#about' },
  { label: 'Contact Us', path: '/contact' },
];

const tickerSocialLinks = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@florentino.gifts?_r=1&_t=ZS-98DdWFGXK4r',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.05.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.43Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/florentino.florist?igsh=Y2Q0aGg4OTUzdmhx',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/187dExL2is/',
    icon: Facebook,
  },
];

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [desktopCatalogOpen, setDesktopCatalogOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mobileSearchInputRef = useRef(null);
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
    setMobileMenuOpen(false);
    setMobileCatalogOpen(false);
    setDesktopCatalogOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (mobileSearchOpen) mobileSearchInputRef.current?.focus();
  }, [mobileSearchOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/catalog?search=${encodeURIComponent(query)}` : '/catalog');
    setMobileSearchOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-banner">
        <div className="header-news-ticker" aria-label="Islandwide Delivery Available!">
          <span className="header-news-ticker__text">Islandwide Delivery Available!</span>
          <span className="header-news-ticker__text header-news-ticker__text--copy-two" aria-hidden="true">
            Islandwide Delivery Available!
          </span>

        </div>

        <ul className="header-banner-socials header-social-wrapper header-ticker-socials" aria-label="Social media links">
          {tickerSocialLinks.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={'header-social-icon header-social-' + social.name.toLowerCase()}
                aria-label={social.name}
              >
                <span className="header-social-tooltip" role="tooltip">{social.name}</span>
                <span className="header-social-glyph" aria-hidden="true">
                  <social.icon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="header-main">
        <div className="header-layout">
          <form className="aether-search-field header-search-desktop" role="search" onSubmit={handleSearchSubmit}>
            <div className="aether-search-field__input">
              <Search className="aether-search-field__icon" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search code, category or price"
                aria-label="Search catalog"
              />
              <span className="aether-search-field__kbd" aria-hidden="true">Enter</span>
            </div>
          </form>

          <div className="header-logo">
            <img src="/images/logo.jpeg" alt="Florentino Logo" className="header-logo-img" />
          </div>

          <div className="header-actions">
            <button
              type="button"
              className={`icon-button header-search-toggle${mobileSearchOpen ? ' header-search-toggle-active' : ''}`}
              aria-label={mobileSearchOpen ? 'Close catalog search' : 'Open catalog search'}
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-header-search"
              onClick={() => setMobileSearchOpen((open) => !open)}
            >
              {mobileSearchOpen ? <X className="icon-svg" /> : <Search className="icon-svg" />}
            </button>
            <Link to="/cart" className="icon-button cart-button" aria-label="Open cart">
              <ShoppingCart className="icon-svg" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link to="/" className="icon-button home-button" aria-label="Home">
              <HomeIcon className="icon-svg" />
            </Link>
          </div>
          <button
            type='button'
            className='mobile-menu-toggle'
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
            <span className='mobile-menu-label'>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
        <form
          id="mobile-header-search"
          className={`aether-search-field mobile-header-search${mobileSearchOpen ? ' mobile-header-search-open' : ''}`}
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <div className="aether-search-field__input">
            <Search className="aether-search-field__icon" aria-hidden="true" />
            <input
              ref={mobileSearchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search code, category or price"
              aria-label="Search catalog"
            />
            <button type="submit" className="mobile-search-submit site-action-button">Search</button>
          </div>
        </form>
      </div>

      <nav className="primary-nav-bar" aria-label="Primary navigation">
        <div className="primary-nav-inner">
          {catalogMenuGroups.map((group) => (
            <div
              key={group.label}
              className={`primary-nav-item ${desktopCatalogOpen ? 'primary-nav-item-dropdown-open' : ''}`}
              onMouseEnter={() => setDesktopCatalogOpen(true)}
              onMouseLeave={() => setDesktopCatalogOpen(false)}
              onFocusCapture={() => setDesktopCatalogOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDesktopCatalogOpen(false);
              }}
            >
              <NavLink
                to={group.path}
                onClick={() => setDesktopCatalogOpen(false)}
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
                    onClick={() => setDesktopCatalogOpen(false)}
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
              className={() => {
                const [linkPath, linkHash] = link.path.split('#');
                const isLinkActive = linkHash
                  ? location.pathname === linkPath && location.hash === '#' + linkHash
                  : location.pathname === link.path;
                return 'primary-nav-link ' + (isLinkActive ? 'primary-nav-link-active' : '');
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <nav
        id='mobile-navigation'
        className={mobileMenuOpen ? 'mobile-navigation mobile-navigation-open' : 'mobile-navigation'}
        aria-label='Mobile navigation'
      >
        <div className='mobile-navigation-row'>
          <NavLink to='/catalog' onClick={() => setMobileMenuOpen(false)}>Catalog</NavLink>
          <button
            type='button'
            aria-label='Toggle catalog categories'
            aria-expanded={mobileCatalogOpen}
            onClick={() => setMobileCatalogOpen((open) => !open)}
          >
            <ChevronDown className={mobileCatalogOpen ? 'mobile-chevron-open' : ''} />
          </button>
        </div>
        <div className={mobileCatalogOpen ? 'mobile-category-list mobile-category-list-open' : 'mobile-category-list'}>
          {catalogMenuGroups[0].items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        {primaryNavLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className='mobile-navigation-link'
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
