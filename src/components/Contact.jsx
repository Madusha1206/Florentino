import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Shop',
      details: ['123 Garden Street', 'Bloomville, FL 12345']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-4567', 'Daily 8AM - 8PM']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@florentino.com', 'orders@florentino.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Sat: 8AM - 8PM', 'Sunday: 10AM - 6PM']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-sage-50 to-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Ready to bring beauty to your special moment? Contact us today to discuss 
            your floral needs and let us create something magical for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-rose-100 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sage-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-sage-800 mb-4">Stay Bloomed</h3>
              <p className="text-sage-600 mb-6">
                Subscribe to our newsletter for seasonal flower tips, special offers, and inspiration.
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-sage-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sage-700 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sage-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sage-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sage-700 font-medium mb-2">Event Type</label>
                <select className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400">
                  <option>Select an occasion</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Corporate Event</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sage-700 font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                  placeholder="Tell us about your floral needs..."
                ></textarea>
              </div>
              <button className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-lg transition-colors duration-200 font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;