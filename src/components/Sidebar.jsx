import React from 'react';
import { Star, Heart } from 'lucide-react';

const Sidebar = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Rose Bouquet',
      price: '$45',
      image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      id: 2,
      name: 'Wedding Centerpiece',
      price: '$120',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      id: 3,
      name: 'Spring Mix',
      price: '$35',
      image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4
    }
  ];

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Featured Products</h3>
      
      <div className="space-y-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{product.name}</h4>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-600 font-semibold">{product.price}</span>
                <button className="text-gray-400 hover:text-rose-600 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-rose-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Special Offer</h4>
        <p className="text-sm text-gray-600 mb-3">
          Get 15% off on orders above $100. Use code: BLOOM15
        </p>
        <button className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Sidebar;