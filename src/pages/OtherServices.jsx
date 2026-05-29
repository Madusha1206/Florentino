import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Car, Gift, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Car Surprises',
    description: 'Decorated car surprise setups for proposals, birthdays, anniversaries, and special arrivals.',
    image: '/images/services/car-surprises.jpg',
    icon: Car,
  },
  {
    title: 'Wedding Bouquets',
    description: 'Elegant bridal bouquets and floral arrangements designed to match your wedding theme.',
    image: '/images/services/wedding-bouquets.jpg',
    icon: Sparkles,
  },
  {
    title: 'Birthday Surprises',
    description: 'Personalized surprise gifts, flowers, cakes, balloons, and sweet arrangements for birthdays.',
    image: '/images/services/birthday-surprises.jpg',
    icon: Gift,
  },
  {
    title: 'Birthday Setups',
    description: 'Beautiful birthday decoration setups for homes, hotels, outdoor spaces, and intimate parties.',
    image: '/images/services/birthday-setups.jpg',
    icon: Cake,
  },
];

const OtherServices = () => {
  return (
    <main className="other-services-page">
      <section className="other-services-hero">
        <div className="other-services-hero-inner">
          <span className="other-services-eyebrow">Florentino Events</span>
          <h1>Other Services</h1>
          <p>
            Celebrate with custom surprise setups, wedding bouquets, and decorated moments made for photos,
            memories, and gifts.
          </p>
        </div>
      </section>

      <section className="other-services-grid" aria-label="Other Florentino services">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article className="service-ad-card" key={service.title}>
              <div className="service-ad-image-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-ad-image"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <div className="service-ad-image-fallback">
                  <Icon className="service-ad-fallback-icon" />
                  <span>Upload image later</span>
                </div>
              </div>

              <div className="service-ad-content">
                <div className="service-ad-icon-wrap">
                  <Icon className="service-ad-icon" />
                </div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <a
                  href={`https://wa.me/94762370470?text=${encodeURIComponent(`Hi Florentino, I want to know more about ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-ad-button"
                >
                  Ask about this service
                  <ArrowRight className="service-ad-button-icon" />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <section className="other-services-cta">
        <h2>Need a custom setup?</h2>
        <p>Tell us the occasion, date, location, and theme. We will guide you with suitable options.</p>
        <Link to="/contact" className="other-services-contact-link">
          Contact Florentino
        </Link>
      </section>
    </main>
  );
};

export default OtherServices;
