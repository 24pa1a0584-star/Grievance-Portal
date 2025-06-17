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

// ✅ Apply Session Middleware Before CORS
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // ✅ Persistent session storage
    cookie: { secure: false, httpOnly: true, maxAge: 10 * 60 * 1000 }
}));

// ✅ Apply CORS After Session Setup
app.use(cors({
    origin: "http://localhost:5500", // ✅ Ensure this matches your frontend URL
    credentials: true
}));

// ✅ Import Routes
const registerRoute = require("./routes/register_route");
const resetRoute = require("./routes/reset_route");
const loginRoute = require("./routes/login_route");
const adminRegisterRoute = require("./routes/admin_route");

// ✅ Route Setup
app.use("/register", registerRoute);
app.use("/reset", resetRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRegisterRoute);

console.log("MongoDB URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas!");
}).catch(error => {
    console.error("❌ MongoDB Connection Error:", error);
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
// const express= require('express');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo');
// require('dotenv').config();
// const app= express();
// const port= 5000;

// app.use(express.json());

// app.use(express.static('pages'));

// const session = require('express-session');
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Stores session in MongoDB
//     cookie: { secure: false, httpOnly: true, maxAge: 10 * 60 * 1000 }
// }));

// const cors = require('cors');
// app.use(cors({
//     origin: 'http://localhost:5500', // Replace with your frontend origin
//     credentials: true
// }));

// const registerRoute= require('./routes/register_route');
// const resetRoute = require('./routes/reset_route');
// const loginRoute = require('./routes/login_route');
// const adminRegisterRoute = require('./routes/admin_route');

// app.use('/register',registerRoute);
// app.use('/reset', resetRoute);
// app.use('/login', loginRoute);
// app.use('/admin', adminRegisterRoute);

// console.log("MongoDB URI:", process.env.MONGO_URI);

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to MongoDB Atlas");
// }).catch(error => {
//     console.error("MongoDB Connection Error:", error);
// });


// app.listen(port, ()=>{
//     console.log(`Server running ${port}`);
// });