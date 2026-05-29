import React, { useMemo, useState } from 'react';
import { Check, Heart, Search, ShoppingCart } from 'lucide-react';
import { addItemToCart } from '../utils/cart';

const catalogItems = [
  { code: 'FLR-001',  image: '/images/Events.jpg', price: 0 },
  { code: 'FLR-002',  image: '/images/wedding2.jpg', price: 0 },
  { code: 'FLR-003',  image: '/images/wedding3.jpg', price: 0 },
  { code: 'FLR-004',  image: '/images/wedding4.jpg', price: 0 },
  { code: 'FLR-005', image: '/images/wedding5.jpg', price: 0 },
  { code: 'FLR-006',  image: '/images/wedding2.jpg', price: 0 },
  { code: 'FLR-007', name: 'Happy Birthday Bouquet', price: 5800, image: '/images/firebunch1.jpg' },
  { code: 'FLR-008',  name: 'Colorful Birthday Mix', price: 10500, image: '/images/facialbunch.jpg' },
  { code: 'FLR-009', name: 'Book Bunch', price: 8800, image: '/images/bookbunch.jpg' },
  { code: 'FLR-010',  name: 'Anniversary Mix Bouquet', price: 5600, image: '/images/mixroses.jpg' },
  { code: 'FLR-011',  name: 'Romantic Red Roses', price: 3500, image: '/images/redroseonly.jpg' },
  { code: 'FLR-012', category: 'Anniversary', name: 'Anniversary Special', price: 4800, image: '/images/mixbunch5.jpg' },
  { code: 'FLR-013', category: 'Graduation', name: 'Graduation Congratulations', price: 4500, image: '/images/mixbunch5.jpg' },
  { code: 'FLR-014', category: 'Graduation', name: 'Success Celebration', price: 7800, image: '/images/firebunch1.jpg' },
  { code: 'FLR-015', category: 'Graduation', name: 'Achievement Bouquet', price: 5800, image: '/images/mixbunch3.jpg' },
  { code: 'FLR-016', category: 'Love & Romance', name: 'Love You Bouquet', price: 5200, image: '/images/mixbunch5.jpg' },
  { code: 'FLR-017', category: 'Love & Romance', name: 'Romantic Gesture', price: 52000, image: '/images/largerosebunch.jpg' },
  { code: 'FLR-018', category: 'Love & Romance', name: 'Passionate Roses', price: 3500, image: '/images/blackrosebunch.jpg' },
  { code: 'FLR-019', category: 'Gift Items', price: 7000, image: '/images/chocobunch1.jpg' },
  { code: 'FLR-020', category: 'Gift Items', price: 14800, image: '/images/Moneybunches.jpg' },
  { code: 'FLR-021', category: 'Gift Items', price: 27000, image: '/images/ballonhamperwithbunch.jpg' },
];

const categories = ['All', ...new Set(catalogItems.map((item) => item.category))];

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedCode, setAddedCode] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return catalogItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = !query || `${item.code} ${item.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

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
              placeholder="Search by item code or category"
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-800 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </label>
        </div>

        {/* Category filter removed per user request */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.code} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative">
                <img src={item.image} alt={`Florentino item ${item.code}`} className="h-64 w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-rose-700 shadow-sm">
                  {item.category}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md">
                  <Heart className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold text-gray-800">Item Code: {item.code}</h2>
                {item.price !== undefined && <p className="mt-3 text-lg font-bold text-rose-600">Rs. {item.price.toLocaleString()}</p>}
                <div className="mt-3 flex-1" />
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-rose-700 ${addedCode === item.code ? 'cart-add-button-added' : ''}`}
                >
                  {addedCode === item.code ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                  {addedCode === item.code ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center text-gray-600 shadow">
            No catalog items match your search.
          </div>
        )}
      </section>
    </main>
  );
};

export default Catalog;
