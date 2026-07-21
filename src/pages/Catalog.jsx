import React, { useMemo } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartItemToggle } from '../hooks/useCartItemToggle';
import { catalogItems } from '../data/catalogItems';
import { getCategoryPath } from '../data/categoryPaths';

const formatPrice = (price) => (price === undefined ? 'Rs.' : `Rs. ${price.toLocaleString()}`);

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const { isInCart, toggleCartItem } = useCartItemToggle();

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const compactQuery = query.replace(/[,\s]/g, '');
    return catalogItems.filter((item) => {
      const priceText = String(item.price ?? '');
      const matchesSearch =
        !query ||
        `${item.code} ${item.category} ${priceText}`.toLowerCase().includes(query) ||
        priceText.includes(compactQuery);
      return matchesSearch;
    });
  }, [searchTerm]);

  const handleAddToCart = (item) => {
    toggleCartItem({
      code: item.code,
      category: item.category,
      price: item.price || 0,
      image: item.image,
    });
  };

  return (
    <main className="catalog-page min-h-screen bg-gray-50 py-10">
      <section className="catalog-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="catalog-hero-panel mb-8">
          <div>
            
            <h1 className="catalog-title text-4xl font-bold text-gray-900">Florentino Catalog</h1>
            <p className="catalog-intro mt-3 max-w-2xl text-lg text-gray-600">
              All our high rated items are displaying in here or you can search by item code or price.
            </p>
            <p className="catalog-local-copy">
              ඔබ කැමති අයිතම තෝරා, cart එකට එකතු කර, WhatsApp හරහා අප සමඟ ඇණවුම බෙදා ගන්න.
            </p>
          </div>
        </div>

        <div className="catalog-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => {
            const isAdded = isInCart(item.code);

            return (
              <article key={item.code} className="catalog-card flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <img src={item.image} alt={`Florentino item ${item.code}`} className="h-full w-full object-contain" />
                  <Link
                    to={getCategoryPath(item.category)}
                    className="catalog-chip absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-rose-700 shadow-sm"
                    aria-label={`View all ${item.category}`}
                  >
                    {item.category}
                  </Link>
                </div>

                <div className="flex flex-col p-4">
                  <h2 className="text-base font-semibold text-gray-800">Item Code: {item.code}</h2>
                  <p className="product-price mt-1 text-sm font-bold">Price: {formatPrice(item.price)}</p>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    aria-pressed={isAdded}
                    className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 ${isAdded ? 'cart-add-button-added' : ''}`}
                  >
                    {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    {isAdded ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </article>
            );
          })}
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
