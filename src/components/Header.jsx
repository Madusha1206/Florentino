import React, { useState, useEffect } from 'react';
import { Menu, X, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Wedding Bouquets', href: '/wedding-bouquets' },
    { name: 'Occasions', href: '/occasions' },
    { name: 'Gift Items', href: '/Giftitems' },
    { name: 'About Us', href: '/about' },
   
  ];

  return (
    <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/100 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
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
                src="/logo.jpeg"
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
                    className="font-bold text-sage-600 hover:text-rose-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-[oklch(51.4%_0.222_16.935)] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                Login
              </button>
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
                    className="font-bold text-sage-600 hover:text-rose-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition-all duration-200 mx-auto"
                >
                  Login
                </button>
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
