const mongoose = require('mongoose');

// Define the Order schema
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Reference to the Cart model
        required: true, // Ensure this field is required if needed
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
