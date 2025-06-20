const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
<<<<<<< HEAD
global.userSessions = {}; // Global JSON variable to store session data
=======
global.userSessions = {}; // ✅ Global JSON variable to store session data
>>>>>>> 21b09cd074f241c61190e0291efb42131b2a6208
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 5000;
// Added: cors
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5000", "http://127.0.0.1:5000"], // Allow both ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true  // Enables session cookies
}));

// Add: the session
app.use(session({
    secret: process.env.SESSION_SECRET,  // Keep your session secret secure
    resave: false,
    saveUninitialized: false,
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

<<<<<<< HEAD
// Serve static files from parent directory
app.use(express.static(path.join(__dirname, "..")));
app.use("/pages", express.static(path.join(__dirname, "../pages")));
app.use("/scripts", express.static(path.join(__dirname, "../scripts")));
app.use("/styles", express.static(path.join(__dirname, "../styles")));
app.use("/src", express.static(path.join(__dirname, "../src")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
=======
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


// Added: cors

app.use(cors({
    origin: "http://127.0.0.1:5500", // ✅ Ensure it matches your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true  // ✅ Enables session cookies
}));

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

app.use(express.json());

// app.use("/pages", express.static(path.join(__dirname, "../pages"))); // ✅ Access files outside project-root

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


>>>>>>> 21b09cd074f241c61190e0291efb42131b2a6208



// Import Routes
const registerRoute = require("./routes/register_route");
const resetRoute = require("./routes/reset_route");
const loginRoute = require("./routes/login_route");
const adminRegisterRoute = require("./routes/admin_route");
const adminRequest = require("./routes/admin_request");
const adminLoginRoute = require('./routes/admin_login_route');
<<<<<<< HEAD
const complaintRoute= require('./routes/complaint_route');

// Route Setup
=======

const complaintRoute = require('./routes/complaint_route');





// ✅ Route Setup
>>>>>>> 21b09cd074f241c61190e0291efb42131b2a6208
app.use("/register", registerRoute);
app.use("/reset", resetRoute);
app.use("/login", loginRoute);
app.use("/admin-register", adminRegisterRoute);
app.use("/admin-request", adminRequest);
app.use('/admin', adminLoginRoute);
<<<<<<< HEAD
app.use('/send-complaint', complaintRoute);
=======

app.use('/complaint', complaintRoute);

app.use('/send-complaint', complaintRoute);


// console.log("MongoDB URI:", process.env.MONGO_URI);
>>>>>>> 21b09cd074f241c61190e0291efb42131b2a6208

// console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
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