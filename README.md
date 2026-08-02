# TimeX

TimeX is an e-commerce application backend built with Node.js, Express, and MongoDB.

## Backend overview

The Express API connects to MongoDB through Mongoose and provides the core services for an e-commerce application:

- User registration, login, and JWT-based authentication
- Product catalog management, including protected admin operations and image uploads
- Order creation and order-management workflows
- Sales and product analytics endpoints
- Email notifications through Nodemailer

The server runs on port `5001` by default and exposes its API under `/api`:

- `/api/auth`
- `/api/products`
- `/api/orders`
- `/api/payments`
- `/api/analytics`

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your local credentials, then start the server:

```bash
npm run dev
```

## Scripts

- `npm start` — run the server
- `npm run dev` — run the server with Nodemon
- `npm run seed` — seed the database

## Environment

Use [`backend/.env.example`](backend/.env.example) as the template for required environment variables. Do not commit your `.env` file.
