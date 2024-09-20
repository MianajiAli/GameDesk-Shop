const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
    try {
        const { order, amount, method, transactionId } = req.body;
        const newPayment = new Payment({ order, amount, method, transactionId });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get payment details for an order
router.get('/:orderId', async (req, res) => {
    try {
        const payments = await Payment.find({ order: req.params.orderId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update payment status
router.patch('/:id', async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
