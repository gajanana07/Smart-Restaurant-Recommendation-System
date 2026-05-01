# Smart Restaurant Recommendation System

A production-ready full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This system allows users to explore restaurants, view details, read and write reviews, and maintain a list of favorite restaurants.

## 🚀 Tech Stack

### Backend

- **Node.js** & **Express.js**: RESTful API creation
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT (JSON Web Tokens)**: Authentication and authorization
- **Bcrypt.js**: Password hashing
- **Dotenv**: Environment variable management

### Frontend

- **React (Vite)**: Fast, modern frontend framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icons

## 📁 Folder Structure

```
rest/
│
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── middleware/      # Custom middleware (auth, error handling)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── .env             # Environment variables (create this)
│   ├── package.json
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # React Context for global state (Auth)
    │   ├── pages/       # Application pages
    │   ├── services/    # API connection configuration
    │   ├── App.jsx      # Main application component & routing
    │   ├── index.css    # Global styles & Tailwind
    │   └── main.jsx     # React entry point
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── package.json
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas URI.

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Ensure your `backend/.env` file has the following (modify `MONGO_URI` if using Atlas):
4. Start the server:
   ```bash
   npm start
   # or for development mode:
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The application will be accessible at `http://localhost:5173`.

## 🌐 API Endpoints Summary

### Authentication (`/api/auth`)

- `POST /register`: Register a new user
- `POST /login`: Authenticate user and get token
- `GET /me`: Get current logged-in user profile (Protected)

### Restaurants (`/api/restaurants`)

- `GET /`: Get all restaurants (supports query params: `search`, `cuisine`, `rating`, `sort`, `page`)
- `POST /`: Create a new restaurant (Protected)
- `GET /:id`: Get single restaurant details

### Reviews (`/api/reviews`)

- `POST /:restaurantId`: Add a review for a restaurant (Protected, one review per user)

### Favorites (`/api/favorites`)

- `GET /`: Get logged-in user's favorite restaurants (Protected)
- `POST /:restaurantId`: Toggle (add/remove) a restaurant to/from favorites (Protected)

---

Enjoy exploring and reviewing restaurants with the Smart Restaurant Recommendation System!
