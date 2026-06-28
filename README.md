# Florentino

Florentino is a React and Express website for a Sri Lankan floral gift shop. The site presents a searchable product catalog, lets customers add item codes to a local cart, and sends order details to Florentino through WhatsApp while optionally saving cart/order data to the backend.

## Tech Stack

- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4 and custom CSS
- lucide-react icons
- Node.js + Express
- MongoDB + Mongoose
- JWT utilities for auth-ready API routes

## Website Features

- Home, About, FAQ, Contact, Catalog, Cart, and Other Services pages
- Sticky header with category navigation, search, cart count, and delivery banner
- Catalog search by item code, category, or price
- Category pages for:
  - Balloon Hampers
  - Balloon Hampers with Gifts
  - Brownies
  - Brownies with Gifts
  - Cakes
  - Cake with Flower Bunch
  - Flower Bunches
  - Money Bunches
  - Rose Bunches
  - Teddies
  - Wedding Bouquets
- Local cart using `localStorage`
- Cart quantity controls, clear cart action, and live header badge updates
- WhatsApp order handoff with customer name, phone, delivery note, item codes, quantities, and totals
- Optional backend cart sync through `VITE_API_URL`
- Contact form and newsletter subscription API support
- Other services section for car surprises, wedding bouquets, birthday surprises, and birthday setups

## Project Structure

```text
.
|-- images/                         # Source product and service images
|-- public/
|   |-- images/                     # Browser-served catalog images
|   `-- videos/                     # Browser-served service videos
|-- src/
|   |-- components/                 # Header, Footer, Contact, WhatsApp chat, UI helpers
|   |-- data/catalogItems.js        # Static catalog item list and image mapping
|   |-- hooks/useCartItemToggle.js  # Cart toggle helper hook
|   |-- pages/                      # Main website pages
|   |-- pages/catalog/              # Category pages and shared category layout
|   |-- utils/cart.js               # localStorage cart and backend sync helpers
|   |-- API.js                      # Frontend API helpers
|   |-- App.jsx                     # App routes
|   `-- main.jsx                    # React entry point
|-- florentino-backend/
|   |-- controllers/                # API controller logic
|   |-- middleware/                 # Auth middleware
|   |-- models/                     # MongoDB models
|   |-- routes/                     # Express route modules
|   `-- server.js                   # Express app entry point
|-- package.json                    # Frontend scripts and dependencies
`-- vite.config.js
```

## Frontend Routes

- `/` - home page
- `/catalog` - full searchable catalog
- `/catalog/index` - category index
- `/catalog/ballon-hampers`
- `/catalog/ballon-hampers-with-gifts`
- `/catalog/rose-bunches`
- `/catalog/flower-bunches`
- `/catalog/cake-with-flower-bunch`
- `/catalog/cakes`
- `/catalog/brownies`
- `/catalog/brownies-with-gifts`
- `/catalog/teddies`
- `/catalog/money-bunches`
- `/catalog/wedding-bouquets`
- `/about`
- `/other-services`
- `/faq`
- `/contact`
- `/cart`

## Backend API

Base URL is configured in the frontend with `VITE_API_URL`.

- `GET /api/gifts` - list gifts
- `POST /api/gifts` - create gift
- `PUT /api/gifts/:id` - update gift
- `DELETE /api/gifts/:id` - delete gift
- `POST /api/cart` - add cart item
- `POST /api/cart/sync` - sync local cart items to backend
- `GET /api/cart` - list cart items
- `PUT /api/cart/:id` - update cart item
- `DELETE /api/cart/:id` - delete cart item
- `POST /api/auth/signup` - create user
- `POST /api/auth/login` - log in user
- `POST /api/contact` - save contact message
- `GET /api/contact` - list contact messages
- `POST /api/newsletter/subscribe` - subscribe email address
- `GET /api/newsletter/subscribers` - list subscribers
- `POST /api/orders` - save order
- `GET /api/orders` - list orders

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB local instance or MongoDB Atlas connection string

### Frontend

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:5000
```

Install and run:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Backend

Create `florentino-backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/florentino
JWT_SECRET=change_me
```

Install and run:

```bash
cd florentino-backend
npm install
npm start
```

For development with nodemon:

```bash
cd florentino-backend
npm run dev
```

## Catalog Image Notes

Catalog item metadata lives in `src/data/catalogItems.js`. Images referenced there must be available under `public/images/<category-folder>/` so Vite can serve them at runtime.

The root `images/` folder is used as the source image collection. Keep the public image folders in sync when adding, renaming, or removing catalog assets.

## Order Flow

1. Customer browses `/catalog` or a category page.
2. Customer adds item codes to the cart.
3. Cart data is stored locally in `localStorage` under `florentinoCart`.
4. If `VITE_API_URL` is configured, cart changes are synced to `POST /api/cart/sync`.
5. Customer enters name, phone, and an optional delivery note on `/cart`.
6. The site attempts to save the order to `POST /api/orders`.
7. WhatsApp opens with a prefilled message for Florentino.

## Useful Scripts

- `npm run dev` - start Vite development server
- `npm run build` - build frontend for production
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `cd florentino-backend && npm start` - start Express backend
- `cd florentino-backend && npm run dev` - start backend with nodemon

## Deployment Notes

- Set `VITE_API_URL` to the deployed backend URL before building the frontend.
- Configure CORS on the backend if frontend and backend are deployed on different domains.
- Keep `JWT_SECRET` private and use a strong production value.
- Protect admin-style read endpoints before production, especially contact messages, orders, subscribers, and cart listing routes.
- Verify that all referenced images in `src/data/catalogItems.js` exist in `public/images`.

## License

Private project. Do not redistribute without permission.
