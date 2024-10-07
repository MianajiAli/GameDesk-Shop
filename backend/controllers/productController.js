const Product = require('../models/productModel');

// Get all products with pagination
exports.getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 20; // Default to 20 items per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    try {
        // Fetch products with skip and limit
        const products = await Product.find({})
            .skip(skip)
            .limit(limit);

        // Count total products for pagination
        const total = await Product.countDocuments();

        // Send response with total, current page, total pages, and products
        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit), // Calculate total pages
            products,
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};


// Create new products (admin only)
exports.createProduct = async (req, res) => {
    const productsData = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it is an array

    // Validate required fields for each product
    const invalidProducts = productsData.filter(product => {
        const { name, price, category, stock, images, productUrl } = product;
        return !name || !price || !category || !stock || !images || !productUrl;
    });

    if (invalidProducts.length > 0) {
        return res.status(400).json({
            message: 'name, price, category, stock, images, and productUrl are required for each product',
            invalidProducts
        });
    }

    try {
        const products = await Product.insertMany(productsData.map(product => ({
            ...product,
            price: parseFloat(product.price),
            stock: parseInt(product.stock, 10),
            discount: parseFloat(product.discount) || 0,
            imageAlt: product.imageAlt || product.name, // Default to name if not provided
        })));

        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error creating products', error: error.message });
    }
};



// Update product (admin only)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, stock, attributes, images, imageAlt, discount, productUrl } = req.body;

    const parsedDiscount = parseFloat(discount);

    if (discount !== undefined && (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100)) {
        return res.status(400).json({ message: 'Invalid discount value. It must be a number between 0 and 100.' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            category,
            stock,
            attributes,
            images,
            imageAlt,
            discount: discount !== undefined ? parsedDiscount : undefined,
            productUrl
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
