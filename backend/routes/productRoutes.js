const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
    getFeaturedProducts, // Import the getFeaturedProducts controller
    getMostDiscountedProducts,
    getNewestProducts // Import the new getNewestProducts controller
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getProducts); // Route to get all products with filters, pagination, sorting, etc.
router.get('/featured', getFeaturedProducts); // Route to get all featured products
router.get('/discounted', getMostDiscountedProducts); // Route to get most discounted products
router.get('/newest', getNewestProducts); // Route to get newest products
router.get('/:id', getProductById); // Route to get a product by ID
router.get('/:id/related', getRelatedProducts); // Route to get related products based on category

// Admin routes
router.post('/', protect, admin, createProduct); // Route to create a new product (admin only)
router.put('/:id', protect, admin, updateProduct); // Route to update an existing product by ID (admin only)
router.delete('/:id', protect, admin, deleteProduct); // Route to delete a product by ID (admin only)

module.exports = router;
