🌸✨Florentino — Online Flower Shop

A modern, full‑stack flower store built with React (Vite) + Tailwind on the frontend and Node.js + Express + MongoDB on the backend. Users can browse collections, add items to cart, check out, and contact the shop. Admins can review contact messages in MongoDB.

Stack

- React 18 + Vite
- Tailwind CSS + lucide‑react icons
- Node.js + Express
- MongoDB + Mongoose
- JWT‑based authentication

Highlights

- Sign up / Log in – required for cart and checkout
- Gift Items + Occasions – add to cart from multiple pages
- Live Cart Badge – updates instantly across pages (event bus)
- Cart CRUD – quantity increment/decrement and delete
- Checkout – order summary + shipping, WhatsApp payment handoff
- Contact Form – saved to MongoDB for admin review

🏗️ Architecture
root/
├─ images/            
├─ src/                          
│  ├─ components/
│  │  ├─ Header.jsx            
│  │  ├─ Login.jsx, Signup.jsx
│  │  ├─ Contact.jsx
│  │  ├─ RequireAuth.jsx      
│  │  └─ ScrollToTop.jsx
│  ├─ pages/
│  │  ├─ Home.jsx, About.jsx
│  │  ├─ GiftItems.jsx, Occasions.jsx
│  │  ├─ Cart.jsx, Checkout.jsx
│  │  └─ WeddingBouquets.jsx
│  ├─ API.js                  
│  ├─ index.css, main.jsx, App.jsx
│  └─ index.html
│
└─ florentino-backend/          
   ├─ controllers/
   │  ├─ giftController.js
   │  ├─ cartController.js
   │  └─ contactController.js
   ├─ models/
   │  ├─ Gift.js, Cart.js, User.js
   │  └─ ContactMessage.js
   ├─ routes/
   │  ├─ giftRoutes.js, cartRoutes.js, authRoutes.js
   │  └─ contactRoutes.js
   └─ server.js

🧱 Data Model (Simplified)
{
  "Gift": { "name": "String", "description": "String", "price": 4500, "image": "/images/...", "rating": 4 },
  "Cart": { "giftId": "String", "name": "String", "price": 4500, "image": "/images/...", "quantity": 1 },
  "User": { "email": "String", "passwordHash": "String", "name": "String" },
  "ContactMessage": { "name": "String", "phone": "String", "email": "String", "comment": "String" }
}



Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)

1) Backend (Express)

Create `florentino-backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/florentino
JWT_SECRET=change_me
```

Install and run:

```
cd florentino-backend
npm install
npm start
```

2) Frontend (React + Vite)

Create `./.env` at project root:

```
VITE_API_URL=http://localhost:5000
```

Install and run:

```
npm install
npm run dev
```

Useful Scripts

- Frontend: `npm run dev`, `npm run build`, `npm run preview`
- Backend: `cd florentino-backend && npm start`

API (preview)

Base URL: `${VITE_API_URL}` (e.g., http://localhost:5000)

- Auth
  - POST `/api/auth/signup` – create user
  - POST `/api/auth/login` – returns `{ success, token, user }`

- Gifts
  - GET `/api/gifts` – list gifts
  - POST `/api/gifts` – create
  - PUT `/api/gifts/:id` – update
  - DELETE `/api/gifts/:id` – delete

- Cart
  - GET `/api/cart` – list items
  - POST `/api/cart` – add item (increases qty if `giftId` exists)
  - PUT `/api/cart/:id` – update quantity (`<= 0` deletes)
  - DELETE `/api/cart/:id` – remove item

- Contact
  - POST `/api/contact` – create contact message
  - GET `/api/contact` – list messages (protect in prod)

Key Features in Detail

- Auth Guard (RequireAuth)
  - `/cart` and `/checkout` are protected; unauthenticated users are redirected to `/login`.
  - After login, users are returned to where they came from.

- Cart UX
  - Add to Cart from Gift Items and Occasions.
  - Header badge updates instantly via a small `window` event (`cart:update`).
  - Cart shows thumbnails, quantity controls, and line totals.

- Checkout
  - Summarizes items and total, collects shipping details.
  - “Proceed to Payment” opens WhatsApp with a prefilled order message.

- Contact
  - Contact form persists messages in MongoDB for admin review.

Roadmap

- Admin UI for viewing contact messages
- Order capture + email receipts
- Inventory + pricing management
- Image upload for gifts

Known Issues / Notes

- Protect `/api/contact` GET before production (add auth/roles middleware).
- Ensure `VITE_API_URL` matches your backend URL for all API calls.
- If cart badge doesn’t update, confirm `cart:update` events are dispatched on add and count is set on cart load.

License

Private project. Do not redistribute without permission.
