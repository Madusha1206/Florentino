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