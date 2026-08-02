require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not set. Please add it to your .env file.');
      process.exit(1);
    }

    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = await User.insertMany([
      {
        username: 'adminuser',
        email: 'admin@example.com',
        password: hashedPassword,
        role: ['admin'],
        verified: true,
      },
      {
        username: 'jenny',
        email: 'jenny@example.com',
        password: hashedPassword,
        role: ['user'],
        verified: true,
      },
      {
        username: 'mike',
        email: 'mike@example.com',
        password: hashedPassword,
        role: ['user'],
        verified: false,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Classic Watch',
        description: 'Elegant stainless steel watch for everyday wear.',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
        category: 'Watches',
        stockQuantity: 15,
        rating: 4.7,
        numReviews: 18,
      },
      {
        name: 'Smart Fitness Watch',
        description: 'A modern smartwatch that tracks steps, heart rate, sleep, and workouts.',
        price: 99.5,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
        category: 'Watches',
        stockQuantity: 25,
        rating: 4.4,
        numReviews: 12,
      },
      {
        name: 'Leather Strap Watch',
        description: 'Classic analog watch with a premium leather strap and stainless-steel case.',
        price: 149.0,
        imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
        category: 'Watches',
        stockQuantity: 10,
        rating: 4.8,
        numReviews: 9,
      },
    ]);

    const order = await Order.create({
      user: users[1]._id,
      items: [
        {
          productId: products[0]._id,
          quantity: 1,
          price: products[0].price,
        },
        {
          productId: products[1]._id,
          quantity: 2,
          price: products[1].price,
        },
      ],
      totalAmount: 129.99 + 99.5 * 2,
      address: {
        fullname: 'Jenny Doe',
        street: '123 Market Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
      },
      paymentId: 'pay_dummy_001',
      status: 'pending',
    });

    console.log('Seed data inserted successfully.');
    console.log(`Created ${users.length} users, ${products.length} products, and 1 order.`);
    console.log('Admin login — email: admin@example.com | password: 123456');
    console.log(`Sample order ID: ${order._id}`);
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
