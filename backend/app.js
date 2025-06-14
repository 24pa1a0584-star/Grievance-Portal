const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const registerRoute= require('./routes/register_route');
const loginRoute= require('./routes/login_route');
const resetRoute = require('./routes/reset_route');
const app= express();
const port= 5000;

app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use('/register',registerRoute);
app.use('/login', loginRoute);
app.use('/reset', resetRoute);


console.log("MongoDB URI:", process.env.MONGO_URI);

// mongoose.connect('mongodb+srv://dragon-fly:X2bpFqZZqJMEKXrm@gportal.qrpwcdt.mongodb.net/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB Atlas');
// }).catch(error => {
//     console.error('MongoDB Connection Error:', error);
// });

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