const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("pages"));

// Add: the session
app.use(session({
  secret: process.env.SESSION_SECRET,  // Keep your session secret secure
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI, // ✅ Connects sessions to MongoDB
    collectionName: "sessions", // ✅ Stores session data in "sessions" collection
    ttl: 60 * 60 // ✅ Session expires in 1 hour
  }),
  cookie: {
    secure: false, // true in production with HTTPS
    httpOnly: true, // Prevents client-side access
    maxAge: 20 * 60 * 1000 // 20 min
  }
}));
// Added session

// ✅ Apply CORS After Session Setup
app.use(cors({
    origin: "*", // ✅ Ensure this matches your frontend URL
    credentials: true
}));

// ✅ Import Routes
const registerRoute = require("./routes/register_route");
const resetRoute = require("./routes/reset_route");
const loginRoute = require("./routes/login_route");
const adminRegisterRoute = require("./routes/admin_route");
const adminRequest = require("./routes/admin_request");

// ✅ Route Setup
app.use("/register", registerRoute);
app.use("/reset", resetRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRegisterRoute);
app.use("/admin-request", adminRequest);

console.log("MongoDB URI:", process.env.MONGO_URI);

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