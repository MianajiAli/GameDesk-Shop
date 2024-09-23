const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// User Registration
exports.register = [
    async (req, res) => {
        const { name, password, phoneNumber } = req.body;
        // Check for missing fields
        if (!name || !password || !phoneNumber) {
            return res.status(400).json({ message: 'همه فیلد ها الزامی می باشند' });
        }

        // Validate phone number format
        if (phoneNumber.length !== 11) {
            return res.status(400).json({ message: 'فرمت شماره تلفن صحیح نمی باشد' });
        }

        // Validate password length
        if (password.length < 6 || password.length > 30) {
            return res.status(400).json({ message: 'پسوورد باید بین ۶ تا ۳۰ کاراکتر باشد' });
        }

        try {
            // Check if email or phone number already exists
            const phoneExists = await User.findOne({ phoneNumber });

            if (phoneExists) {
                return res.status(400).json({ message: 'کاربری با این شماره تلفن موجود می باشد' });
            }

            // Create and save the user
            const user = new User({ name, password, phoneNumber });
            await user.save();

            // Send response with token
            res.status(201).json({
                message: "اکانت با موفقیت ساخته شد",
                token: generateToken(user),
                user: {
                    name: user.name,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    profilePicture: user.profilePicture,
                    status: user.status,
                    dateOfRegistration: user.dateOfRegistration,
                },
            });
        } catch (error) {
            console.log("register error:", error);
            res.status(500).json({ message: 'خطای سرور. لطفا مجددا تلاش کنید.' });
        }
    }
];
// User Login
exports.login = [
    async (req, res) => {
        const { phoneNumber, password } = req.body;

        // Check for missing fields
        if (!phoneNumber || !password) {
            return res.status(400).json({ message: 'همه فیلد ها الزامی می باشند' });
        }

        try {
            // Check if the user exists
            const user = await User.findOne({ phoneNumber });

            // Verify password
            if (user && (await user.matchPassword(password))) {
                user.lastLogin = Date.now();
                await user.save();

                // Send response with token
                res.json({
                    token: generateToken(user),
                    user: {
                        name: user.name,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        profilePicture: user.profilePicture,
                        status: user.status,
                        dateOfRegistration: user.dateOfRegistration,
                    },
                });
            } else {
                res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
            }
        } catch (error) {
            console.error("login error:", error);
            res.status(500).json({ message: 'خطای سرور. لطفا مجددا تلاش کنید.' });
        }
    }
];
// User Logout
exports.logout = (req, res) => {
    // make a black list for logout
    res.status(200).json({ message: 'Successfully logged out' });
};
