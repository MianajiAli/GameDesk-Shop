const mongoose = require('mongoose');

// Define the schema for cart item attributes
const AttributeSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true, // E.g., 'color', 'size', etc.
    },
    value: {
        type: String,
        required: true, // E.g., 'red', 'medium', etc.
    }
});

// Define the schema for cart items
const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one item
    },
    attributes: {
        type: [AttributeSchema], // Array of key-value attributes
        default: [] // Default to an empty array if no attributes are provided
    }
});

// Define the Cart schema
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (optional)
        required: true,
    },
    items: [CartItemSchema], // Array of cart items
    totalPrice: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
