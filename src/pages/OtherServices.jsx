import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Car, Gift, Sparkles, X } from 'lucide-react';

const services = [
  {
    title: 'Car Surprises',
    description: 'Decorated car surprise setups for proposals, birthdays, anniversaries, and special arrivals.',
    video: '/videos/carvid1.mp4',
    icon: Car,
  },
  {
    title: 'Wedding Bouquets',
    description: 'Elegant bridal bouquets and floral arrangements designed to match your wedding theme.',
    image: '/images/services/IMG_8617.jpg',
    icon: Sparkles,
  },
  {
    title: 'Money Bunches',
    description: 'Do you need a different type of surprise?',
    image: '/images/MoneyBunches/IMG_3465.jpg',
    icon: Gift,
  },
  {
    title: 'Birthday Setups',
    description: 'Beautiful birthday decoration setups for homes, hotels, outdoor spaces, and intimate parties.',
    image: '/images/services/IMG_8595.jpg',
    icon: Cake,
  },
];

const birthdaySetupItems = [
  { code: 'BS-001', price: 'Price on request', image: '/images/BirthdaySetups/BS1.JPG' },
  { code: 'BS-002', price: 'Price on request', image: '/images/BirthdaySetups/BS2.HEIC' },
  { code: 'BS-003', price: 'Price on request', image: '/images/BirthdaySetups/BS3.JPG' },
  { code: 'BS-004', price: 'Price on request', image: '/images/BirthdaySetups/BS4.JPG' },
  { code: 'BS-005', price: 'Price on request', image: '/images/BirthdaySetups/BS5.JPG' },
  { code: 'BS-006', price: 'Price on request', image: '/images/BirthdaySetups/BS6.JPG' },
];

