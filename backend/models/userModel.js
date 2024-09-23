const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    addresses: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active',
    },
    dateOfBirth: {
        type: Date,
        // No `required` field here, making it optional
    },
    profilePicture: {
        type: String,
        default: 'default.jpg', // Default profile picture URL
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
    },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
