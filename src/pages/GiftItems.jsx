import React, { useEffect, useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';


const GiftItems = () => {
  const [gifts, setGifts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Hardcoded gifts (now with price)
    setGifts([
      {
        id: 1,
        name: "Ballon Hampers With Flowers",
        image: "/images/ballonhamperwithbunch.jpg",
        rating: 5,
        price: 4500,
        description: "Premium assorted chocolates in elegant packing."
      },
      {
        id: 2,
        name: "BlackRose Love",
        image: "/images/blackrosebunch.jpg",
        rating: 4.5,
        price: 3200,
        description: "Aromatic candles to create a cozy ambiance."
      },
      {
        id: 3,
        name: "Elegant Flower with Books",
        image: "/images/bookbunch.jpg",
        rating: 4,
        price: 3900,
        description: "Beautiful vase for fresh or artificial flowers."
      }
    ]);
  }, []);
  

  // Add to Cart handler
  const handleAddToCart = (gift) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === gift.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...gift, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gift Items</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated gift items perfect for every occasion.
          </p>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <div 
              key={gift.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={gift.image} 
                  alt={gift.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-rose-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gift.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(gift.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({gift.rating})</span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-rose-600 mb-2">Rs. {gift.price.toLocaleString()}</p>

                {/* Description */}
                <p className="text-gray-600 mb-4">{gift.description}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(gift)}
                  className="flex items-center justify-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between border-b py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-semibold text-lg">
              <span>Total:</span>
              <span>
                Rs. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftItems;