const OtherServices = () => {
  const [showCarSurpriseDetails, setShowCarSurpriseDetails] = useState(false);
  const [showMoneyBunchDetails, setShowMoneyBunchDetails] = useState(false);
  const [showBirthdaySetupDetails, setShowBirthdaySetupDetails] = useState(false);
  const carSurpriseMessage = `Hi Florentino, I want to know more about Car Surprises.`;
  const moneyBunchMessage = `Hi Florentino, I want to know more about Money Bunches.`;
  const birthdaySetupMessage = `Hi Florentino, I want to know more about Birthday Setups.`;

  return (
    <main className="other-services-page">
      <section className="other-services-hero">
        <div className="other-services-hero-inner">
          <span className="other-services-eyebrow">Florentino Events</span>
          <h1>Florentino Events</h1>
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
                {service.video ? (
                  <video
                    src={service.video}
                    className="service-ad-video"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${service.title} video`}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                ) : service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-ad-image"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
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
                {service.title === 'Car Surprises' ? (
                  <button
                    type="button"
                    className="service-ad-button"
                    onClick={() => setShowCarSurpriseDetails(true)}
                  >
                    Explore
                    <ArrowRight className="service-ad-button-icon" />
                  </button>
                ) : service.title === 'Money Bunches' ? (
                  <button
                    type="button"
                    className="service-ad-button"
                    onClick={() => setShowMoneyBunchDetails(true)}
                  >
                    Explore
                    <ArrowRight className="service-ad-button-icon" />
                  </button>
                ) : service.title === 'Birthday Setups' ? (
                  <button
                    type='button'
                    className='service-ad-button'
                    onClick={() => setShowBirthdaySetupDetails(true)}
                  >
                    Explore
                    <ArrowRight className='service-ad-button-icon' />
                  </button>
                ) : (
                  <a
                    href={`https://wa.me/94762370470?text=${encodeURIComponent(`Hi Florentino, I want to know more about ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-ad-button"
                  >
                    Explore
                    <ArrowRight className="service-ad-button-icon" />
                  </a>
                )}
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

      {showCarSurpriseDetails && (
        <div
          className="service-modal-backdrop"
          role="presentation"
          onClick={() => setShowCarSurpriseDetails(false)}
        >
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="car-surprise-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              aria-label="Close car surprise details"
              onClick={() => setShowCarSurpriseDetails(false)}
            >
              <X className="service-modal-close-icon" />
            </button>

            <div className="service-modal-header">
              <span className="service-modal-eyebrow">Price list</span>
              <h2 id="car-surprise-title">Car Surprise Details</h2>
              <p>Order should be confirmed before 5 days. Delivery charge depends on your location.</p>
            </div>

            <div className="service-price-list">
              <section className="service-price-section">
                <h3>Transport</h3>
                <p>Transport charge changes depending on your location.</p>
              </section>

              <section className="service-price-section">
                <h3>Cake</h3>
                <ul>
                  <li>1kg - Rs. 6,800</li>
                  <li>500g - Rs. 3,500</li>
                </ul>
                <p>Price changes depending on the design.</p>
              </section>

              <section className="service-price-section">
                <h3>Flowers</h3>
                <p>Starting from Rs. 1,500.</p>
              </section>

              <section className="service-price-section">
                <h3>Photo frame</h3>
                <p>12x18 - Rs. 4,800</p>
              </section>

              <section className="service-price-section">
                <h3>Chocolate box</h3>
                <p>Starting from Rs. 4,500.</p>
              </section>

              <section className="service-price-section">
                <h3>Fire works</h3>
                <ul>
                  <li>Rs. 5,500 - අහස් කූරු 50, ටින් 1, Shell 1</li>
                  <li>Rs. 6,500 - අහස් කූරු 100, ටින් 1, Shell 1</li>
                  <li>Rs. 8,000 - අහස් කූරු 100, ටින් 1, Shell 2</li>
                </ul>
              </section>

              <section className="service-price-section">
                <h3>Car decorations - Rs. 4,000</h3>
                <ul>
                  <li>Lighting</li>
                  <li>Carpet</li>
                  <li>Birthday candle</li>
                  <li>Balloons</li>
                  <li>Music</li>
                  <li>Shine board</li>
                </ul>
              </section>
            </div>

            <div className="service-modal-note">
              <p>දවස් 5 කට කලින් order එක confirm කරන්න ඕන.</p>
              <p>Deliver charge එක ඔයාලගේ location එක අනුව වෙනස් වේ.</p>
              <p>Order should be confirmed before 5 days.</p>
              <p>Deliver charge will depend on your location.</p>
              <p>Thank you for contacting us. Have a nice day.</p>
            </div>

            <a
              href={`https://wa.me/94762370470?text=${encodeURIComponent(carSurpriseMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-modal-whatsapp"
            >
              Continue on WhatsApp
              <ArrowRight className="service-ad-button-icon" />
            </a>
          </section>
        </div>
      )}

      {showMoneyBunchDetails && (
        <div
          className="service-modal-backdrop"
          role="presentation"
          onClick={() => setShowMoneyBunchDetails(false)}
        >
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="money-bunch-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              aria-label="Close money bunch details"
              onClick={() => setShowMoneyBunchDetails(false)}
            >
              <X className="service-modal-close-icon" />
            </button>

            <div className="service-modal-header">
              <span className="service-modal-eyebrow">Price list</span>
              <h2 id="money-bunch-title">Money Bunch Details</h2>
              <p>Order should be confirmed before 5 days. Delivery charge depends on your location.</p>
            </div>

            <div className="service-price-list">
              <section className="service-price-section">
                <h3>Rs. 5,000 + Rs. 2,500</h3>
                <p>100 only</p>
              </section>

              <section className="service-price-section">
                <h3>Rs. 10,000 + Rs. 4,800</h3>
                <p>100 only</p>
              </section>

              <section className="service-price-section">
                <h3>Rs. 15,000 + Rs. 5,300</h3>
              </section>

              <section className="service-price-section">
                <h3>Rs. 20,000 + Rs. 6,000</h3>
              </section>

              <section className="service-price-section">
                <h3>Rs. 25,000 + Rs. 6,500</h3>
              </section>

              <section className="service-price-section">
                <h3>Rs. 30,000 + Rs. 7,500</h3>
              </section>

              <section className="service-price-section">
                <h3>Rs. 50,000 + Rs. 8,500</h3>
              </section>
            </div>

            <div className="service-modal-note">
              <p>දවස් 5 කට කලින් order එක confirm කරන්න ඕන.</p>
              <p>Deliver charge එක ඔයාලගේ location එක අනුව වෙනස් වේ.</p>
              <p>Order should be confirmed before 5 days.</p>
              <p>Deliver charge will depend on your location.</p>
              <p>Thank you for contacting us. Have a nice day.</p>
            </div>

            <a
              href={`https://wa.me/94762370470?text=${encodeURIComponent(moneyBunchMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-modal-whatsapp"
            >
              Continue on WhatsApp
              <ArrowRight className="service-ad-button-icon" />
            </a>
          </section>
        </div>
      )}
      {showBirthdaySetupDetails && (
        <div
          className='service-modal-backdrop'
          role='presentation'
          onClick={() => setShowBirthdaySetupDetails(false)}
        >
          <section
            className='service-modal service-modal-gallery'
            role='dialog'
            aria-modal='true'
            aria-labelledby='birthday-setup-title'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              className='service-modal-close'
              aria-label='Close birthday setup gallery'
              onClick={() => setShowBirthdaySetupDetails(false)}
            >
              <X className='service-modal-close-icon' />
            </button>

            <div className='service-modal-header'>
              <span className='service-modal-eyebrow'>Birthday collection</span>
              <h2 id='birthday-setup-title'>Birthday Setup Gallery</h2>
              <p>Choose a setup code and contact us for the current price and available customizations.</p>
            </div>

            <div className='birthday-setup-grid'>
              {birthdaySetupItems.map((item) => (
                <article className='birthday-setup-item' key={item.code}>
                  <img
                    src={item.image}
                    alt={item.code + ' birthday setup'}
                    className='birthday-setup-image'
                    loading='lazy'
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/images/services/IMG_8595.jpg';
                    }}
                  />
                  <div className='birthday-setup-info'>
                    <span className='birthday-setup-code'>Code: {item.code}</span>
                    <strong>{item.price}</strong>
                  </div>
                </article>
              ))}
            </div>

            <a
              href={'https://wa.me/94762370470?text=' + encodeURIComponent(birthdaySetupMessage)}
              target='_blank'
              rel='noopener noreferrer'
              className='service-modal-whatsapp'
            >
              Ask for prices on WhatsApp
              <ArrowRight className='service-ad-button-icon' />
            </a>
          </section>
        </div>
      )}
    </main>
  );
};

export default OtherServices;
