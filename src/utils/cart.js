import { catalogItems } from '../data/catalogItems';

const CART_KEY = 'florentinoCart';
const API = import.meta.env.VITE_API_URL;
const catalogByCode = new Map(catalogItems.map((catalogItem) => [catalogItem.code, catalogItem]));

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
  window.addEventListener('online', () => syncCartToBackend(getStoredCart()));
}

export function getStoredCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    const refreshed = parsed.map(refreshCartItem);
    const refreshedJson = JSON.stringify(refreshed);
    if (refreshedJson !== stored) localStorage.setItem(CART_KEY, refreshedJson);

    return refreshed;
  } catch {
    return [];
  }
}

export function saveStoredCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  const count = items.reduce((total, item) => total + item.quantity, 0);
  window.dispatchEvent(new CustomEvent('cart:update', { detail: { count } }));
  syncCartToBackend(items);
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

function syncCartToBackend(items) {
  if (!API) return;

  fetch(`${API}/api/cart/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  }).catch(() => {
    // Local cart remains available even if the backend is offline.
  });
}
