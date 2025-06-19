const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // Admin model
const AdminSession = require('../models/adminSession'); // Admin session model

const router = express.Router();

// 🔐 GET Admin Session (for frontend use)
router.get('/session', (req, res) => {
    console.log("📦 Admin Session Data:", req.session);

    if (!req.session.admin) {
        console.warn("⚠️ No admin session found");
        return res.status(401).json({ message: "Not logged in" });
    }

    console.log("✅ Sending session data:", req.session.admin);
    res.status(200).json(req.session.admin);
});

// 🔐 POST Admin Login
router.post('/check', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Search by email or username
        const admin = await Admin.findOne({
            $or: [{ email: username }, { username: username }]
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Store session
        req.session.admin = {
            id: admin._id,
            name: admin.fullName,
            email: admin.email,
            role: "admin",
            loginTime: new Date()
        };

        console.log("✅ Admin session stored:", req.session.admin);

        // Save to session log collection
        const newSession = new AdminSession({
            adminId: admin._id,
            name: admin.fullName,
            email: admin.email,
            sessionData: req.session.admin,
            loginTime: req.session.admin.loginTime
        });

        await newSession.save();

        res.status(200).json({ message: "Login successful!", admin: req.session.admin });

    } catch (error) {
        console.error("❌ Admin Login Error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

// 🔒 POST Logout
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Optional cookie name
        res.status(200).json({ message: "Logged out successfully!" });
    });
});

// Basic test endpoint
router.post("/", (req, res) => {
    res.send("Admin login route responding.");
});

module.exports = router;
