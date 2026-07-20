import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Flower2, Heart, Send } from 'lucide-react';
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
    { name: 'About Florentino', href: '/#about' },
    { name: 'Other Services', href: '/other-services' },
    
    
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">

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
