const API = import.meta.env.VITE_API_URL;

function authHeaders() {
  const headers = { "Content-Type": "application/json" };
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  } catch {
    // Local storage may be unavailable in restricted browser contexts.
  }
  return headers;
}

export async function checkHealth() {
  const res = await fetch(`${API}/api/health`).catch(() => null);
  if (!res) return { ok: false };
  return res.json();
}

export function api(path, options = {}) {
  return fetch(`${API}${path}`, options);
}

// Gifts
export async function getGiftItems() {
  const res = await fetch(`${API}/api/gifts`);
  if (!res.ok) throw new Error('Failed to fetch gift items');
  const data = await res.json();
  return data.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    image: item.image || '/images/placeholder.jpg',
    price: item.price ? `$${item.price}` : '',
    priceValue: item.price || 0,
    rating: item.rating || 5,
    reviews: item.reviews || 0,
    isPopular: item.isPopular || false,
  }));
}

export async function addGift(data) {
  const res = await fetch(`${API}/api/gifts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

// Auth
export async function signup(userData) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  let data = {};
  try { data = await res.json(); } catch {
    // Some failed responses may not include JSON.
  }
  return { success: res.ok, ...data };
}

export async function login(credentials) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  let data = {};
  try { data = await res.json(); } catch {
    // Some failed responses may not include JSON.
  }
  if (!res.ok) return { success: false, ...data };
  return data;
}

// Contact
export async function submitContactMessage(payload) {
  const res = await fetch(`${API}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function submitOrder(orderData) {
  const res = await fetch(`${API}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const data = await res.json().catch(() => ({}));
  return { success: res.ok, ...data };
}

export async function subscribeToNewsletter(email) {
  const res = await fetch(`${API}/api/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'footer' }),
  });
  const data = await res.json().catch(() => ({}));
  return { success: res.ok, ...data };
}

// Cart
export async function getCartItems() {
  const res = await fetch(`${API}/api/cart`, { headers: authHeaders() });
  return res.json();
}

export async function addToCartItem(item) {
  const res = await fetch(`${API}/api/cart`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item),
  });
  if (res.status === 401) return { unauthorized: true };
  return res.json();
}

export async function updateCartItemQty(id, updates) {
  const res = await fetch(`${API}/api/cart/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteCartItem(id) {
  const res = await fetch(`${API}/api/cart/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}

// // Wedding Bouquets
// export async function getWeddingBouquets() { /* ... */ }
// export async function addWeddingBouquet(data) { /* ... */ }
// export async function updateWeddingBouquet(id, data) { /* ... */ }
// export async function deleteWeddingBouquet(id) { /* ... */ }

// // Occasions
// export async function getOccasions() { /* ... */ }
// export async function addOccasion(data) { /* ... */ }
// export async function updateOccasion(id, data) { /* ... */ }
// export async function deleteOccasion(id) { /* ... */ }
