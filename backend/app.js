const express= require('express');
const mongoose = require('mongoose')
const app= express();
const port= 5000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Studnet Grievance Portal");
});

app.listen(port, ()=>{
    console.log(`Server running ${port}`);
});