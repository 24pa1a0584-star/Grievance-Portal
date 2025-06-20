const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
<<<<<<< HEAD
global.userSessions = {}; // Global JSON variable to store session data
=======
global.userSessions = {}; // ✅ Global JSON variable to store session data

>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Setup CORS
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5000", "http://127.0.0.1:5000"], // Allow both ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
<<<<<<< HEAD
    credentials: true  // Enables session cookies
=======
    credentials: true
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
}));

// ✅ Setup Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
<<<<<<< HEAD
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI, // Connects sessions to MongoDB
        collectionName: "sessions", // Stores session data in "sessions" collection
        ttl: 60 * 60 
    }),
    cookie: {
        secure: false, // true in production with HTTPS
        httpOnly: false, // Allow client-side access for debugging
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'lax' // More permissive for testing
    }
}));
// Added session

app.use(express.json());
const path = require("path");

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, "..")));
app.use("/pages", express.static(path.join(__dirname, "../pages")));
app.use("/scripts", express.static(path.join(__dirname, "../scripts")));
app.use("/styles", express.static(path.join(__dirname, "../styles")));
app.use("/src", express.static(path.join(__dirname, "../src")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


=======
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        ttl: 20 * 60 // 20 minutes
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 20 * 60 * 1000
    }
}));
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff

// Import Routes
const registerRoute = require("./routes/register_route");
const resetRoute = require("./routes/reset_route");
const loginRoute = require("./routes/login_route");
const adminRegisterRoute = require("./routes/admin_route");
const adminRequest = require("./routes/admin_request");
const adminLoginRoute = require('./routes/admin_login_route');
const complaintRoute = require('./routes/complaint_route');

<<<<<<< HEAD
// Route Setup
=======
// ✅ Use Routes
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
app.use("/register", registerRoute);
app.use("/reset", resetRoute);
app.use("/login", loginRoute);
app.use("/admin-register", adminRegisterRoute);
app.use("/admin-request", adminRequest);
app.use('/admin', adminLoginRoute);
app.use('/complaint', complaintRoute); // Pick one route name only

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
}).catch(error => {
    console.error("MongoDB Connection Error:", error);
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
