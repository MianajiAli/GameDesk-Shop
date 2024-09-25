const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    discountPercentage: {
        type: Number, // Percentage discount (0-100)
        min: 0,
        max: 100,
        default: 0,
    },
    discountAmount: {
        type: Number, // Flat discount amount (currency)
        min: 0,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    shippingAddress: {
        type: String
    },
    transactionId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// To calculate the final price after applying the discount (this is done in the application logic):
OrderSchema.methods.getFinalPrice = function () {
    let finalPrice = this.totalPrice;

    if (this.discountPercentage > 0) {
        finalPrice -= (this.totalPrice * (this.discountPercentage / 100));
    }

    if (this.discountAmount > 0) {
        finalPrice -= this.discountAmount;
    }

    return finalPrice < 0 ? 0 : finalPrice; // Ensure final price is not negative
};

module.exports = mongoose.model('Order', OrderSchema);
