const express = require('express');
const router = express.Router();


router.post('/login', (req, res) => {
    res.send('Login successful \n');
});

router.post('/register',(req, res) => {
    res.send('Register successful');
})
module.exports = router;