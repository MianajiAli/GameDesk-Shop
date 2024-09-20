const mongoose = require('mongoose');

// Define the schema for the payment
const PaymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    method: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer'], // Add more payment methods as needed
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    transactionId: {
        type: String,
        unique: true, // Ensure each transaction ID is unique
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
