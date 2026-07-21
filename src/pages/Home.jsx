import React from 'react';
import { Link } from 'react-router-dom';
import { catalogItems } from '../data/catalogItems';
import { getCategoryPath } from '../data/categoryPaths';
import { useCartItemToggle } from '../hooks/useCartItemToggle';
import VideoAlbum from '../components/VideoAlbum';
import GalleryLoadMore from '../components/GalleryLoadMore';
import ProductCartButton from '../components/ProductCartButton';

const ITEMS_PER_PAGE = 8;
const formatPrice = (price) =>
  price === undefined ? 'Rs.' : 'Rs. ' + price.toLocaleString();

const Home = () => {
  const { isInCart, toggleCartItem } = useCartItemToggle();
  const visibleItems = catalogItems.slice(0, ITEMS_PER_PAGE);

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
            <Link to='/catalog' className='home-primary-cta home-explore-button'>
              <span>Explore the collection</span>
              <svg viewBox='0 0 28 20' aria-hidden='true' focusable='false'>
                <polygon points='0,0 7,10 0,20 4,20 11,10 4,0' />
                <polygon points='8,0 15,10 8,20 12,20 19,10 12,0' />
                <polygon points='16,0 23,10 16,20 20,20 27,10 20,0' />
              </svg>
            </Link>
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
                <p className='product-price'>{formatPrice(item.price)}</p>
                <ProductCartButton
                  isAdded={isInCart(item.code)}
                  onClick={() => handleAddToCart(item)}
                  itemCode={item.code}
                />
              </div>
            </article>
          ))}
        </div>
        <GalleryLoadMore
          visibleCount={visibleItems.length}
          totalCount={catalogItems.length}
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
            <h2 id='about-heading'>Florentino</h2>
            <p>
              Founded in 2017, Florentino creates meaningful floral gifts that transform
              everyday moments into lasting memories.
            </p>
            <p>
              Every bouquet, hamper, and celebration piece is thoughtfully arranged with
              fresh ideas, personal care, and a genuine passion for beautiful details.
            </p>
            <a href='#video-album' className='home-about-button'>Watch our work</a>
          </div>
        </div>
      </section>
      <VideoAlbum />
    </main>
  );
};

export default Home;
