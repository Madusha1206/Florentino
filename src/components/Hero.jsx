import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream-50 to-rose-50">
        <div className="absolute inset-0 bg-[url('C:\Users\buddh\OneDrive\Desktop\Florentino"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Sparkles className="h-6 w-6 text-rose-300" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <Sparkles className="h-4 w-4 text-sage-300" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-sage-800 leading-tight">
                Beautiful
                <span className="text-rose-400 block">Flowers</span>
                <span className="text-sage-600 text-3xl md:text-4xl block mt-2">
                  for Every Moment
                </span>
              </h1>
              <p className="text-xl text-sage-600 leading-relaxed max-w-lg">
                Discover the art of floral elegance at Florentino. We create stunning arrangements 
                that bring nature's beauty to your most precious moments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span className="font-semibold">Explore Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-4 rounded-full transition-all duration-200 font-semibold">
                Custom Arrangements
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-sage-700">500+</div>
                <div className="text-sage-500">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sage-700">15+</div>
                <div className="text-sage-500">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sage-700">100+</div>
                <div className="text-sage-500">Flower Varieties</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Beautiful flower arrangement"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-sage-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;