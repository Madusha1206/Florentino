import React from 'react';
import { useCartItemToggle } from '../../hooks/useCartItemToggle';
import { getCatalogItemsByCategory } from '../../data/catalogItems';
import ProductCartButton from '../../components/ProductCartButton';

const formatPrice = (price) => (price === undefined ? 'Rs.' : 'Rs. ' + price.toLocaleString());

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

const CategoryPage = ({ title, category = title, description = fallbackDescriptions[category] }) => {
  const items = getCatalogItemsByCategory(category);
  const { isInCart, toggleCartItem } = useCartItemToggle();

  const handleAddToCart = (item) => {
    toggleCartItem({
      code: item.code,
      category: item.category,
      price: item.price || 0,
      image: item.image,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="catalog-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="category-page-title text-4xl font-bold text-gray-900">{title}</h1>
          {description && <p className="category-page-description mt-3 text-gray-600">{description}</p>}
        </div>

        <div className="catalog-grid grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {items.map((item) => {
            const isAdded = isInCart(item.code);

            return (
              <article key={item.code} className="catalog-card group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:-translate-y-1">
                <div className="catalog-card-image relative aspect-[4/5] overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={`Florentino item ${item.code}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="catalog-card-details flex flex-col p-4">
                  <h2 className="text-base font-semibold text-gray-800">Item Code: {item.code}</h2>
                  <p className="product-price mt-1 text-sm font-bold">Price: {formatPrice(item.price)}</p>
                  <ProductCartButton
                    isAdded={isAdded}
                    onClick={() => handleAddToCart(item)}
                    itemCode={item.code}
                  />
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
