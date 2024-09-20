const mongoose = require('mongoose');

// Define the schema for the order
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Reference to the Cart model
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
