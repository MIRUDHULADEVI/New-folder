const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config(); // 👈 THIS should come BEFORE accessing process.env

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
// app.js or server.js
const orderRoutes = require('./routes/order.routes');

const app = express();
const path = require('path');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // 👈 This line is crucial
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Root route (optional)
app.get('/', (req, res) => {
  res.send('🎉 Backend is working fine!');
});

// DB connection
console.log("MONGODB_URI:", process.env.MONGODB_URI); // ✅ confirm it is not undefined
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

module.exports = app;
