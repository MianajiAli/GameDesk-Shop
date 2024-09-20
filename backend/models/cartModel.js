const mongoose = require('mongoose');

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

// Pre-save middleware to calculate totalPrice before saving
CartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((total, item) => {
        return total + (item.quantity * item.product.price);
    }, 0);

    next();
});

module.exports = mongoose.model('Cart', CartSchema);
