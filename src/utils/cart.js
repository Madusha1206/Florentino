import { catalogItems } from '../data/catalogItems';

const LEGACY_CART_KEY = 'florentinoCart';
const catalogByCode = new Map(catalogItems.map((catalogItem) => [catalogItem.code, catalogItem]));
let cartItems = [];

function refreshCartItem(cartItem) {
  const catalogItem = catalogByCode.get(cartItem.code);
  if (!catalogItem) return cartItem;

  return {
    ...cartItem,
    category: catalogItem.category,
    image: catalogItem.image,
    price: catalogItem.price ?? 0,
  };
}

if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem(LEGACY_CART_KEY);
  } catch {
    // The cart remains session-only when browser storage is unavailable.
  }
}

export function getStoredCart() {
  cartItems = cartItems.map(refreshCartItem);
  return cartItems.map((item) => ({ ...item }));
}

export function saveStoredCart(items) {
  cartItems = Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
  const count = cartItems.reduce((total, item) => total + item.quantity, 0);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart:update', { detail: { count } }));
  }
}

export function addItemToCart(item) {
  const current = getStoredCart();
  const existing = current.find((cartItem) => cartItem.code === item.code);
  const next = existing
    ? current.map((cartItem) =>
        cartItem.code === item.code
          ? { ...cartItem, ...item, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    : [...current, { ...item, quantity: 1 }];

  saveStoredCart(next);
  return next;
}

export function updateCartQuantity(code, quantity) {
  const next = getStoredCart()
    .map((item) => (item.code === code ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveStoredCart(next);
  return next;
}

export function clearStoredCart() {
  saveStoredCart([]);
}
