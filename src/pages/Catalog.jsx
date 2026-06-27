import React, { useMemo, useState } from 'react';
import { Check, Heart, ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { addItemToCart } from '../utils/cart';
import { catalogItems } from '../data/catalogItems';

const categories = ['All', ...new Set(catalogItems.map((item) => item.category))];

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [addedCode, setAddedCode] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const compactQuery = query.replace(/[,\s]/g, '');
    return catalogItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const priceText = String(item.price ?? '');
      const matchesSearch =
        !query ||
        `${item.code} ${item.category} ${priceText}`.toLowerCase().includes(query) ||
        priceText.includes(compactQuery);
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
        <div className="mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Florentino Catalog</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Search from the header by item code or price, add the required items to cart, and send the cart to WhatsApp.
            </p>
            <p>අවශ්‍ය items ඒවායේ කේතය අනුව තෝරන්න, ඉන්පසු ඒවා cart එකට එකතු කර WhatsApp හරහා අපට එවන්න.</p>
          </div>
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
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
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
