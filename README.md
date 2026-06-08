# GetYourTicket

A travel booking platform built with Vue 3 + Express + PostgreSQL.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vue 3, Pinia, Vite, Tailwind CSS, vue-router |
| Backend | Express.js, Prisma ORM, JWT auth |
| Database | PostgreSQL |
| Languages | 8 languages via `localeStore.t()` |

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL running on `localhost:5432`

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/getyourticket"
JWT_SECRET="your-secret-key"
```

### 3. Seed database

```bash
cd server
npx prisma db push
npm run seed
```

### 4. Start development servers

Terminal 1 (backend on port 5000):
```bash
cd server
npm run dev
```

Terminal 2 (frontend on port 5173):
```bash
cd client
npm run dev
```

Visit `http://localhost:5173`

## Test user

- **Email:** tester@example.com
- **Password:** test123

## Project structure

```
client/src/
  api.js              - API client (fetch wrapper)
  stores/             - Pinia stores (auth, booking, locale, currency)
  views/              - Route pages
  components/         - Reusable components
    cards/            - ExperienceCard, SearchCard, CountryCard
    sections/         - Homepage sections
    ui/               - SkeletonBlock, SkeletonCard, Toast, Modal...
    experience/       - Experience detail components (gallery, booking card, reviews...)
    Navbar/           - Navigation components
    footer/           - Footer components
  composables/        - useRecentlyViewed, useNavSearch, useSearchSuggestions
  i18n/translations.js - All 8 language translations

server/src/
  controllers/        - Route handlers
  routes/             - Express routers
  middleware/         - Auth middleware (JWT)
  prisma/schema.prisma - Database schema
```

## Features

- Browse 690+ listings across 8 categories, 243 countries
- Search by keyword, location, or category
- Multi-language (8 languages), multi-currency (7 currencies)
- User auth (JWT), wishlist lists, bookings/reviews
- Cart with checkout flow
- Newsletter signup
- Recently viewed experiences

## API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/listings | No | All listings |
| GET | /api/listings/:id | No | Single listing |
| GET | /api/countries | No | All countries |
| GET | /api/reviews | No | Reviews (optional ?expId) |
| GET | /api/site-content/:key | No | Site content by key |
| POST | /api/data/newsletter/subscribe | No | Subscribe email |
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Current user |
| POST | /api/user/bookings | Yes | Create booking |
| GET | /api/user/bookings | Yes | User bookings |
| PUT | /api/user/bookings/:id/cancel | Yes | Cancel booking |
| POST | /api/user/reviews | Yes | Create review |
| PUT | /api/user/profile | Yes | Update profile |
| GET/POST/DELETE | /api/user/wishlist-lists | Yes | Wishlist lists CRUD |
| POST/DELETE | /api/user/wishlist-lists/:id/items | Yes | Wishlist items |
