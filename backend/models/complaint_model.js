
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  evidence: [
    {
      filename: String,
      filetype: String,
      url: String,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  adminResponse: {
    type: String,
    default: "",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
  updatedAt: {
    type: Date,
    default: Date.now,
  },
=======
  studentName: { type: String },
studentFaculty: { type: String },
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
});

module.exports = mongoose.model("Complaint", complaintSchema);

