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

3. Configure MongoDB connection in [`src/config/db.js`](src/config/db.js).

### Running the Server

- For development (with nodemon):
    ```sh
    npm run dev
    ```

- For production:
    ```sh
    npm start
    ```

Server runs on port `5454` by default.

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/signin` — Login and receive JWT

### Users

- `GET /api/users/profile` — Get current user profile (JWT required)
- `GET /api/users/` — Get all users

## Environment Variables

- JWT secret is hardcoded in [`src/config/jwtProvider.js`](src/config/jwtProvider.js). For production, move it to environment variables.

## License

ISC

---# Ecommerce API (Node.js)

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

3. Configure MongoDB connection in [`src/config/db.js`](src/config/db.js).

### Running the Server

- For development (with nodemon):
    ```sh
    npm run dev
    ```

- For production:
    ```sh
    npm start
    ```

Server runs on port `5454` by default.

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/signin` — Login and receive JWT

### Users

- `GET /api/users/profile` — Get current user profile (JWT required)
- `GET /api/users/` — Get all users

## Environment Variables

- JWT secret is hardcoded in [`src/config/jwtProvider.js`](src/config/jwtProvider.js). For production, move it to environment variables.

## License

ISC

---