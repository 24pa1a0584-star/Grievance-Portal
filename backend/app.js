const express= require('express');
const mongoose = require('mongoose');
const registerRoute= require('./routes/register_route');
const app= express();
const port= 5000;

app.use(express.json());
app.use('/register',registerRoute);


app.listen(port, ()=>{
    console.log(`Server running ${port}`);
});