const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Create new product (admin only)
exports.createProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;
    const product = new Product({ name, price, description, category, stock });
    await product.save();
    res.status(201).json(product);
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
};
