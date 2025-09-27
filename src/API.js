const API = import.meta.env.VITE_API_URL;

export async function checkHealth() {
  const res = await fetch(`${API}/api/health`);
  return res.json();
}


export function api(path, options = {}) {
  return fetch(`${API}${path}`, options);
}

// Fetch all gift items from backend
export async function getGiftItems() {
  const res = await fetch(`${API}/api/gifts`);
  if (!res.ok) throw new Error('Failed to fetch gift items');
  const data = await res.json();
  // Normalize data for GiftItems.jsx
  return data.map(item => ({
    id: item._id,
    name: item.name,
    description: item.description,
    image: item.image || '/src/whatsapp.webp',
    price: item.price ? `$${item.price}` : '',
    priceValue: item.price || 0,
    rating: item.rating || 5,
    reviews: item.reviews || 0,
    isPopular: item.isPopular || false
  }));
}

// Example: Add a gift
export async function addGift(data) {
  const res = await fetch(`${API}/api/gifts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

  
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

  // Parse JSON safely
  const data = await res.json();
  return data;
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