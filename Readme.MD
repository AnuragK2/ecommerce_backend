# Ecommerce API (Node.js)

A RESTful API backend for an ecommerce platform built with Node.js, Express, and MongoDB (Mongoose).

## Features

- User registration and authentication (JWT)
- User profile management
- Product, category, cart, and order management
- Cart item operations
- Ratings and reviews
- Modular code structure

## Project Structure

```
src/
  config/           # Database and JWT config
  controller/       # Route controllers
  models/           # Mongoose models
  routes/           # Express route definitions
  services/         # Business logic/services
  index.js          # Express app setup
  server.js         # App entry point
package.json
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB database (Atlas or local)

### Installation

1. Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd ecommerce_backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure MongoDB and JWT secret in environment variables:
    - Create a `.env` file in the root directory:
        ```
        MONGODB_URI=<your-mongodb-uri>
        JWT_SECRET=<your-jwt-secret>
        PORT=5454
        ```

### Running the Server

- For development (with nodemon):
    ```sh
    npm run dev
    ```

- For production:
    ```sh
    npm start
    ```

Server runs on port `5454` by default (configurable via `.env`).

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/signin` — Login and receive JWT

### Users

- `GET /api/users/profile` — Get current user profile (JWT required)
- `GET /api/users` — Get all users

### Products

- `GET /api/products` — List all products
- `GET /api/products/:id` — Get product details
- `POST /api/products` — Add new product (admin only)
- `PUT /api/products/:id` — Update product (admin only)
- `DELETE /api/products/:id` — Delete product (admin only)

### Categories

- `GET /api/categories` — List all categories
- `POST /api/categories` — Add new category (admin only)

### Cart

- `GET /api/cart` — Get current user's cart
- `POST /api/cart` — Add item to cart
- `PUT /api/cart/:itemId` — Update cart item quantity
- `DELETE /api/cart/:itemId` — Remove item from cart

### Orders

- `POST /api/orders` — Place an order
- `GET /api/orders` — Get user's orders
- `GET /api/orders/:id` — Get order details

### Ratings & Reviews

- `POST /api/products/:id/reviews` — Add review to product
- `GET /api/products/:id/reviews` — Get product reviews

## Environment Variables

All secrets and configuration (MongoDB URI, JWT secret, port) should be set in a `.env` file.  
**Do not hardcode secrets in source files.**