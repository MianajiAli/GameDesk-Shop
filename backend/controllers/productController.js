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
    const { name, price, description, category, stock, attributes, images, imageAlt, discount } = req.body;

    // Validate required fields
    if (!name || !price || !category || !stock || !images) {
        return res.status(400).json({ message: 'Name, price, category, stock, and images are required' });
    }

    // Convert price to a number
    const parsedPrice = parseFloat(price);
    // Convert stock to an integer
    const parsedStock = parseInt(stock, 10);
    // Convert discount to a number and ensure it's within range
    const parsedDiscount = parseFloat(discount);

    // Check if parsedPrice is a valid number
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        return res.status(400).json({ message: 'Invalid price value. It must be a number greater than 0.' });
    }

    // Check if parsedStock is a valid integer and non-negative
    if (isNaN(parsedStock) || parsedStock < 0) {
        return res.status(400).json({ message: 'Invalid stock value. It must be a non-negative integer.' });
    }

    // Check if parsedDiscount is a valid number within the range [0, 100]
    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
        return res.status(400).json({ message: 'Invalid discount value. It must be a number between 0 and 100.' });
    }

    try {
        // Create the product object
        const product = new Product({
            name,
            price: parsedPrice,  // Ensure price is a number
            description,
            category,
            stock: parsedStock,  // Ensure stock is an integer
            attributes,   // Optional attributes
            images,       // Array of image URLs
            imageAlt: imageAlt || name, // Default to name if not provided
            discount: parsedDiscount,    // Ensure discount is a number
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, stock, attributes, images, imageAlt, discount } = req.body;

    // Convert discount to a number and ensure it's within range
    const parsedDiscount = parseFloat(discount);

    // Check if parsedDiscount is a valid number within the range [0, 100]
    if (discount !== undefined && (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100)) {
        return res.status(400).json({ message: 'Invalid discount value. It must be a number between 0 and 100.' });
    }

    try {
        // Find the product by ID and update it with the request body
        const product = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            category,
            stock,
            attributes,
            images,     // Array of image URLs
            imageAlt,   // Alternate text for images
            discount: discount !== undefined ? parsedDiscount : undefined, // Ensure discount is a number if provided
        }, { new: true });

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
