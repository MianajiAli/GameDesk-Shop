const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// User Registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: 'User already exists' });

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({
            token: generateToken(user),
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: generateToken(user),
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
