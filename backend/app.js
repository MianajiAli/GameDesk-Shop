const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dotEnv = require('dotenv');

// Initialize environment variables
dotEnv.config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse request bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Export the app
module.exports = app;
