const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model
const router = express.Router();
const session = require('express-session');

// Login Route
router.post('/check', async (req, res) => {
    try {
        console.log("Login request received:", req.body);

        const { username, password } = req.body;
        const user = await User.findOne({ $or: [{ email: username }, { registrationNumber: username }] });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        req.session.user = { id: user._id, name: user.fullName, email: user.email, accountType: user.accountType };

        const isAdmin = user.accountType === "admin"; // Determine admin status
        console.log("Account Type: Admin? "+ isAdmin);
        res.status(200).json({ message: "Login successful!", isAdmin });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
});

router.post('/', (req, res) => {
    res.send("Login route is respoding.");
});

module.exports = router;