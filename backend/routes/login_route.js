const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model
const router = express.Router();
const UserSession = require('../models/userSession');
// login session
// router.get('/session', (req, res) => {
//     console.log("Session data in backend:", req.session); // ✅ Debugging log

//     if (!req.session.user) {
//         console.error("❌ Session not found! Redirecting user.");
//         return res.status(401).json({ message: "Not logged in" });
//     }

//     console.log("✅ Sending session data:", req.session.user);
//     res.status(200).json(req.session.user);
// });

router.get("/session", (req, res) => {
    console.log("Session cookie data:", req.session.cookie); // ✅ Logs cookie details
    console.log("Stored session data:", req.session.user); // ✅ Logs user data

    if (!req.session.user) {
        return res.status(401).json({ message: "Session expired or not logged in." });
    }

    res.status(200).json({ cookie: req.session.cookie, user: req.session.user });
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
            regno: user.registrationNumber,  
            loginTime: new Date() // ✅ Store login timestamp
        };

        // 🔥 Save session globally
        global.userSessions[user._id] = req.session.user;

        console.log("✅ Session stored:", req.session.user);

        // 🔥 Save session details to MongoDB (`userSession` collection)
        const newSession = new UserSession({
            userId: user._id,
            name: user.fullName,
            email: user.email,
            faculty: user.faculty,
            regno: user.registrationNumber,
            sessionData: req.session.user,
            loginTime: req.session.user.loginTime
        });

        await newSession.save(); // ✅ Insert session into MongoDB

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
router.post("/logout", async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ message: "Not logged in!" });

        delete global.userSessions[req.session.user.id]; // ✅ Remove user session from global storage
        await UserSession.deleteOne({ userId: req.session.user.id }); // ✅ Remove session from MongoDB

        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: "Logout failed" });
            res.clearCookie("connect.sid"); // ✅ Clears session cookie
            res.status(200).json({ message: "Logged out successfully!" });
        });

    } catch (error) {
        console.error("❌ Logout error:", error);
        res.status(500).json({ message: "Error logging out", details: error.message });
    }
});
// Added: logout

router.get("/latest-session", async (req, res) => {
    try {
        if (!req.session.user) {
            console.error("❌ No session found! Redirecting user.");
            return res.status(401).json({ message: "Not logged in." });
        }

        const userId = req.session.user.id;

        // 🔥 Fetch the latest session for the logged-in user from MongoDB
        const latestSession = await UserSession.findOne({ userId })
            .sort({ loginTime: -1 }) // ✅ Sort by loginTime (most recent first)
            .limit(1); // ✅ Ensure only the latest session is retrieved

        if (!latestSession) {
            console.error("❌ No session found in MongoDB for user:", userId);
            return res.status(404).json({ message: "No session found for the user." });
        }

        console.log("✅ Sending latest session data:", latestSession);
        res.status(200).json(latestSession);

    } catch (error) {
        console.error("❌ Error fetching latest session:", error);
        res.status(500).json({ message: "Error retrieving latest session.", details: error.message });
    }
});

router.get("/global-session", async (req, res) => {
    try {
        if (!req.session.user) {
            console.error("❌ No session found! Redirecting user.");
            return res.status(401).json({ message: "Not logged in." });
        }

        const userId = req.session.user.id;

        // 🔥 Retrieve user session from global storage
        const globalSessionData = global.userSessions[userId];

        if (!globalSessionData) {
            console.error("❌ No global session found!");
            return res.status(404).json({ message: "Session not found in global storage." });
        }

        console.log("✅ Sending global session data:", globalSessionData);
        res.status(200).json(globalSessionData);

    } catch (error) {
        console.error("❌ Error fetching global session:", error);
        res.status(500).json({ message: "Error retrieving global session.", details: error.message });
    }
});

module.exports = router;