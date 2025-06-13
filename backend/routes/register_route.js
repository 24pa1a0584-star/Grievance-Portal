const express=require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Studnet Grievance Portal-Register User");
});

// Register User (POST Request)
router.post('/register', async (req, res) => {
    try {
        const { registrationNumber, fullName, email, password, academicYear, phone, faculty } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered with this email!" });
        }

        // Create new user
        const newUser = new User({
            registrationNumber,
            fullName,
            email,
            password, // Hash this for security (bcrypt recommended)
            academicYear,
            phone,
            faculty
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user", details: error.message });
    }
});


module.exports=router;