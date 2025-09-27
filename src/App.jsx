import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import Login from './components/Login';
import Signup from './components/Signup';

import Occasions from './pages/Occasions';
import GiftItems from './pages/GiftItems';
import Home from './pages/Home';
import About from './pages/About';
import WeddingBouquets from './pages/WeddingBouquets';



function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wedding-bouquets" element={<WeddingBouquets />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/gift-items" element={<GiftItems />} />
       
      </Routes>

      <Footer />
      <WhatsAppChat />
    </Router>
  );
}

export default App;
