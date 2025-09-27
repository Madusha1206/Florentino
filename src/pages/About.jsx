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
    <div id="about" className="bg-white">
      {/* Hero Image */}
      <div className="w-full h-72 md:h-96 relative">
        <img
          src={('/images/front.jpg')}
          alt="Florentino Flowers Hero"
          className="w-full h-full object-cover object-center"
        />
        {/* Optionally, overlay a dark filter for text contrast */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
      </div>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6 text-center">Our Story</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-sage-600 leading-relaxed mb-6 text-center">
            Founded in 2017, Florentino has been bringing the beauty of nature into homes
            and hearts for over three decades. What started as a small online business has
            blossomed into the region's most trusted name in floral artistry.
          </p>
          <p className="text-lg text-sage-600 leading-relaxed text-center">
            We believe that flowers have the power to transform spaces, elevate moods, and
            create lasting memories. Our master florists combine traditional techniques with
            contemporary design to create arrangements that are both timeless and fresh.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-sage-50 p-6 rounded-2xl hover:bg-sage-100 transition-colors duration-200 text-center">
                <feature.icon className="h-8 w-8 text-rose-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-sage-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-sage-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
