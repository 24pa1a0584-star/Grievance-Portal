const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model
const router = express.Router();
const session = require('express-session');

require('dotenv').config();

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by registration number or email
        const user = await User.findOne({ $or: [{ email: username }, { registrationNumber: username }] });

        if (!user) return res.status(404).json({ message: "User not found!" });

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        // Store user session data
        req.session.user = { id: user._id, name: user.fullName, email: user.email, accountType: user.accountType };

        // Redirect based on account type
        const redirectPage = user.accountType === "admin" ? "/dashboard.html" : "/student-dashboard.html";

        res.status(200).json({ message: "Login successful!", redirect: redirectPage });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
});

module.exports = router;