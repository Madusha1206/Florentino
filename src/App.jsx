import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import Catalog from './pages/Catalog';
import CatalogIndex from './pages/catalog/index';
import BallonHampers from './pages/catalog/BallonHampers';
import BallonHampersWithGifts from './pages/catalog/BallonHampersWithGifts';
import RoseBunches from './pages/catalog/RoseBunches';
import FlowerBunches from './pages/catalog/FlowerBunches';
import CakeWithFlowerBunch from './pages/catalog/CakeWithFlowerBunch';
import Cakes from './pages/catalog/Cakes';
import Brownies from './pages/catalog/Brownies';
import BrowniesWithGifts from './pages/catalog/BrowniesWithGifts';
import Teddies from './pages/catalog/Teddies';
import MoneyBunches from './pages/catalog/MoneyBunches';
import Occasions from './pages/Occasions';
import GiftItems from './pages/GiftItems';
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
        <Route path="/catalog/index" element={<CatalogIndex />} />
        <Route path="/catalog/ballon-hampers" element={<BallonHampers />} />
        <Route path="/catalog/ballon-hampers-with-gifts" element={<BallonHampersWithGifts />} />
        <Route path="/catalog/rose-bunches" element={<RoseBunches />} />
        <Route path="/catalog/flower-bunches" element={<FlowerBunches />} />
        <Route path="/catalog/cake-with-flower-bunch" element={<CakeWithFlowerBunch />} />
        <Route path="/catalog/cakes" element={<Cakes />} />
        <Route path="/catalog/brownies" element={<Brownies />} />
        <Route path="/catalog/brownies-with-gifts" element={<BrowniesWithGifts />} />
        <Route path="/catalog/teddies" element={<Teddies />} />
        <Route path="/catalog/money-bunches" element={<MoneyBunches />} />
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
