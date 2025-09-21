import React from 'react';
import { Heart, Award, Users, Leaf } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Passion for Beauty',
      description: 'Every arrangement is crafted with love and attention to detail.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in floral design and customer service.'
    },
    {
      icon: Users,
      title: 'Family Owned',
      description: 'Three generations of florists serving our community with pride.'
    },
    {
      icon: Leaf,
      title: 'Eco Friendly',
      description: 'Sustainably sourced flowers with environmentally conscious practices.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-sage-600 leading-relaxed mb-6">
                Founded in 1987, Florentino has been bringing the beauty of nature into homes 
                and hearts for over three decades. What started as a small family business has 
                blossomed into the region's most trusted name in floral artistry.
              </p>
              <p className="text-lg text-sage-600 leading-relaxed">
                We believe that flowers have the power to transform spaces, elevate moods, and 
                create lasting memories. Our master florists combine traditional techniques with 
                contemporary design to create arrangements that are both timeless and fresh.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-sage-50 p-6 rounded-2xl hover:bg-sage-100 transition-colors duration-200">
                    <feature.icon className="h-8 w-8 text-rose-400 mb-3" />
                    <h3 className="font-semibold text-sage-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-sage-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                  alt="Florist at work"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Beautiful bouquet"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Flower arrangement"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                  alt="Wedding bouquet"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;