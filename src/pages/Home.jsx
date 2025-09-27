import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ArrowRight, Truck, Shield, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/images/front.jpg',
      title: 'Luxury Flowers',
      subtitle: 'by Florentimo',
      description: 'Luxury blooms, handcrafted with exceptional care. Because you deserve nothing less than extraordinary.',
      buttonText: 'SHOP NOW'
    },
    {
      image: '/images/hero.jpg',
      title: 'Wedding Collections',
      subtitle: 'Perfect for Your Special Day',
      description: 'Create unforgettable moments with our exquisite wedding flower arrangements and bridal bouquets.',
      buttonText: 'VIEW COLLECTION'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Fresh Daily Flowers',
      subtitle: 'Direct from Our Gardens',
      description: 'Experience the beauty of nature with our fresh, premium quality flowers delivered daily.',
      buttonText: 'EXPLORE NOW'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-rose-600" />,
      title: 'Islandwide Delivery',
      description: 'Free delivery on orders near Biyagama area'
    },
    {
      icon: <Shield className="h-8 w-8 text-rose-600" />,
      title: 'Fresh Guarantee',
      description: '7-day freshness guarantee on all flowers'
    },
    {
      icon: <Phone className="h-8 w-8 text-rose-600" />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="flex justify-end">
                    <div className="max-w-2xl text-right text-white">
                      <h1 className="text-6xl lg:text-7xl font-light mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl font-light mb-6 opacity-90">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-xl ml-auto">
                        {slide.description}
                      </p>
                      <button className="bg-transparent border-2 border-white text-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 tracking-wider">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-white border-opacity-50 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-white border-opacity-50 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>

        
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Popular Categories */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Wedding Bouquets', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400', count: '25+ items' },
                    { name: 'Birthday Flowers', image: 'https://images.pexels.com/photos/1406956/pexels-photo-1406956.jpeg?auto=compress&cs=tinysrgb&w=400', count: '30+ items' },
                    { name: 'Anniversary Gifts', image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400', count: '20+ items' }
                  ].map((category, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                          <p className="text-sm opacity-90">{category.count}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:flex-shrink-0">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;