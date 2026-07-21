import React, { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { catalogItems } from '../data/catalogItems';
import { getCategoryPath } from '../data/categoryPaths';
import { useCartItemToggle } from '../hooks/useCartItemToggle';
import Contact from '../components/Contact';
import GalleryLoadMore from '../components/GalleryLoadMore';

const ITEMS_PER_PAGE = 8;
const formatPrice = (price) =>
  price === undefined ? 'Rs.' : 'Rs. ' + price.toLocaleString();

const Home = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { isInCart, toggleCartItem } = useCartItemToggle();
  const visibleItems = catalogItems.slice(0, visibleCount);

  const handleAddToCart = (item) => {
    toggleCartItem({
      code: item.code,
      category: item.category,
      price: item.price || 0,
      image: item.image,
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
                  to={getCategoryPath(item.category)}
                  className='home-product-category'
                  aria-label={'View all ' + item.category}
                >
                  {item.category}
                </Link>
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
        <GalleryLoadMore
          visibleCount={visibleCount}
          totalCount={catalogItems.length}
          onShowMore={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
        />

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
