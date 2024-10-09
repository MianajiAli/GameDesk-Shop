const mongoose = require('mongoose');

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
        min: 0, // Ensure discount is non-negative
    },
    finalPrice: {
        type: Number,
        required: true,
        default: function () {
            return this.price - (this.price * (this.discount / 100));
        },
    },
    productUrl: {
        type: String, // URL for the product page
        // required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default to not deleted
    },
    featured: {
        type: Boolean,
        default: false, // Default to not featured
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

// Static method to get all products that are not deleted
ProductSchema.statics.findNotDeleted = function (filters = {}) {
    return this.find({ isDeleted: false, ...filters });
};

// Static method to get all featured products
ProductSchema.statics.findFeatured = function () {
    return this.find({ isDeleted: false, featured: true });
};

// Instance method to soft delete a product
ProductSchema.methods.softDelete = function () {
    this.isDeleted = true;
    return this.save();
};

module.exports = mongoose.model('Product', ProductSchema);
