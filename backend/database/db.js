const mongoose = require('mongoose');

// Load environment variables for MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapi';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if the DB connection fails
    }
};

module.exports = connectDB;
