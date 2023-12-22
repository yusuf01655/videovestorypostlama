const express = require('express');
const router = express.Router();
const {kaydol} = require("../controllers/user");



//simdiki
router.post('/kaydol', kaydol);

/* router.get('/', (req, res) => {
    res.send('user kismindayiz.');
}) */ //onceki




module.exports = router;
