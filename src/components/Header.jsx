import React, { useState, useEffect } from 'react';
import { Menu, X, Truck, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCartItems } from '../API';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthed, setIsAuthed] = useState(Boolean(typeof window !== 'undefined' && localStorage.getItem('token')));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await getCartItems();
        if (data && data.success) {
          const count = (data.cartItems || []).reduce((acc, i) => acc + (i.quantity || 0), 0);
          setCartCount(count);
        }
      } catch (e) {}
    };

    // Initial fetch if already authenticated
    if (localStorage.getItem('token')) fetchCount();

    const onCartUpdate = (e) => {
      const { count, delta } = (e && e.detail) || {};
      if (typeof count === 'number') setCartCount(Math.max(0, count));
      else if (typeof delta === 'number') setCartCount((c) => Math.max(0, c + delta));
    };
    window.addEventListener('cart:update', onCartUpdate);

    const onAuthUpdate = (e) => {
      const { loggedIn } = (e && e.detail) || {};
      setIsAuthed(Boolean(loggedIn));
      if (loggedIn) fetchCount();
      else setCartCount(0);
    };
    window.addEventListener('auth:update', onAuthUpdate);

    const onStorage = () => {
      const loggedIn = Boolean(localStorage.getItem('token'));
      setIsAuthed(loggedIn);
      if (loggedIn) fetchCount(); else setCartCount(0);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('cart:update', onCartUpdate);
      window.removeEventListener('auth:update', onAuthUpdate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleLogout = () => {
    try { window.dispatchEvent(new CustomEvent('cart:update', { detail: { count: 0 } })); } catch {}
    try { window.dispatchEvent(new CustomEvent('auth:update', { detail: { loggedIn: false } })); } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthed(false);
    setCartCount(0);
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Wedding Bouquets', href: '/wedding-bouquets' },
    { name: 'Occasions', href: '/occasions' },
    { name: 'Gift Items', href: '/gift-items' },
    { name: 'About Us', href: '/about' },
   
  ];

  return (
    <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#FAF5E6] shadow-lg' : 'bg-[#FAF5E6]'}`}>
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

            {/* Desktop Navigation */}
            <div className="flex-1 flex justify-center">
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="font-bold text-sage-600 hover:underline underline-offset-4 decoration-2 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Cart + Login Buttons */}
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
              {isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="bg-[oklch(51.4%_0.222_16.935)] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-[oklch(51.4%_0.222_16.935)] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-sage-600 ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 text-center">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-bold text-sage-600 hover:underline underline-offset-4 decoration-2 transition-colors duration-200"
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
                {isAuthed ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition-all duration-200 mx-auto"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition-all duration-200 mx-auto"
                  >
                    Login
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </header>
  );
};

export default Header;
