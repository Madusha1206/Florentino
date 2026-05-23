import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, Truck, Search, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
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

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Wedding Bouquets', href: '/wedding-bouquets' },
    { name: 'Occasions', href: '/occasions' },
    { name: 'Gift Items', href: '/gift-items' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full z-40 sticky top-0">
      {/* Delivery Banner */}
      {showDeliveryBanner && (
        <div className="bg-rose-700 text-white py-2 px-4 relative">
          <div className="container mx-auto flex items-center justify-center gap-3">
            <Truck className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">Islandwide Delivery Available!</span>
            <a
              href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20know%20about%20delivery%20options"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-xs font-semibold transition-all duration-200"
            >
              Click Here
            </a>
            <button
              onClick={() => setShowDeliveryBanner(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Row: Logo + Search + Contact */}
      <div className="bg-[#FAF5E6] border-b border-rose-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/images/logo.jpeg"
                alt="Florentino Logo"
                className="h-14 w-14 object-contain"
              />
              <span className="text-2xl font-bold text-rose-800 tracking-wide hidden sm:block">
                Florentino
              </span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for anything..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-md text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-200 bg-white"
                />
                <button
                  type="submit"
                  className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-2.5 rounded-r-md transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right: Phone + Cart + WhatsApp */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <a
                href="tel:+94762370470"
                className="flex items-center gap-2 text-rose-800 hover:text-rose-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-semibold">+94 76 237 0470</span>
              </a>

              <Link
                to="/cart"
                className="relative flex items-center justify-center bg-rose-700 hover:bg-rose-800 text-white h-10 w-10 rounded-full transition-all duration-200"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>

              <a
                href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20ask%20about%20your%20catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200"
              >
                WhatsApp
              </a>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="md:hidden flex items-center gap-3 ml-auto">
              <Link
                to="/cart"
                className="relative flex items-center justify-center bg-rose-700 text-white h-9 w-9 rounded-full"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold px-1 rounded-full min-w-[1.1rem] text-center leading-tight">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="text-rose-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="hidden md:block bg-rose-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="block px-5 py-3 text-white font-semibold text-sm hover:bg-rose-800 transition-colors duration-150 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FAF5E6] border-t border-rose-100 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-md text-rose-800 font-semibold hover:bg-rose-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-rose-100 mt-2 pt-2 flex flex-col gap-2">
              <a
                href="tel:+94762370470"
                className="flex items-center gap-2 px-4 py-2 text-rose-700 font-medium"
              >
                <Phone className="h-4 w-4" />
                +94 76 237 0470
              </a>
              <a
                href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20ask%20about%20your%20catalog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-semibold text-center transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
