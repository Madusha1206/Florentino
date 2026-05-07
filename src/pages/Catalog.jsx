import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, Search, ShoppingCart } from 'lucide-react';
import { addItemToCart, getStoredCart } from '../utils/cart';

const catalogSections = [
  {
    id: 'ballon-hampers',
    title: 'Ballon Hampers',
    items: [
      { code: 'FLR-001', name: 'Classic White Rose Bouquet', price: 1240, image: '/images/Events.jpg' },
      { code: 'FLR-002', name: 'Autumn Blossom Bouquet', price: 4561, image: '/images/wedding2.jpg' },
      { code: 'FLR-003', name: 'Garden Style Bouquet', price: 1230, image: '/images/wedding3.jpg' },
    ],
  },
  {
    id: 'ballon-hampers-with-gifts',
    title: 'Ballon Hampers with Gifts',
    items: [
      { code: 'FLR-004', name: 'Blush & Ivory Bouquet', price: 7850, image: '/images/wedding4.jpg' },
      { code: 'FLR-005', name: 'Wildflower Bouquet', price: 7820, image: '/images/wedding5.jpg' },
      { code: 'FLR-006', name: 'Royal Purple Bouquet', price: 4200, image: '/images/wedding2.jpg' },
    ],
  },
  {
    id: 'rose-bunches',
    title: 'Rose Bunches',
    items: [
      { code: 'FLR-007', name: 'Happy Birthday Bouquet', price: 5800, image: '/images/firebunch1.jpg' },
      { code: 'FLR-008', name: 'Colorful Birthday Mix', price: 10500, image: '/images/facialbunch.jpg' },
      { code: 'FLR-009', name: 'Book Bunch', price: 8800, image: '/images/bookbunch.jpg' },
    ],
  },
  {
    id: 'flower-bunches',
    title: 'Flower Bunches',
    items: [
      { code: 'FLR-010', name: 'Anniversary Mix Bouquet', price: 5600, image: '/images/mixroses.jpg' },
      { code: 'FLR-011', name: 'Romantic Red Roses', price: 3500, image: '/images/redroseonly.jpg' },
      { code: 'FLR-012', name: 'Anniversary Special', price: 4800, image: '/images/mixbunch5.jpg' },
    ],
  },
  {
    id: 'cake-with-flower-bunch',
    title: 'Cake with Flower Bunch',
    items: [
      { code: 'FLR-013', name: 'Graduation Congratulations', price: 4500, image: '/images/mixbunch5.jpg' },
      { code: 'FLR-014', name: 'Success Celebration', price: 7800, image: '/images/firebunch1.jpg' },
    ],
  },
  {
    id: 'cakes',
    title: 'Cakes',
    items: [
      { code: 'FLR-015', name: 'Achievement Bouquet', price: 5800, image: '/images/mixbunch3.jpg' },
      { code: 'FLR-016', name: 'Love You Bouquet', price: 5200, image: '/images/mixbunch5.jpg' },
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    items: [
      { code: 'FLR-017', name: 'Romantic Gesture', price: 52000, image: '/images/largerosebunch.jpg' },
    ],
  },
  {
    id: 'brownies-with-gifts',
    title: 'Brownies with Gifts',
    items: [
      { code: 'FLR-018', name: 'Passionate Roses', price: 3500, image: '/images/blackrosebunch.jpg' },
    ],
  },
  {
    id: 'teddies',
    title: 'Teddies',
    items: [
      { code: 'FLR-019', name: 'Choco Bunch', price: 7000, image: '/images/chocobunch1.jpg' },
    ],
  },
  {
    id: 'chocolate-bar',
    title: 'Chocolate Bar',
    items: [
      { code: 'FLR-020', name: 'Money Bunches', price: 14800, image: '/images/Moneybunches.jpg' },
    ],
  },
  {
    id: 'money-bunches',
    title: 'Money Bunches',
    items: [
      { code: 'FLR-021', name: 'Balloon Hampers With Flowers', price: 27000, image: '/images/ballonhamperwithbunch.jpg' },
    ],
  },
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCodes, setCartCodes] = useState(() => new Set(getStoredCart().map((item) => item.code)));

  useEffect(() => {
    const syncCartCodes = () => {
      setCartCodes(new Set(getStoredCart().map((item) => item.code)));
    };

    window.addEventListener('cart:update', syncCartCodes);
    window.addEventListener('storage', syncCartCodes);
    return () => {
      window.removeEventListener('cart:update', syncCartCodes);
      window.removeEventListener('storage', syncCartCodes);
    };
  }, []);

  const filteredSections = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return catalogSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          !query || `${section.title} ${item.code} ${item.name}`.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchTerm]);

  const handleAddToCart = (item) => {
    addItemToCart({
      code: item.code,
      name: item.name,
      price: item.price || 0,
      image: item.image,
    });
    setCartCodes(new Set(getStoredCart().map((cartItem) => cartItem.code)));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Florentino Catalog</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Browse by item code, add the required items to cart, and send the cart to WhatsApp.
            </p>
          </div>

          <label className="relative block w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by item code"
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-800 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </label>
        </div>

        <div className="space-y-12">
          {filteredSections.map((section) => (
            <section key={section.title} id={section.id} className="scroll-mt-32">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">{section.title}</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <article key={item.code} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative">
                      <img src={item.image} alt={`Florentino item ${item.code}`} className="h-64 w-full object-cover" />
                      <div className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold text-gray-800">Item Code: {item.code}</h3>
                      {item.price && <p className="mt-3 text-lg font-bold text-rose-600">Rs. {item.price.toLocaleString()}</p>}
                      <div className="flex-1" />
                      {cartCodes.has(item.code) ? (
                        <Link
                          to="/cart"
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                        >
                          <Check className="h-5 w-5" />
                          Added
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center text-gray-600 shadow">
            No catalog items match your search.
          </div>
        )}
      </section>
    </main>
  );
};

export default Catalog;
