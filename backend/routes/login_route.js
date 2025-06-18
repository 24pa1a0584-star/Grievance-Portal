const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model
const router = express.Router();
const session = require("express-session");
// login session
router.get('/session', (req, res) => {
    console.log("Session data in backend:", req.session); // ✅ Debugging log

    if (!req.session.user) {
        console.error("❌ Session not found! Redirecting user.");
        return res.status(401).json({ message: "Not logged in" });
    }

    console.log("✅ Sending session data:", req.session.user);
    res.status(200).json(req.session.user);
});

// Login Route
router.post('/check', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ $or: [{ email: username }, { registrationNumber: username }] });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        req.session.user = {  
            id: user._id,  
            name: user.fullName,  
            email: user.email,  
            faculty: user.faculty,  
            regno: user.registrationNumber  
        };

        console.log("✅ Session stored:", req.session.user);
        res.status(200).json({ message: "Login successful!", user: req.session.user });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
});

router.post('/', (req, res) => {
    res.send("Login route is respoding.");
});

// Add: logout 
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // ✅ Clears session cookie
        res.status(200).json({ message: "Logged out successfully!" });
    });
});
// Added: logout

module.exports = router;