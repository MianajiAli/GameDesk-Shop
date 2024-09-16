const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Create new product (admin only)
exports.createProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    // Validate input
    console.log(
        req.body
    )
    if (!name || !price || !description || !category || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const product = new Product({ name, price, description, category, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
