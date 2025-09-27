import React, { useEffect, useState } from 'react';
import { Star, Heart } from 'lucide-react';

const whatsappNumber = "94702370470"; // Replace with your WhatsApp number (no +)

const GiftItems = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // Hardcoded 3 gift items
    setGifts([
      {
        id: 1,
        name: "Ballon Hampers With Flowers",
        image: "/images/ballonhamperwithbunch.jpg",
        rating: 5,
        description: "Premium assorted chocolates in elegant packaging."
      },
      {
        id: 2,
        name: "BlackRose Love",
        image: "/images/blackrosebunch.jpg",
        rating: 4.5,
        description: "Aromatic candles to create a cozy ambiance."
      },
      {
        id: 3,
        name: "Elegant Flower with Books",
        image: "/images/bookbunch.jpg",
        rating: 4,
        description: "Beautiful vase for fresh or artificial flowers."
      }
    ]);
  }, []);

  const getWhatsAppLink = (giftName) =>
    `https://wa.me/${whatsappNumber}?text=Hi%20Florentino%2C%20I'm%20interested%20in%20the%20"${encodeURIComponent(
      giftName
    )}"%20gift.%20Can%20you%20provide%20more%20details%3F`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gift Items</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated gift items perfect for every occasion.
          </p>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <a
                href={getWhatsAppLink(gift.name)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat about ${gift.name} on WhatsApp`}
              >
                <div className="relative">
                  <img 
                    src={gift.image} 
                    alt={gift.name} 
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gift.name}</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(gift.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({gift.rating})</span>
                </div>
                <p className="text-gray-600 mb-4">{gift.description}</p>
                <a
                  href={getWhatsAppLink(gift.name)}
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

export default GiftItems;
