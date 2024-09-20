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
    },
    itemTotal: {
        type: Number,
        default: 0, // This will be calculated before saving
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

// Add a pre-save hook to calculate item totals and total price
CartSchema.pre('save', async function (next) {
    const cart = this;
    let total = 0;

    // Populate the product field to get product prices
    await cart.populate('items.product');

    // Calculate the total price by summing each item's price * quantity
    cart.items.forEach(item => {
        if (item.product && item.quantity) {
            // Calculate the item total
            item.itemTotal = item.product.finalPrice * item.quantity;
            // Add to the total cart price
            total += item.itemTotal;
        }
    });

    // Set the total price of the cart
    cart.totalPrice = total;
    next();
});

module.exports = mongoose.model('Cart', CartSchema);
