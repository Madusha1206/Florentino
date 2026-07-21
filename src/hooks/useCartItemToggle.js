import { useEffect, useState, useCallback } from 'react';
import { addItemToCart, getStoredCart, updateCartQuantity } from '../utils/cart';

function getCartCodes() {
  return new Set(getStoredCart().map((item) => item.code));
}

export function useCartItemToggle() {
  const [cartCodes, setCartCodes] = useState(() => getCartCodes());

  // Sync cart state when cart changes (from any component or tab)
  useEffect(() => {
    const syncCodes = () => {
      setCartCodes(getCartCodes());
    };

    window.addEventListener('cart:update', syncCodes);
    window.addEventListener('storage', syncCodes);

    return () => {
      window.removeEventListener('cart:update', syncCodes);
      window.removeEventListener('storage', syncCodes);
    };
  }, []);

  const isInCart = useCallback((code) => {
    return cartCodes.has(code);
  }, [cartCodes]);

  const toggleCartItem = useCallback((item) => {
    if (!item?.code) {
      console.warn('Item must have a valid "code" property');
      return false;
    }

    const isCurrentlyInCart = getStoredCart().some((cartItem) => cartItem.code === item.code);

    if (isCurrentlyInCart) {
      // Remove from cart
      updateCartQuantity(item.code, 0);
    } else {
      // Add to cart
      addItemToCart(item);
    }


    // Return the new state (true = now added, false = now removed)
    return !isCurrentlyInCart;
  }, []);

  return { isInCart, toggleCartItem };
}