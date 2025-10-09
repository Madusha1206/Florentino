const API = import.meta.env.VITE_API_URL;

export async function checkHealth() {
  const res = await fetch(`${API}/api/health`);
  return res.json();
}

export function api(path, options = {}) {
  return fetch(`${API}${path}`, options);
}

// Get all gifts
export const getGiftItems = async () => {
  const res = await fetch(`${API}/api/gifts/`);  // Fixed typo: use `${API}/api/gifts/`
  return res.json();
};

// Create a new gift
export const createGiftItem = async (gift) => {
  const res = await fetch(`${API}/api/gifts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gift),
  });
  return res.json();
};

// Update a gift
export const updateGiftItem = async (id, gift) => {
  const res = await fetch(`${API}/api/gifts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gift),
  });
  return res.json();
};

// Delete a gift
export const deleteGiftItem = async (id) => {
  const res = await fetch(`${API}/api/gifts/${id}`, { method: "DELETE" });
  return res.json();
};

// Add to cart (NEW)
export const addToCartItem = async (cartItem) => {
  const res = await fetch(`${API}/api/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItem),
  });
  return res.json();
};

// Get cart items (NEW)
export const getCartItems = async () => {
  const res = await fetch(`${API}/api/cart/`);
  return res.json();
};

// Update a cart item (quantity, etc.)
export const updateCartItemQty = async (id, updates) => {
  const res = await fetch(`${API}/api/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
};

// Delete a cart item
export const deleteCartItem = async (id) => {
  const res = await fetch(`${API}/api/cart/${id}`, { method: "DELETE" });
  return res.json();
};

export async function signup(userData) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function login(userData) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
}

// Submit contact message
export async function submitContactMessage(payload) {
  const res = await fetch(`${API}/api/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
