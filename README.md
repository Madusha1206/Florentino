Florentino — Flower Store (React + Node + Mongo)

Overview

- Modern flower e‑commerce app with a React frontend and Node/Express backend.
- MongoDB is used for data (gifts, cart, users, contact messages).
- JWT‑based auth with a simple client‑side guard so users must log in to add to cart, view cart, or checkout.
- Cart badge updates live across pages. Checkout collects shipping details and hands off to WhatsApp for payment coordination.

Tech Stack

- Frontend: React (Vite), Tailwind CSS, lucide‑react icons
- Backend: Node.js, Express
- Database: MongoDB (Mongoose ODM)
- Auth: JSON Web Tokens (JWT)

Monorepo Layout

- Frontend app: `src/` and top‑level project files (Vite style)
- Backend app: `florentino-backend/`
- Static assets: `/images` used throughout the UI

Key Features

- Auth gating (RequireAuth): blocks `/cart` and `/checkout` for non‑logged‑in users; “Add to Cart” prompts login.
- Login/Signup flows with redirect back to the intended page after login.
- Gift Items and Occasions pages with Add to Cart; cart lines include thumbnails.
- Cart CRUD (add, read, update quantity, delete). Badge in header updates instantly via a small event bus.
- Checkout page: shows order summary and shipping details; “Proceed to Payment” opens WhatsApp with a prefilled message.
- Contact form: submits messages to MongoDB so admins can review.

Quick Start

1) Backend setup

- Create `florentino-backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/florentino
JWT_SECRET=change_me
```

- Install and run:

```
cd florentino-backend
npm install
npm start
```

This starts the API at `http://localhost:5000`.

2) Frontend setup

- Create `./.env` at the project root with your backend URL:

```
VITE_API_URL=http://localhost:5000
```

- Install and run the web app:

```
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

Important Paths

- Header with cart badge and auth: `src/components/Header.jsx`
- Auth forms: `src/components/Login.jsx`, `src/components/Signup.jsx`
- Route guard: `src/components/RequireAuth.jsx`
- Gift Items page: `src/pages/GiftItems.jsx`
- Occasions page: `src/pages/Occasions.jsx`
- Cart page: `src/pages/Cart.jsx`
- Checkout page: `src/pages/Checkout.jsx`
- Contact page with form submit: `src/components/Contact.jsx`

Backend Sources

- Server entry: `florentino-backend/server.js`
- Models:
  - Gifts: `florentino-backend/models/Gift.js`
  - Cart: `florentino-backend/models/Cart.js`
  - Users: `florentino-backend/models/User.js`
  - Contact messages: `florentino-backend/models/ContactMessage.js`
- Routes:
  - Gifts: `florentino-backend/routes/giftRoutes.js`
  - Cart: `florentino-backend/routes/cartRoutes.js`
  - Auth: `florentino-backend/routes/authRoutes.js`
  - Contact: `florentino-backend/routes/contactRoutes.js`
- Controllers:
  - Gifts: `florentino-backend/controllers/giftController.js`
  - Cart: `florentino-backend/controllers/cartController.js`
  - Contact: `florentino-backend/controllers/contactController.js`

Environment Variables

- Backend:
  - `PORT` – API port (default 5000)
  - `MONGODB_URI` – connection string to MongoDB
  - `JWT_SECRET` – secret key for signing tokens
- Frontend:
  - `VITE_API_URL` – base URL for the API (e.g., `http://localhost:5000`)

API Summary

- Auth
  - `POST /api/auth/signup` – create account
  - `POST /api/auth/login` – login; returns `{ success, token, user }`

- Gifts
  - `GET /api/gifts` – list gifts
  - `POST /api/gifts` – create gift
  - `PUT /api/gifts/:id` – update gift
  - `DELETE /api/gifts/:id` – delete gift

- Cart
  - `GET /api/cart` – list cart items
  - `POST /api/cart` – add item (idempotent by `giftId`; increases quantity if it exists)
  - `PUT /api/cart/:id` – update quantity (deletes if `quantity <= 0`)
  - `DELETE /api/cart/:id` – remove item

- Contact
  - `POST /api/contact` – submit contact form
  - `GET /api/contact` – list messages (recommended to protect in production)

Auth Flow

- `src/components/RequireAuth.jsx` guards `/cart` and `/checkout` routes.
- `Login.jsx` navigates back to the original destination using `location.state.from`.
- Header listens for `auth:update` to switch Login↔Logout; listens for `cart:update` to adjust the badge instantly.

Cart Badge Updates

- When items are added (e.g., from Gift Items or Occasions), the code dispatches:

```
window.dispatchEvent(new CustomEvent('cart:update', { detail: { delta: 1 } }));
```

- On cart load or quantity changes, pages dispatch with an exact `count` to resync.

Checkout

- `/checkout` shows an order summary + shipping form.
- “Proceed to Payment” opens WhatsApp with a prefilled summary including total and shipping details.

Styling

- Tailwind CSS is configured (see `src/index.css`).
- Global font set via `src/index.css`.

Common Tasks

- Start backend: `cd florentino-backend && npm start`
- Start frontend: `npm run dev`
- Build frontend: `npm run build`

Troubleshooting

- Cart badge not updating: ensure `VITE_API_URL` points to the running backend; confirm the `cart:update` event fires on add.
- Login not redirecting back: verify `RequireAuth` wraps protected routes and `Login.jsx` uses `location.state.from`.
- Mongo connection issues: confirm `MONGODB_URI` and the database is reachable.
- Contact GET is open by default; add auth middleware before deploying.

License

- Private project. Do not redistribute without permission.

