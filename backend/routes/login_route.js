const express=require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Studnet Grievance Portal-Login User");
});

module.exports=router;