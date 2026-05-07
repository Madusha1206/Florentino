const CART_KEY = 'florentinoCart';

export function getStoredCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  const count = items.reduce((total, item) => total + item.quantity, 0);
  window.dispatchEvent(new CustomEvent('cart:update', { detail: { count } }));
}

export function addItemToCart(item) {
  const current = getStoredCart();
  const existing = current.find((cartItem) => cartItem.code === item.code);
  const next = existing
    ? current.map((cartItem) =>
        cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
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
