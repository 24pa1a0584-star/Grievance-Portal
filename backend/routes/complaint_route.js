const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.post("/test", (req, res) => {
  console.log("🚀 Test route hit");
  res.status(200).json({ message: "Test route works!" });
});


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Submit a complaint
router.post("/submit", upload.array("evidence"), async (req, res) => {
    console.log("📥 Complaint submit route hit"); 
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Not logged in" });

    const { title, description, priority, category } = req.body;

    const evidence = req.files.map((file) => ({
      filename: file.filename,
      filetype: file.mimetype,
      url: `/uploads/${file.filename}`,
    }));


            req.session.user = {  
            id: user._id,  
            name: user.fullName,  
            email: user.email,  
            faculty: user.faculty,  
            regno: user.registrationNumber,  
            loginTime: new Date() // ✅ Store login timestamp
        };
    const complaint = new Complaint({
      studentId: user.id,
      title,
      description,
      priority,
      category,
      evidence,
      studentName : user.name,
      studentFaculty : user.faculty,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ error: "Failed to submit complaint", details: err.message });
  }
});

// Get all complaints (admin view)
router.get("/admin/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("studentId", "fullName registrationNumber faculty");
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch complaints", details: err.message });
  }
});

// Get student complaints (student view)
router.get("/my-complaints", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Not logged in" });

    const complaints = await Complaint.find({ studentId: user.id });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user complaints", details: err.message });
  }
});

module.exports = router;
