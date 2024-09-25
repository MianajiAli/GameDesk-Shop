const express = require('express');
const {
    createOrderFromCart,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus,
    getAllOrders,
} = require('../controllers/orderController'); // Adjust the path as necessary
const { protect, admin } = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

// Protected route to create an order from a cart
router.post('/', protect, createOrderFromCart); // Transform cart to order

// Protected route to get a specific order by ID
router.get('/order/:orderId', protect, getOrderById); // Get an order by ID

// Protected route to get all orders for a specific user
router.get('/', protect, getOrdersByUserId); // Get all orders for the logged-in user

// Admin-only route to update order status (e.g., change to 'Shipped' or 'Delivered')
router.put('/order/:orderId/status', protect, admin, updateOrderStatus); // Update order status (admin only)

// Admin-only route to get all orders
router.get('/all', getAllOrders); // Get all orders (admin only)

module.exports = router;
