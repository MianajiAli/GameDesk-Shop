const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById); // Route to get a product by ID

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
