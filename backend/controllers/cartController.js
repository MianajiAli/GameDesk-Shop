const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Helper function to check if the cart is active
const isCartActive = (cart) => cart && cart.status === 'active';

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'سبد خرید پیدا نشد' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت سبد خرید', error: error.message });
    }
};

// Add item to cart with product ID validation (only for active carts)
exports.addItemToCart = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, attributes } = req.body;

    try {
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'شناسه محصول و تعداد مورد نیاز است.' });
        }

        // Validate the format of productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'فرمت شناسه محصول نامعتبر است.' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'محصول پیدا نشد.' });
        }

        // Check if requested quantity exceeds stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: `موجودی کافی نیست. موجودی فعلی: ${product.stock}` });
        }

        let cart = await Cart.findOne({ user: userId });

        if (cart && !isCartActive(cart)) {
            return res.status(400).json({ message: 'امکان تغییر در سبد خرید غیرفعال وجود ندارد.' });
        }

        cart = cart || new Cart({ user: userId, items: [] });

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
                return res.status(400).json({ message: `موجودی کافی نیست. موجودی فعلی: ${product.stock}` });
            }

            existingItem.quantity = newQuantity; // Update quantity if attributes match
        } else {
            // Push new item with attributes (or empty array)
            cart.items.push({ product: productId, quantity, attributes: itemAttributes });
        }

        await cart.save();
        res.status(200).json({ message: 'آیتم به سبد خرید اضافه شد', cart });
    } catch (error) {
        res.status(500).json({ message: 'خطا در اضافه کردن آیتم به سبد خرید', error: error.message });
    }
};

// Update item quantity in cart (only for active carts)
exports.updateItemQuantity = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, attributes } = req.body;

    try {
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'شناسه محصول و تعداد مورد نیاز است.' });
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'تعداد باید یک عدد صحیح مثبت باشد.' });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'فرمت شناسه محصول نامعتبر است.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'محصول پیدا نشد.' });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'سبد خرید پیدا نشد' });

        if (!isCartActive(cart)) {
            return res.status(400).json({ message: 'امکان تغییر در سبد خرید غیرفعال وجود ندارد.' });
        }

        const itemAttributes = attributes || [];

        const item = cart.items.find(item =>
            item.product.equals(productId) &&
            JSON.stringify(item.attributes) === JSON.stringify(itemAttributes)
        );

        if (!item) return res.status(404).json({ message: 'آیتم در سبد خرید پیدا نشد' });

        if (quantity > product.stock) {
            return res.status(400).json({ message: `موجودی کافی نیست. موجودی فعلی: ${product.stock}` });
        }

        item.quantity = quantity;

        await cart.save();
        res.status(200).json({ message: 'تعداد آیتم بروزرسانی شد', cart });
    } catch (error) {
        res.status(500).json({ message: 'خطا در بروزرسانی تعداد آیتم', error: error.message });
    }
};

// Delete item from cart (only for active carts)
exports.deleteItemFromCart = async (req, res) => {
    const userId = req.userId;
    const { productId, attributes } = req.body;

    try {
        if (!productId) {
            return res.status(400).json({ message: 'شناسه محصول مورد نیاز است.' });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'سبد خرید پیدا نشد' });

        if (!isCartActive(cart)) {
            return res.status(400).json({ message: 'امکان حذف آیتم در سبد خرید غیرفعال وجود ندارد.' });
        }

        const itemAttributes = attributes || [];

        cart.items = cart.items.filter(item =>
            !(item.product.equals(productId) && JSON.stringify(item.attributes) === JSON.stringify(itemAttributes))
        );

        await cart.save();
        res.status(200).json({ message: 'آیتم از سبد خرید حذف شد', cart });
    } catch (error) {
        res.status(500).json({ message: 'خطا در حذف آیتم از سبد خرید', error: error.message });
    }
};

// Clear cart (only for active carts)
exports.clearCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'سبد خرید پیدا نشد' });

        if (!isCartActive(cart)) {
            return res.status(400).json({ message: 'امکان خالی کردن سبد خرید غیرفعال وجود ندارد.' });
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'سبد خرید با موفقیت خالی شد', cart });
    } catch (error) {
        res.status(500).json({ message: 'خطا در خالی کردن سبد خرید', error: error.message });
    }
};

// See all carts (Admin only)
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('items.product');
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت سبدهای خرید', error: error.message });
    }
};
