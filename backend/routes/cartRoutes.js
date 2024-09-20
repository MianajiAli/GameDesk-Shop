const express = require('express');
const {
    createCart,
    getCartByUserId,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart,
    clearCart,
    getAllCarts,
} = require('../controllers/cartController'); // Adjust the path as necessary
const { protect, admin } = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

// Protected route to get cart by user ID
router.get('/',
    protect,
    getCartByUserId); // Get cart by user ID

// Protected routes for cart management
// router.post('/', protect, createCart); // Create a new cart
router.post('/', protect, addItemToCart); // Add item to cart
router.put('/item', protect, updateItemQuantity); // Update item quantity in cart
router.delete('/item', protect, deleteItemFromCart); // Remove item from cart
router.delete('/clear', protect, clearCart); // Clear cart

// Admin route to see all carts
router.get('/all',
    // protect, admin,
    getAllCarts); // Get all carts (Admin only)

module.exports = router;
