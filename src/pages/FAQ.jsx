import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer:
      'You can place an order through the catalog by selecting your favorite item and sending the order details to Florentino on WhatsApp.',
  },
  {
    question: 'What are the delivery areas in Sri Lanka?',
    answer:
      'Islandwide delivery is available. Delivery options and timing can change depending on the city, order type, and delivery date.',
  },
  {
    question: 'What are the delivery charges?',
    answer:
      'Delivery charges depend on the location and item size. Contact us on WhatsApp with your delivery address for the exact charge.',
  },
  {
    question: 'Can I schedule a delivery for a specific date?',
    answer:
      'Yes. You can schedule deliveries for birthdays, anniversaries, weddings, and other special dates. Early booking is recommended.',
  },
  {
    question: 'Do you offer same-day delivery?',
    answer:
      'Same-day delivery may be available for selected products and nearby areas, depending on stock and order time.',
  },
  {
    question: 'Are the flowers fresh?',
    answer:
      'Yes. Florentino prepares floral gifts with fresh flowers and suitable packaging so they arrive beautifully.',
  },
  {
    question: 'Can I customize a bouquet or surprise setup?',
    answer:
      'Yes. You can request colors, flower types, message cards, balloons, cakes, and other add-ons based on availability.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <h1>FAQS</h1>
        
      </section>

      <section className="faq-list" aria-label="Frequently asked questions">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article className={`faq-item ${isOpen ? 'faq-item-open' : ''}`} key={faq.question}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{index + 1}. {faq.question}</span>
                {isOpen ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default FAQ;
