import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const address = 'No 67/E Jayanthi Mawatha, Biyagama, Sri Lanka.';
const mapUrl =
  'https://www.google.com/maps?q=No%2067%2FE%20Jayanthi%20Mawatha%2C%20Biyagama%2C%20Sri%20Lanka&output=embed';
const directionsUrl = 'https://maps.app.goo.gl/RLWsGtJqfGm78okt8';

const Contact = () => (
  <main className="contact-location-page">
    <section className="contact-location-hero" aria-labelledby="contact-location-heading">
      <div className="contact-location-intro">
        <h1 id="contact-location-heading" className="sr-only">Contact Florentino</h1>
      </div>
    </section>

    <section className="contact-location-shell" aria-label="Florentino contact information">
      <div className="contact-location-details">
        <p className="contact-location-kicker">Florentino.Biyagama</p>
        <h2>Contact us</h2>
        <p className="contact-location-copy">
          Reach us directly or visit our studio using the map. We recommend messaging
          before your visit for custom orders and event consultations.
        </p>

        <address className="contact-location-list">
          <div className="contact-location-card">
            <span className="contact-location-icon"><MapPin aria-hidden="true" /></span>
            <span>
              <strong>Shop address</strong>
              {address}
            </span>
          </div>
          <div className="contact-location-card">
            <span className="contact-location-icon"><Phone aria-hidden="true" /></span>
            <span>
              <strong>Call us</strong>
              +94 76 237 0470
            </span>
          </div>
          <div className="contact-location-card">
            <span className="contact-location-icon"><Mail aria-hidden="true" /></span>
            <span>
              <strong>Email us</strong>
              florentinoflorist@gmail.com
            </span>
          </div>

        </address>


      </div>

      <div className="contact-location-map">
        <div className="contact-location-map-label">
          <span>Find us in Biyagama area</span>
          <a href={directionsUrl} target="_blank" rel="noreferrer">Open directions</a>
        </div>
        <iframe
          src={mapUrl}
          title="Florentino location at No 67/1 Jayanthi Mawatha, Biyagama"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  </main>
);

export default Contact;
