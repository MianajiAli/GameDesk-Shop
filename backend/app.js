const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes
const dotEnv = require('dotenv');
const cors = require('cors');

const setHeaders = require("./middlewares/headers.middlewares.js");
const errorHandler = require("./middlewares/errors.middlewares.js");

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

app.use(setHeaders);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);
// Error Handler
app.use(errorHandler)
// Export the app
module.exports = app;
