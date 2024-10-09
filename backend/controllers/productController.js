const Product = require('../models/productModel');

// Get all products with pagination, sorting, filtering, and search
exports.getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'createdAt'; // Default sorting by createdAt
    const order = req.query.order === 'desc' ? -1 : 1; // Default order is ascending
    const filters = {};

    // Filtering by category, price range, etc.
    if (req.query.category) filters.category = req.query.category;
    if (req.query.minPrice) filters.price = { $gte: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: parseFloat(req.query.maxPrice) };
    if (req.query.search) filters.name = { $regex: req.query.search, $options: 'i' }; // Case-insensitive search

    try {
        // Fetch products with filtering, sorting, pagination
        const products = await Product.find(filters)
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(filters);

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};
// Get related products by category (or other criteria)
exports.getRelatedProducts = async (req, res) => {
    const { id } = req.params; // The product ID

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }, // Exclude the current product
            isDeleted: false
        }).limit(10); // Limit the number of related products

        res.status(200).json(relatedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching related products', error: error.message });
    }
};
// Fetch all featured products
exports.getFeaturedProducts = async (req, res) => {
    try {
        // Use the static method to fetch featured products that are not deleted
        const featuredProducts = await Product.findFeatured();

        if (featuredProducts.length === 0) {
            return res.status(404).json({ message: 'No featured products found' });
        }

        res.status(200).json({
            count: featuredProducts.length,
            data: featuredProducts,
        });
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        res.status(500).json({ message: 'Error fetching featured products', error: error.message });
    }
};
// Fetch most discounted featured products
exports.getMostDiscountedProducts = async (req, res) => {
    try {
        const discountedFeaturedProducts = await Product.find({
            isDeleted: false // Exclude deleted products
        }).sort({ discount: -1 }) // Sort by discount in descending order
            .limit(4); // Limit the number of results to 10

        if (discountedFeaturedProducts.length === 0) {
            return res.status(404).json({ message: 'No discounted featured products found' });
        }

        res.status(200).json({
            count: discountedFeaturedProducts.length,
            data: discountedFeaturedProducts,
        });
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        res.status(500).json({ message: 'Error fetching discounted featured products', error: error.message });
    }
};

// Get newest products
exports.getNewestProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 4; // Limit the number of products, default to 10

    try {
        // Fetch newest products by sorting by 'createdAt' in descending order
        const newestProducts = await Product.find({ isDeleted: false }) // Exclude deleted products
            .sort({ createdAt: -1 }) // Sort by creation date, descending
            .limit(limit); // Limit the number of results

        if (newestProducts.length === 0) {
            return res.status(404).json({ message: 'No newest products found' });
        }

        res.status(200).json({
            count: newestProducts.length,
            data: newestProducts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching newest products', error: error.message });
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
    const { name, price, description, category, stock, attributes, images, imageAlt, discount, productUrl, featured } = req.body;

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
            discount,
            productUrl,
            featured // Update featured field
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
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.softDelete(); // Soft delete the product
        res.status(200).json({ message: 'Product soft deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
