import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredCart } from '../utils/cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Ballon Hampers', href: '/catalog#ballon-hampers' },
    { name: 'Ballon Hampers with Gifts', href: '/catalog#ballon-hampers-with-gifts' },
    { name: 'Rose Bunches', href: '/catalog#rose-bunches' },
    { name: 'Flower Bunches', href: '/catalog#flower-bunches' },
    { name: 'Cake with Flower Bunch', href: '/catalog#cake-with-flower-bunch' },
    { name: 'Cakes', href: '/catalog#cakes' },
    { name: 'Brownies', href: '/catalog#brownies' },
    { name: 'Brownies with Gifts', href: '/catalog#brownies-with-gifts' },
    { name: 'Teddies', href: '/catalog#teddies' },
    { name: 'Chocolate Bar', href: '/catalog#chocolate-bar' },
    { name: 'Money Bunches', href: '/catalog#money-bunches' },
  ];

  return (
    <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {/* Delivery Banner */}
      {showDeliveryBanner && (
  <div className="bg-[oklch(51.4%_0.222_16.935)] text-white py-3 px-4 relative">
    <div className="container mx-auto flex items-center justify-center space-x-3">
      <Truck className="h-5 w-5" />
      <span className="text-sm font-medium">Islandwide Delivery Available!</span>
      <a
        href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20know%20about%20delivery%20options"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105"
      >
        Click Here
      </a>
      <button
        onClick={() => setShowDeliveryBanner(false)}
        className="absolute right-4 text-white/95 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
)}

      {/* Main Header */}
      <div className="transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <img
                src="/images/logo.jpeg"
                alt="Florentino Logo"
                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12 w-12' : 'h-20 w-20'}`}
              />
              <span className="text-2xl font-bold text-sage-700">Florentino</span>
            </div>

            <div className="flex-1" />

            {/* Contact Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/cart"
                className="relative flex items-center justify-center bg-[oklch(51.4%_0.222_16.935)] text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full min-w-[1.5rem] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <a
                href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20ask%20about%20your%20catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[oklch(51.4%_0.222_16.935)] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-sage-600 ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="mt-4 hidden items-center gap-8 overflow-x-auto border-t border-gray-100 bg-[#f7f0e4] px-6 py-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="whitespace-nowrap text-lg font-semibold tracking-wide text-gray-900 transition-colors hover:text-pink-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 text-center bg-[#f7f0e4] rounded-lg py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-bold text-gray-900 hover:text-pink-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-sage-600 hover:underline underline-offset-4 decoration-2 transition-colors duration-200"
                >
                  Cart {cartCount > 0 ? `(${cartCount})` : ''}
                </Link>
                <a
                  href="https://wa.me/94702370470?text=Hi%20Florentino%2C%20I%20want%20to%20ask%20about%20your%20catalog"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition-all duration-200 mx-auto"
                >
                  WhatsApp
                </a>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
