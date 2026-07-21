import React from 'react';
import { Check, ShoppingCart } from 'lucide-react';

const ProductCartButton = ({ isAdded, onClick, itemCode }) => {
  const label = isAdded ? 'Added' : 'Add to Cart';
  const tooltip = isAdded ? 'Remove item' : 'Buy Now';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${itemCode}`}
      aria-pressed={isAdded}
      data-tooltip={tooltip}
      className={`product-cart-button${isAdded ? ' product-cart-button--added' : ''}`}
    >
      <span className="product-cart-button__wrapper" aria-hidden="true">
        <span className="product-cart-button__text">{label}</span>
        <span className="product-cart-button__icon">
          {isAdded ? <Check /> : <ShoppingCart />}
        </span>
      </span>
    </button>
  );
};

export default ProductCartButton;