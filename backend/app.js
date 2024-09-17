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
app.use(express.urlencoded({ extended: true })); // This is needed to parse URL-encoded payloads
app.use(express.static('./storage'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Export the app
module.exports = app;
