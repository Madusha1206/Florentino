import React from 'react';
import { Check, Heart, ShoppingCart } from 'lucide-react';
import { addItemToCart } from '../../utils/cart';
import { useCartItemToggle } from '../../hooks/useCartItemToggle';
import { getCatalogItemsByCategory } from '../../data/catalogItems';

const fallbackDescriptions = {
  'Balloon Hampers': 'Balloon hampers for birthdays, celebrations, and surprise gifting.',
  'Balloon Hampers with Gifts': 'Festive balloon hampers paired with premium gift items.',
  'Brownies': 'Delicious brownies for gifts and celebrations.',
  'Brownies with Gifts': 'Brownie gift sets with thoughtful add-ons.',
  'Cake with Flower Bunch': 'Cake and flower combinations for special occasions.',
  Cakes: 'We will customize your own cake to suit your occasion.',
  'Flower Bunches': 'Beautiful flower bunches for any celebration.',
  'Money Bunches': 'Stylish money bunches for special occasions.',
  'Rose Bunches': 'Elegant rose bunches for every occasion.',
  Teddies: 'Adorable teddy bear gift sets for special moments.',
  'Wedding Bouquets': 'Wedding bouquets and event floral arrangements.',
};

const formatPrice = (price) => (price === undefined ? 'Contact for price' : `Rs. ${price.toLocaleString()}`);

const CategoryPage = ({ title, category = title, description = fallbackDescriptions[category] }) => {
  const items = getCatalogItemsByCategory(category);
  const { isInCart } = useCartItemToggle();

  const handleAddToCart = (item) => {
    if (isInCart(item.code)) return;

    addItemToCart({
      code: item.code,
      category: item.category,
      price: item.price || 0,
      image: item.image,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          {description && <p className="mt-3 text-gray-600">{description}</p>}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const isAdded = isInCart(item.code);

            return (
              <article key={item.code} className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={`Florentino item ${item.code}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </div>
                </div>

                <div className="flex flex-col p-4">
                  <h2 className="text-base font-semibold text-gray-800">Item Code: {item.code}</h2>
                  <p className="mt-1 text-sm font-bold text-rose-600">Price: {formatPrice(item.price)}</p>
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
