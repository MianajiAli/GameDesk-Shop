const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');


// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};
// Add item to cart with product ID validation
exports.addItemToCart = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, attributes } = req.body;

    try {
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }

        // Validate the format of productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Check if requested quantity exceeds stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${product.stock}` });
        }

        let cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });

        const itemAttributes = attributes || []; // Use empty array if attributes are not provided

        // Check if the item with the same attributes already exists in the cart
        const existingItem = cart.items.find(item =>
            item.product.equals(productId) &&
            JSON.stringify(item.attributes) === JSON.stringify(itemAttributes)
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            // Check if adding quantity exceeds stock
            if (newQuantity > product.stock) {
                return res.status(400).json({ message: `Insufficient stock. Available: ${product.stock}` });
            }

            existingItem.quantity = newQuantity; // Update quantity if attributes match
        } else {
            // Push new item with attributes (or empty array)
            cart.items.push({ product: productId, quantity, attributes: itemAttributes });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

// Update item quantity in cart with attributes
exports.updateItemQuantity = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, attributes } = req.body; // Include attributes

    try {
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemAttributes = attributes || []; // Use empty array if attributes are not provided

        // Find the item with matching product and attributes
        const item = cart.items.find(item =>
            item.product.equals(productId) &&
            JSON.stringify(item.attributes) === JSON.stringify(itemAttributes)
        );

        if (!item) return res.status(404).json({ message: 'Item not found in cart' });

        // Check if the new quantity exceeds the stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${product.stock}` });
        }

        item.quantity = quantity; // Update quantity
        await cart.save();
        res.status(200).json({ message: 'Item quantity updated', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error updating item quantity', error: error.message });
    }
};



// Delete item from cart
exports.deleteItemFromCart = async (req, res) => {
    const userId = req.userId;
    const { productId, attributes } = req.body; // Include attributes

    try {
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemAttributes = attributes || []; // Use empty array if attributes are not provided

        // Remove the item with matching product and attributes
        cart.items = cart.items.filter(item =>
            !(item.product.equals(productId) && JSON.stringify(item.attributes) === JSON.stringify(itemAttributes))
        );

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
    }
};


// Clear cart
exports.clearCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = []; // Clear items
        await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};

// See all carts (Admin only)
exports.getAllCarts = async (req, res) => {
    // Assuming you have a middleware that checks if the user is an admin
    try {
        const carts = await Cart.find().populate('items.product');
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error: error.message });
    }
};
