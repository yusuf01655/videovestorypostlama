const express = require('express');
const router = express.Router();
const {girisYap, kaydol} = require("../controllers/user");



//simdiki
router.post('/kaydol', kaydol);
router.post('/girisYap', girisYap);

/* router.get('/', (req, res) => {
    res.send('user kismindayiz.');
}) */ //onceki




module.exports = router;
