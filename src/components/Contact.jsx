import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { submitContactMessage } from '../API';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitContactMessage(form);
      if (res && res.success) {
        setSent(true);
        setForm({ name: '', phone: '', email: '', comment: '' });
      } else {
        alert(res?.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Contact submit error', err);
      alert('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900">Contact Us</h1>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mt-2">Have a question or comment?</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Use the form below to send us a message or contact us by mail at:</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-sm sm:text-base">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2 text-sm sm:text-base">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g. +94 70 000 0000"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2 text-sm sm:text-base">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2 text-sm sm:text-base">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 resize-y"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[oklch(51.4%_0.222_16.935)] hover:opacity-95 text-white px-6 py-3 rounded-md font-semibold disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
                </button>
            </div>
          </form>
          </div>

          {/* Right: Info */}
          <aside>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Get In Touch!</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              We welcome your feedback, questions, and inquiries, as it helps us tailor our services
              to better meet your needs. Please reach out using the contact numbers or email provided below.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-800">
                <span className="mt-0.5 text-gray-700"><Phone className="h-5 w-5" /></span>
                <span>Hotline: <a href="tel:+94762370470" className="hover:text-rose-600">+94 76 237 0470</a></span>
              </li>
              <li className="flex items-start gap-3 text-gray-800">
                <span className="mt-0.5 text-gray-700"><Mail className="h-5 w-5" /></span>
                <span>Email: <a href="mailto:florentinoflorist@gmail.com" className="hover:text-rose-600">florentinoflorist@gmail.com</a></span>
              </li>
              <li className="flex items-start gap-3 text-gray-800">
                <span className="mt-0.5 text-gray-700"><MapPin className="h-5 w-5" /></span>
                <span>
                  Florentino,<br/>
                  No. 67/E, Jayanthi Mawatha,<br/>
                  Biyagama
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
