import React from 'react';
import { Heart } from 'lucide-react';

const whatsappNumber = "94702370470"; 

const WeddingBouquets = () => {
  const bouquets = [
    { id: 1, code: 'FLR-001', image: '/images/Events.jpg', price: 6500 },
    { id: 2, code: 'FLR-002', image: '/images/wedding2.jpg', price: 7200 },
    { id: 3, code: 'FLR-003', image: '/images/wedding3.jpg', price: 5800 },
    { id: 4, code: 'FLR-004', image: '/images/wedding4.jpg', price: 8000 },
    { id: 5, code: 'FLR-005', image: '/images/wedding5.jpg', price: 5400 },
    { id: 6, code: 'FLR-006', image: '/images/wedding2.jpg', price: 9000 }
  ];

  // Helper to create WhatsApp link for each bouquet
  const getWhatsAppLink = (bouquetCode) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hi Florentino, I'm interested in item ${bouquetCode} wedding bouquet. Can you tell me more?`
    )}`;

  return (
    <div id="weddingbouquets" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4"></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make your special day unforgettable with our stunning collection of bridal bouquets, 
            crafted with love and attention to every detail.
          </p>
        </div>

        {/* Bouquets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {bouquets.map((bouquet) => (
            <div key={bouquet.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <a
                href={getWhatsAppLink(bouquet.code)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat about ${bouquet.code} on WhatsApp`}
              >
                <div className="relative">
                  <img 
                    src={bouquet.image} 
                    alt={bouquet.code}
                    className="w-full h-64 object-cover cursor-pointer"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors">
                      <Heart className="h-5 w-5 text-gray-600 hover:text-rose-600" />
                    </button>
                  </div>
                </div>
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Item Code: {bouquet.code}</h3>
                <p className="text-lg font-bold text-rose-600 mb-4">Rs. {bouquet.price.toLocaleString()}</p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Florentino, I want to know more about item ${bouquet.code}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg font-semibold transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default WeddingBouquets;