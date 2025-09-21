import React, { useState } from 'react';
import { Heart, Gift, GraduationCap, Calendar } from 'lucide-react';


const Occasions = () => {
  const [activeCategory, setActiveCategory] = useState('birthday');

  const categories = [
    { id: 'birthday', name: 'Birthday', icon: <Gift className="h-6 w-6" /> },
    { id: 'anniversary', name: 'Anniversary', icon: <Heart className="h-6 w-6" /> },
    { id: 'graduation', name: 'Graduation', icon: <GraduationCap className="h-6 w-6" /> },
    { id: 'love-romance', name: 'Love & Romance', icon: <Heart className="h-6 w-6" /> }
  ];

  const products = {
    birthday: [
      { id: 1, name: 'Happy Birthday Bouquet', price: '$45', image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 2, name: 'Colorful Birthday Mix', price: '$38', image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 3, name: 'Birthday Surprise Box', price: '$55', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    anniversary: [
      { id: 4, name: 'Anniversary Rose Bouquet', price: '$75', image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 5, name: 'Romantic Red Roses', price: '$85', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 6, name: 'Anniversary Special', price: '$95', image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    graduation: [
      { id: 7, name: 'Graduation Congratulations', price: '$42', image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 8, name: 'Success Celebration', price: '$48', image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 9, name: 'Achievement Bouquet', price: '$52', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    'love-romance': [
      { id: 10, name: 'Love You Bouquet', price: '$65', image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 11, name: 'Romantic Gesture', price: '$58', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 12, name: 'Passionate Roses', price: '$72', image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Special Occasions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrate life's special moments with our carefully curated flower arrangements 
            designed for every occasion that matters to you.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products[activeCategory].map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-rose-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-600">{product.price}</span>
                  <button className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-rose-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Our flower experts are here to help you find the perfect arrangement for your special occasion.
            </p>
            <button className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Occasions;