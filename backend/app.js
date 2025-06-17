const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app= express();
const port= 5000;

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 5 * 60 * 1000 } // 1-day expiration TODO: Change this to 5 min or 10 min
}));

const registerRoute= require('./routes/register_route');
const resetRoute = require('./routes/reset_route');
const loginRoute = require('./routes/login_route');

app.use(express.json());
app.use(express.static('pages'));
const cors = require('cors');
app.use(cors());
app.use('/register',registerRoute);
app.use('/reset', resetRoute);
app.use('/login', loginRoute);

console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(error => {
    console.error("MongoDB Connection Error:", error);
});


app.listen(port, ()=>{
    console.log(`Server running ${port}`);
});