import React from 'react';
import { Check, ShoppingCart } from 'lucide-react';

const ProductCartButton = ({ isAdded, onClick, itemCode }) => {
  const label = isAdded ? 'Added' : 'Add to Cart';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${itemCode}`}
      aria-pressed={isAdded}
      className={`product-cart-button${isAdded ? ' product-cart-button--added' : ''}`}
    >
      <span className="product-cart-button__icon-container" aria-hidden="true">
        {isAdded ? <Check className="product-cart-button__icon" /> : <ShoppingCart className="product-cart-button__icon" />}
      </span>
      <span className="product-cart-button__text">{label}</span>
      <span className="product-cart-button__progress" aria-hidden="true" />
    </button>
  );
};

export default ProductCartButton;
