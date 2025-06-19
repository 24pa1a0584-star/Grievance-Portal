const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
global.userSessions = {}; // ✅ Global JSON variable to store session data
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add: the session
app.use(session({
  secret: process.env.SESSION_SECRET,  // Keep your session secret secure
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI, // ✅ Connects sessions to MongoDB
    collectionName: "sessions", // ✅ Stores session data in "sessions" collection
    ttl: 20 * 60 
    }),
    cookie: {
    secure: false, // true in production with HTTPS
    httpOnly: true, // Prevents client-side access
    maxAge: 20 * 60 * 1000 // 20 min
    }
}));
// Added session

app.use(cors({
    origin: "http://127.0.0.1:5500", // ✅ Ensure it matches your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true  // ✅ Enables session cookies
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// ✅ Import Routes
const registerRoute = require("./routes/register_route");
const resetRoute = require("./routes/reset_route");
const loginRoute = require("./routes/login_route");
const adminRegisterRoute = require("./routes/admin_route");
const adminRequest = require("./routes/admin_request");
const adminLoginRoute = require('./routes/admin_login_route');
const complaintRoute = require('./routes/complaint_route');


// ✅ Route Setup
app.use("/register", registerRoute);
app.use("/reset", resetRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRegisterRoute);
app.use("/admin-request", adminRequest);
app.use('/admin', adminLoginRoute);
app.use('/complaint', complaintRoute);
// console.log("MongoDB URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
}).catch(error => {
    console.error("MongoDB Connection Error:", error);
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});