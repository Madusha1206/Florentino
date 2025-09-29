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
  const res = await fetch(API_URL);
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
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gift),
  });
  return res.json();
};

// Delete a gift
export const deleteGiftItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
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