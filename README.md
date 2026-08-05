# TimeX ⌚

TimeX is a full-stack MERN e-commerce web application for selling watches. It provides a complete shopping experience for customers and a dedicated admin dashboard for managing products, orders, and store analytics.

## Features

### Customer Features

- User Registration & Login (JWT Authentication)
- Browse Watches
- Product Details Page
- Shopping Cart
- Checkout
- Order History
- Responsive Design
- About & Contact Pages

### Admin Features

- Admin Dashboard
- Store Analytics
- Manage Products
- Add Products
- Edit Products
- Delete Products
- Manage Orders
- Update Order Status
- Cloudinary Image Upload

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Nodemailer

## Folder Structure

```
TimeX
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── uploads
│   ├── utils
│   └── index.js
│
├── package.json
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/TimeX.git
cd TimeX
```

### Install Root Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

## Running the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

The application will run at:

```
Frontend
http://localhost:3000

Backend
http://localhost:5001
```

## API Modules

### Authentication

- Register User
- Login User
- Get Users

### Products

- Get All Products
- Get Product by ID
- Add Product
- Update Product
- Delete Product

### Orders

- Create Order
- Get My Orders
- Get All Orders
- Update Order Status

### Payments

- Create Razorpay Order
- Verify Payment

### Analytics

- Dashboard Statistics
- Revenue
- Orders
- Products
- Customers




## Future Improvements

- Razorpay Payment Integration
- AI Product Recommendations
- Product Search & Filtering
- Wishlist
- Customer Reviews
- Sales Forecasting
- Email Notifications
- Inventory Alerts
- Deployment on Render

## Author

**Sasmita Das**

B.Tech Computer Engineering



---

## License

This project is developed for educational and portfolio purposes.