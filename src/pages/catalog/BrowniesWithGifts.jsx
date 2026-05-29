import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { addItemToCart } from '../../utils/cart';

const items = [
  { code: 'FLR-BWG-001', price: 4500 },
  { code: 'FLR-BWG-002', price: 5200 },
  { code: 'FLR-BWG-003', price: 6000 },
  { code: 'FLR-BWG-004', price: 6800 },
  { code: 'FLR-BWG-005', price: 4800 },
  { code: 'FLR-BWG-006', price: 5500 },
  { code: 'FLR-BWG-007', price: 6500 },
  { code: 'FLR-BWG-008', price: 7500 },
];

const BrowniesWithGifts = () => {
  const [addedCode, setAddedCode] = useState('');

  const handleAddToCart = (item) => {
    addItemToCart({
      code: item.code,
      category: 'Brownies with Gifts',
      price: item.price,
      image: '/images/placeholder.jpg',
    });
    setAddedCode(item.code);
    window.setTimeout(() => setAddedCode(''), 1400);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Brownies with Gifts</h1>
          <p className="mt-3 text-gray-600">Brownie gift sets with thoughtful add-ons.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.code} className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="relative h-48 bg-gray-200">
                <img src="" alt={item.code} className="h-full w-full object-cover" />
                <div className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
                  <Heart className="h-5 w-5 text-gray-600" />
                </div>
                <div className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-semibold text-white">
                  New
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-600">{item.code}</p>
                <p className="mt-2 text-lg font-bold text-rose-600">Rs. {item.price.toLocaleString()}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 ${addedCode === item.code ? 'cart-add-button-added' : ''}`}
                >
                  {addedCode === item.code ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                  {addedCode === item.code ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BrowniesWithGifts;

