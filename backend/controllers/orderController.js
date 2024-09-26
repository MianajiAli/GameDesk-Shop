const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Create an order from the user's cart
exports.createOrderFromCart = async (req, res) => {
    const userId = req.userId;

    try {
        // Find the user's active cart
        let cart = await Cart.findOne({ user: userId, status: 'active' }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'سبد خرید پیدا نشد یا فعال نیست.' });

        // Check stock availability for each item
        for (const item of cart.items) {
            if (item.quantity > item.product.stock) {
                return res.status(400).json({
                    message: `موجودی محصول "${item.product.name}" کافی نیست. موجودی فعلی: ${item.product.stock}`
                });
            }
        }

        // Calculate total price from the cart items
        const totalPrice = cart.items.reduce((total, item) => total + (item.product.finalPrice * item.quantity), 0);

        // Create the order with a reference to the cart
        const order = new Order({
            user: userId,
            totalPrice, // Use the calculated total price
            cart: cart._id, // Reference to the cart
            status: 'pending', // Default status when creating an order
        });

        // Save the order
        await order.save();

        // Reduce stock for each product in the order
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // Set the cart status to "ordered" and save it
        cart.status = 'ordered';
        await cart.save();

        res.status(201).json({ message: 'سفارش با موفقیت ثبت شد', order });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'خطا در ایجاد سفارش', error: error.message });
    }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID and populate the cart details
        const order = await Order.findById(orderId).populate('cart').populate({ path: 'cart.items.product' });
        if (!order) return res.status(404).json({ message: 'سفارش پیدا نشد.' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت سفارش', error: error.message });
    }
};

// Get all orders for a specific user
exports.getOrdersByUserId = async (req, res) => {
    const userId = req.userId;

    try {
        // Find all orders for the logged-in user and populate the cart details
        const orders = await Order.find({ user: userId }).populate('cart').populate({ path: 'cart.items.product' });
        if (!orders.length) return res.status(404).json({ message: 'سفارشی پیدا نشد.' });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت سفارشات', error: error.message });
    }
};

// Admin: Update the status of an order
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // Expect the new status in the request body

    try {
        // Validate that the status is provided
        if (!status) return res.status(400).json({ message: 'وضعیت سفارش الزامی است.' });

        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'سفارش پیدا نشد.' });

        // Update the order status
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'وضعیت سفارش بروزرسانی شد', order });
    } catch (error) {
        res.status(500).json({ message: 'خطا در بروزرسانی وضعیت سفارش', error: error.message });
    }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        // Find all orders and populate the cart details
        const orders = await Order.find().populate('cart').populate({ path: 'cart.items.product' });
        if (!orders.length) return res.status(404).json({ message: 'سفارشی پیدا نشد.' });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت سفارشات', error: error.message });
    }
};
