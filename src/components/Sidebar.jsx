import React from 'react';

const Sidebar = () => {
  const featuredProducts = [
    { id: 1, code: 'FLR-F001', price: 'Rs.', image: '/images/FlowerBunches/FB1.jpg' },
    { id: 2, code: 'FLR-F002', price: 'Rs.', image: '/images/RoseBunches/RB1.jpg' },
    { id: 3, code: 'FLR-F003', price: 'Rs.', image: '/images/FlowerBunches/FB2.JPG' }
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
              <h4 className="font-medium text-gray-800">Item Code: {product.code}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="product-price font-semibold">{product.price}</span>
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