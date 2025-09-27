import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Heart } from 'lucide-react';
import { getGiftItems } from '../API';

const GiftItems = ({ onRequireLogin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status (e.g., by checking localStorage for a token)
    setIsLoggedIn(!!localStorage.getItem('token'));

    const loadProducts = async () => {
      try {
        const data = await getGiftItems();
        setProducts(data.length ? data : [
          {
            id: 1,
            name: "Test Gift",
            description: "This is a test gift.",
            image: "https://via.placeholder.com/150",
            price: "$10",
            priceValue: 10,
            rating: 5,
            reviews: 1,
            isPopular: true
          }
        ]);
      } catch (error) {
        console.error('Error loading gift items:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      if (onRequireLogin) onRequireLogin();
      else alert('Please login or signup to buy items.');
      return;
    }
    // Proceed with add to cart logic...
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'under-50' && product.priceValue < 50) ||
      (priceFilter === '50-100' && product.priceValue >= 50 && product.priceValue <= 100) ||
      (priceFilter === 'over-100' && product.priceValue > 100);
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gift items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ...existing header, search, filter... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* ...image, details... */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                {/* ...rating, description... */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-rose-600">{product.price}</span>
                  <button
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ...newsletter, etc... */}
      </div>
    </div>
  );
};

export default GiftItems;