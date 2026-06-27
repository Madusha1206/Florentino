import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Flower2, Heart, Send } from 'lucide-react';
import { subscribeToNewsletter } from '../API';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setNewsletterMessage('');
    setNewsletterStatus('');

    try {
      const result = await subscribeToNewsletter(email);
      if (!result.success) throw new Error(result.message || 'Unable to subscribe right now.');

      setEmail('');
      setNewsletterStatus('success');
      setNewsletterMessage('Subscribed. We will notify you about new items, updates, and offers.');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(error.message || 'Unable to subscribe right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exploreLinks = [
    { name: 'About Florentino', href: '/about' },
    { name: 'Other Services', href: '/other-services' },
    
    
    { name: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    {
      name: 'TikTok',
      icon: () => (
        <svg className="footer-social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z" />
        </svg>
      ),
      href: '#tiktok',
      className: 'footer-social-button footer-social-tiktok',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#instagram',
      className: 'footer-social-button footer-social-instagram',
    },
    {
      name: 'WhatsApp',
      icon: () => (
        <svg className="footer-social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
        </svg>
      ),
      href: '#whatsapp',
      className: 'footer-social-button footer-social-whatsapp',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#facebook',
      className: 'footer-social-button footer-social-facebook',
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-topline">
          <span><Flower2 className="footer-topline-icon" /> Handmade floral gifts</span>
          <span><Heart className="footer-topline-icon" /> Crafted for special moments</span>
        </div>

        <div className="footer-grid">
          <div className="footer-column footer-brand">
            <h2>Florentino</h2>
            <p className="footer-brand-copy">
              Elegant bouquets, surprise gifts, and floral moments designed with care in Biyagama.
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <p>No 67/1 Jayanthi Mawatha, Biyagama, Sri Lanka.</p>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <a href="tel:+94762370470">+94 76 237 0470</a>
              </div>
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <a href="mailto:florentinoflorist@gmail.com">florentinoflorist@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="footer-column footer-links">
            <h3>EXPLORE</h3>
            <ul>
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  {link.href && link.href.startsWith('/') ? (
                    <Link to={link.href}>{link.name}</Link>
                  ) : (
                    <a href={link.href}>{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column footer-social">
            <h3>KEEP IN TOUCH</h3>
            <div className="footer-social-row">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={social.className}
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            
          </div>
        </div>

        <div className="footer-newsletter">
          <p>
            Receive new bouquet releases, surprise gift ideas, and seasonal offers from Florentino.
          </p>
          <form onSubmit={handleEmailSubmit} className="footer-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              required
              className="footer-newsletter-input"
            />
            <button type="submit" disabled={isSubmitting} className="footer-newsletter-button">
              <Send className="footer-button-icon" />
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>
          {newsletterMessage && (
            <p className={`footer-newsletter-status footer-newsletter-status-${newsletterStatus}`}>
              {newsletterMessage}
            </p>
          )}
        </div>

        <div className="footer-bottom-row">
          <p>© 2024 Florentino. All rights reserved.</p>
          <div className="footer-payment-row">
            <span>We accept:</span>
            <div className="footer-payment-cards" aria-label="Accepted payment methods">
              <svg className="footer-payment-card" role="img" aria-label="Visa" viewBox="0 0 84 52">
                <rect width="84" height="52" rx="8" fill="#ffffff" />
                <path fill="#1A1F71" d="M32.4 34.6h-5.2l3.3-20.8h5.2l-3.3 20.8Zm18.9-20.3a13 13 0 0 0-4.7-.9c-5.2 0-8.8 2.6-8.8 6.4 0 2.8 2.6 4.4 4.5 5.3 2 .9 2.7 1.6 2.7 2.4 0 1.3-1.6 1.9-3.1 1.9-2.1 0-3.2-.3-4.9-1l-.7-.3-.7 4.5c1.2.5 3.5 1 5.8 1 5.5 0 9.1-2.6 9.1-6.7 0-2.2-1.4-3.9-4.4-5.3-1.8-.9-3-1.5-3-2.4 0-.8 1-1.7 3.1-1.7 1.7 0 3 .3 3.9.7l.5.2.7-4.1Zm13.4-.5h-4c-1.2 0-2.2.3-2.7 1.6l-7.7 19.2h5.5l1.1-3.1h6.7l.6 3.1H69l-4.3-20.8Zm-6.3 13.5 2.7-7.5 1.5 7.5h-4.2ZM22.9 13.8l-5.1 14.2-.6-3c-.9-3.1-3.9-6.5-7.1-8.2l4.7 17.8h5.5l8.2-20.8h-5.6Z" />
                <path fill="#F7B600" d="M13.1 13.8H4.7l-.1.4c6.5 1.6 10.8 5.4 12.6 10.8l-1.8-9.5c-.3-1.3-1.2-1.7-2.3-1.7Z" />
              </svg>
              <svg className="footer-payment-card" role="img" aria-label="Mastercard" viewBox="0 0 84 52">
                <rect width="84" height="52" rx="8" fill="#ffffff" />
                <circle cx="34" cy="26" r="13" fill="#EB001B" />
                <circle cx="50" cy="26" r="13" fill="#F79E1B" />
                <path fill="#FF5F00" d="M42 15.8A13 13 0 0 1 42 36.2a13 13 0 0 1 0-20.4Z" />
                <text x="42" y="44" textAnchor="middle" fill="#1f2937" fontSize="5.8" fontFamily="Arial, sans-serif" fontWeight="700">mastercard</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
