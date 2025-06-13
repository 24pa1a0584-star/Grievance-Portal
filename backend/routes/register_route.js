const express=require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Studnet Grievance Portal-Register User");
});

module.exports=router;