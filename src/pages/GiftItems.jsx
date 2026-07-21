import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const whatsappNumber = '94702370470';

const GiftItems = () => {
  const [gifts] = useState([
    { id: 1, code: 'FLR-019', image: '/images/BrowniesWithGifts/BRG1.JPG', price: undefined },
    { id: 2, code: 'FLR-020', image: '/images/MoneyBunches/IMG_3465.jpg', price: undefined },
    { id: 3, code: 'FLR-021', image: '/images/BallonHampersWithGifts/BG1.jpg', price: undefined },
  ]);
  const getWhatsAppLink = (gift) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Florentino, I want to know more about item ${gift.code}.`)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
         
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore our curated gift items perfect for every occasion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.length === 0 ? (
            <p>No gifts available.</p>
          ) : (
            gifts.map((gift) => (
              <div key={gift.id || gift._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="relative">
                  <img src={gift.image} alt={gift.code} className="w-full h-64 object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Item Code: {gift.code}</h3>
                  <p className="product-price text-lg font-bold mb-2">Rs.</p>
                  <a
                    href={getWhatsAppLink(gift)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" /> Inquire on WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default GiftItems;
