# Gaming News & Reviews

A full stack web app for writing and updating game reviews and browsing gaming news.

- **Stack:** Node.js + Express (backend),Vue 3 + Pinia + Vue Router (frontend), MongoDB (database)

---

## Features

- JWT-based authentication (register & login)
- Authenticated user profile (view & update)
- CRUD operations for game reviews
- Gaming news and top-rated games feed
- Dark, card-based UI with a global navbar and routed pages

---

## Project Structure

```text
.
├── backend/
│   ├── config/        # DB connection (db.js)
│   ├── controllers/   # auth, user, review, news controllers
│   ├── middleware/    # authMiddleware, errorMiddleware
│   ├── models/        # data models (e.g. User, Review)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── newsRoutes.js
│   ├── utils/         # helpers
│   └── server.js      # Express app entry
└── frontend/
    └── src/
        ├── api/       # Axios instance with Bearer token
        ├── components/
        │   └── Navbar.vue
        ├── router/    # Vue Router configuration
        ├── store/     # Pinia stores (state management)
        ├── views/     # Pages (auth, reviews, news, etc.)
        ├── App.vue    # Root layout
        └── main.js    # Vue app bootstrap
```

Key endpoints (base: `/api`):

- **Auth** (`backend/routes/authRoutes.js`)
  - `POST /api/auth/register` – register user
  - `POST /api/auth/login` – login and get token

- **Users** (`backend/routes/userRoutes.js`, protected by `protect`)
  - `GET /api/users/profile` – get logged-in user profile
  - `PUT /api/users/profile` – update logged-in user profile

- **Reviews** (`backend/routes/reviewRoutes.js`, protected)
  - `POST /api/resource/` – create review
  - `GET  /api/resource/` – list reviews
  - `GET  /api/resource/:id` – get review by id
  - `PUT  /api/resource/:id` – update review
  - `DELETE /api/resource/:id` – delete review

- **News** (`backend/routes/newsRoutes.js`)
  - `GET /api/news/` – gaming news
  - `GET /api/news/top-rated` – top-rated games

The frontend Axios instance attaches `Authorization: Bearer <token>` to protected routes using a token from `localStorage`.

## Running the App

### Backend

```bash
cd backend
npm install
# configure .env (PORT, DB URI, JWT_SECRET)
npm start
```

### Frontend

```bash
cd frontend
npm install
# set VITE_API_URL (default http://localhost:5000)
npm run dev
```
