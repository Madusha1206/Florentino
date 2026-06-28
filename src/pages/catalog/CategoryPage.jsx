import React, { useState } from 'react';
import { Check, Heart, ShoppingCart } from 'lucide-react';
import { addItemToCart } from '../../utils/cart';
import { getCatalogItemsByCategory } from '../../data/catalogItems';

const fallbackDescriptions = {
  'Balloon Hampers': 'Balloon hampers for birthdays, celebrations, and surprise gifting.',
  'Balloon Hampers with Gifts': 'Festive balloon hampers paired with premium gift items.',
  'Brownies': 'Delicious brownies for gifts and celebrations.',
  'Brownies with Gifts': 'Brownie gift sets with thoughtful add-ons.',
  'Cake with Flower Bunch': 'Cake and flower combinations for special occasions.',
  Cakes: 'Freshly baked cakes for every celebration.',
  'Flower Bunches': 'Beautiful flower bunches for any celebration.',
  'Money Bunches': 'Stylish money bunches for special occasions.',
  'Rose Bunches': 'Elegant rose bunches for every occasion.',
  Teddies: 'Adorable teddy bear gift sets for special moments.',
  'Wedding Bouquets': 'Wedding bouquets and event floral arrangements.',
};

const CategoryPage = ({ title, category = title, description = fallbackDescriptions[category] }) => {
  const [addedCode, setAddedCode] = useState('');
  const items = getCatalogItemsByCategory(category);

  const handleAddToCart = (item) => {
    addItemToCart({
      code: item.code,
      category: item.category,
      price: item.price || 0,
      image: item.image,
    });
    setAddedCode(item.code);
    window.setTimeout(() => setAddedCode(''), 1400);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          {description && <p className="mt-3 text-gray-600">{description}</p>}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.code} className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="relative h-72 bg-gray-200">
                <img src={item.image} alt={item.code} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
                  <Heart className="h-5 w-5 text-gray-600" />
                </div>
                <div className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-semibold text-white">
                  {item.code}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-600">{item.code}</p>
                {item.price !== undefined && (
                  <p className="mt-2 text-lg font-bold text-rose-600">Rs. {item.price.toLocaleString()}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 ${addedCode === item.code ? 'cart-add-button-added' : ''}`}
                >
                  {addedCode === item.code ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                  {addedCode === item.code ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center text-gray-600 shadow">
            No items have been added to this category yet.
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
