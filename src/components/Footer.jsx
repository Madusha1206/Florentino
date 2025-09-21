import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter subscription:', email);
    setEmail('');
    setIsSubmitting(false);
  };

  const infoLinks = [
    { name: 'Weddings', href: '#weddings' },
    { name: 'Car Surprises', href: '#car-surprises' },
    { name: 'Birthday Surprises', href: '#birthday-surprises' },
    { name: 'Money Bunches', href: '#money-bunches' }
  ];

  const exploreLinks = [
    { name: 'About Florentino', href: '#about' },
    { name: 'Other Services', href: '#services' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Delivery Areas', href: '#delivery' },
    { name: 'FAQ', href: '#faq' }
  ];

  const socialLinks = [
    { 
      name: 'TikTok', 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
        </svg>
      ),
      href: '#tiktok',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#instagram',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'WhatsApp', 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
        </svg>
      ),
      href: '#whatsapp',
      color: 'hover:text-green-400'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: '#facebook',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-script text-yellow-400 mb-6">Florentino</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    No 67/1 Jayanthi Mawatha, Biyagama, Sri Lanka.
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <a 
                    href="tel:+94762370470" 
                    className="text-gray-300 text-sm hover:text-pink-400 transition-colors duration-200"
                  >
                    +94 76 237 0470
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <a 
                    href="mailto:florentinoflorist@gmail.com" 
                    className="text-gray-300 text-sm hover:text-pink-400 transition-colors duration-200"
                  >
                    florentinoflorist@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">INFO</h3>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-pink-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">EXPLORE</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-pink-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Keep in Touch */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">KEEP IN TOUCH</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200 p-2 rounded-full hover:bg-gray-800`}
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="text-center mb-8">
            <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              We're ready to work together to get your products delivered on time. Receive our latest updates about our products and promotions.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2024 Florentino. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-red-500 font-bold text-xs">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-500 font-bold text-xs">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;