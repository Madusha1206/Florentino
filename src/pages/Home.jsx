import React, { useState } from 'react';
import { Check, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { catalogItems } from '../data/catalogItems';
import { useCartItemToggle } from '../hooks/useCartItemToggle';
import { addItemToCart } from '../utils/cart';
import Contact from '../components/Contact';

const ITEMS_PER_PAGE = 8;
const categoryPaths = {
  'Balloon Hampers': '/catalog/ballon-hampers',
  'Balloon Hampers with Gifts': '/catalog/ballon-hampers-with-gifts',
  'Brownies': '/catalog/brownies',
  'Brownies with Gifts': '/catalog/brownies-with-gifts',
  'Cake with Flower Bunch': '/catalog/cake-with-flower-bunch',
  'Cakes': '/catalog/cakes',
  'Flower Bunches': '/catalog/flower-bunches',
  'Money Bunches': '/catalog/money-bunches',
  'Rose Bunches': '/catalog/rose-bunches',
  'Teddies': '/catalog/teddies',
  'Wedding Bouquets': '/catalog/wedding-bouquets',
};
const formatPrice = (price) =>
  price === undefined ? 'Contact for price' : 'Rs. ' + price.toLocaleString();

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isInCart } = useCartItemToggle();
  const totalPages = Math.ceil(catalogItems.length / ITEMS_PER_PAGE);
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = catalogItems.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const handleAddToCart = (item) => {
    if (isInCart(item.code)) return;
    addItemToCart({ code: item.code, category: item.category, price: item.price || 0, image: item.image });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <main className='home-page'>
      <section className='home-parallax-hero' aria-labelledby='home-heading'>
        <div className='home-parallax-shade' />
        <div className='home-parallax-content'>
          <p className='home-parallax-eyebrow'>Let's make your thoughts bloom</p>
          <h1 id='home-heading'>Flowers for every special moment</h1>
          <p>Stay tunned for the next big offer!!!</p>
          <div className='home-parallax-actions'>
            <a href='#featured-collection' className='home-primary-cta'>Explore the collection</a>
            <a href='https://wa.me/94702370470' target='_blank' rel='noreferrer' className='home-secondary-cta'>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <section id='featured-collection' className='home-collection' aria-labelledby='collection-heading'>
        <div className='home-collection-heading'>
          <p>Something special for every celebration</p>
          <h2 id='collection-heading'>Our Catalog</h2>

        </div>
        <div className='home-product-grid'>
          {visibleItems.map((item) => (
            <article key={item.code} className='home-product-card'>
              <div className='home-product-image-wrap'>
                <img src={item.image} alt={'Florentino ' + item.category + ' item ' + item.code} />
                <Link
                  to={categoryPaths[item.category] || '/catalog'}
                  className='home-product-category'
                  aria-label={'View all ' + item.category}
                >
                  {item.category}
                </Link>
                <span className='home-product-heart' aria-hidden='true'><Heart /></span>
              </div>
              <div className='home-product-details'>
                <h3>Item Code: {item.code}</h3>
                <p>{formatPrice(item.price)}</p>
                <button
                  type='button'
                  onClick={() => handleAddToCart(item)}
                  aria-pressed={isInCart(item.code)}
                  className={isInCart(item.code) ? 'home-cart-button home-cart-button-added' : 'home-cart-button'}
                >
                  {isInCart(item.code) ? <Check /> : <ShoppingCart />}
                  {isInCart(item.code) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <nav className='home-pagination' aria-label='Catalog pages'>
          <button type='button' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <div className='home-page-numbers'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type='button'
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? 'home-page-number home-page-number-active' : 'home-page-number'}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button type='button' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </nav>

      </section>
      <section id='about' className='home-about' aria-labelledby='about-heading'>
        <div className='home-about-shade' />
        <div className='home-about-inner'>
          <div className='home-about-image-wrap'>
            <img src='/images/front.jpeg' alt='Florentino floral arrangement' />
          </div>
          <div className='home-about-copy'>
            <p className='home-about-eyebrow'>Our story</p>
            <h2 id='about-heading'>About Florentino</h2>
            <p>
              Founded in 2017, Florentino creates meaningful floral gifts that transform
              everyday moments into lasting memories.
            </p>
            <p>
              Every bouquet, hamper, and celebration piece is thoughtfully arranged with
              fresh ideas, personal care, and a genuine passion for beautiful details.
            </p>
            <a href='#contact' className='home-about-button'>Contact our team</a>
          </div>
        </div>
      </section>
      <div className='home-contact-section'>
        <Contact />
      </div>
    </main>
  );
};

export default Home;
