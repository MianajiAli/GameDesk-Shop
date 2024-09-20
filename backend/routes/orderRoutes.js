const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { user, cart, totalPrice } = req.body;
        const newOrder = new Order({ user, cart, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
