import React, { useState, useEffect } from 'react';
import { ShoppingCart, Truck, Home as HomeIcon, Facebook, Instagram, Menu, X, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  { label: 'Contact Us', path: '/#contact' },
];

const headerSocialLinks = [
  {
    name: 'TikTok',
    href: '#tiktok',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z" />
      </svg>
    ),
  },
  { name: 'Instagram', href: '#instagram', icon: Instagram },
  {
    name: 'WhatsApp',
    href: '#whatsapp',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
      </svg>
    ),
  },
  { name: 'Facebook', href: '#facebook', icon: Facebook },
];

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const location = useLocation();

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
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <div className="header-banner">
        <div className="header-banner-spacer" aria-hidden="true" />
        <div className="header-banner-offer">
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
        <div className="header-banner-socials" aria-label="Social media links">
          {headerSocialLinks.map((social) => (
            <a key={social.name} href={social.href} className="header-social-link" aria-label={social.name}>
              <social.icon />
            </a>
          ))}
        </div>
      </div>

      <div className="header-main">
        <div className="header-layout">
          <div className="header-layout-spacer" aria-hidden="true" />

          <div className="header-logo">
            <img src="/images/logo.jpeg" alt="Florentino Logo" className="header-logo-img" />
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
          <button
            type='button'
            className='mobile-menu-toggle'
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
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
