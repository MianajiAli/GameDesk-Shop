const mongoose = require('mongoose');
//Todo: add product url and product id
// Define the schema for attribute with Persian title
const AttributeSchema = new mongoose.Schema({
    title: {
        type: String, // Persian title for the attribute
        required: true,
    },
    values: {
        type: [String], // Values of the attribute
        default: [],
    },
});

// Define the Product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensure price is non-negative
    },

    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0, // Ensure stock is non-negative
    },
    attributes: [AttributeSchema], // Array of attributes with Persian titles
    images: {
        type: [String], // Array of image URLs
        required: true,
    },
    imageAlt: {
        type: String, // Alternate text for the images
        default: function () {
            return this.name; // Default to product name
        },
    },
    discount: {
        type: Number, // Discount amount or percentage
        default: 0,
        min: 0, // Ensure stock is non-negative
    },
    finalPrice: {
        type: Number,
        required: true,
        default: function () {
            return this.price - (this.price * (this.discount / 100));
        },
    },
}, { timestamps: true });

// Pre-save middleware to update finalPrice before saving
ProductSchema.pre('save', function (next) {
    // Ensure that discount is not negative and is within range
    if (this.discount < 0) this.discount = 0;
    if (this.discount > 100) this.discount = 100;

    // Calculate the final price
    this.finalPrice = this.price - (this.price * (this.discount / 100));

    next();
});

module.exports = mongoose.model('Product', ProductSchema);
