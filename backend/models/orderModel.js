const mongoose = require('mongoose');

// Define the schema for order items
const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true, // Final price when the order was placed
    },
    attributes: {
        type: Array, // Product attributes (e.g., color, size, etc.)
        default: [],
    }
});

// Define the Order schema
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [OrderItemSchema], // Array of order items
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
