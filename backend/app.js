const express = require('express');
const connectDB = require('./database/db');
const routes = require('./routes');

// Create an Express app
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use routes
app.use('/api', routes);

// Connect to MongoDB
connectDB();

module.exports = app;
