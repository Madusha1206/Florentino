import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import Catalog from './pages/Catalog';
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
import GiftItems from './pages/GiftItems';
import Home from './pages/Home';
import About from './pages/About';
import WeddingBouquets from './pages/WeddingBouquets';
import Cart from './pages/Cart';
import OtherServices from './pages/OtherServices';
import FAQ from './pages/FAQ';

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/catalog', element: <Catalog /> },
  { path: '/catalog/ballon-hampers', element: <BallonHampers /> },
  { path: '/catalog/ballon-hampers-with-gifts', element: <BallonHampersWithGifts /> },
  { path: '/catalog/rose-bunches', element: <RoseBunches /> },
  { path: '/catalog/flower-bunches', element: <FlowerBunches /> },
  { path: '/catalog/cake-with-flower-bunch', element: <CakeWithFlowerBunch /> },
  { path: '/catalog/cakes', element: <Cakes /> },
  { path: '/catalog/brownies', element: <Brownies /> },
  { path: '/catalog/brownies-with-gifts', element: <BrowniesWithGifts /> },
  { path: '/catalog/teddies', element: <Teddies /> },
  { path: '/catalog/money-bunches', element: <MoneyBunches /> },
  { path: '/catalog/wedding-bouquets', element: <WeddingBouquets /> },
  { path: '/about', element: <About /> },
  { path: '/other-services', element: <OtherServices /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/contact', element: <Contact /> },
  { path: '/cart', element: <Cart /> },
];

const RouteFallback = () => {
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const recoveredRoute = appRoutes
    .filter((route) => route.path !== '/')
    .find((route) => normalizedPathname.endsWith(route.path));

  return recoveredRoute?.element || <Home />;
};



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<RouteFallback />} />
      </Routes>

      <Footer />
      <WhatsAppChat />
    </Router>
  );
}

export default App;
