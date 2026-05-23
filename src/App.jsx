import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import Catalog from './pages/Catalog';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
      <WhatsAppChat />
    </Router>
  );
}

export default App;
