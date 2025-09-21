import React from 'react';
import { Star, Heart } from 'lucide-react';

const WeddingBouquets = () => {
  const bouquets = [
    {
      id: 1,
      name: 'Classic White Rose Bouquet',
      price: '$150',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      description: 'Elegant white roses with eucalyptus and baby\'s breath'
    },
    {
      id: 2,
      name: 'Romantic Pink Bouquet',
      price: '$135',
      image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      description: 'Soft pink peonies and roses with greenery'
    },
    {
      id: 3,
      name: 'Garden Style Bouquet',
      price: '$120',
      image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4,
      description: 'Mixed seasonal flowers in rustic style'
    },
    {
      id: 4,
      name: 'Blush & Ivory Bouquet',
      price: '$165',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      description: 'Soft blush roses with ivory accents'
    },
    {
      id: 5,
      name: 'Wildflower Bouquet',
      price: '$110',
      image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4,
      description: 'Natural wildflowers with textural elements'
    },
    {
      id: 6,
      name: 'Royal Purple Bouquet',
      price: '$140',
      image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      description: 'Deep purple roses with silver accents'
    }
  ];

  return (

    <div id="weddingbouquets" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Wedding Bouquets</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make your special day unforgettable with our stunning collection of bridal bouquets, 
            crafted with love and attention to every detail.
          </p>
        </div>

        {/* Bouquets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {bouquets.map((bouquet) => (
            <div key={bouquet.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={bouquet.image} 
                  alt={bouquet.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-rose-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{bouquet.name}</h3>
                
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < bouquet.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                </div>
                
                <p className="text-gray-600 mb-4">{bouquet.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-600">{bouquet.price}</span>
                  <button className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Section */}
        <div className="bg-rose-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Bouquet?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our expert florists can create a personalized wedding bouquet that perfectly matches 
            your vision and wedding theme. Schedule a consultation to discuss your dream bouquet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-rose-600 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingBouquets;