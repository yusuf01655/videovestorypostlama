const express = require('express');
const router = express.Router();
const {merhabaYazdir} = require("../controllers/user");



//simdiki
router.get('/', merhabaYazdir);

/* router.get('/', (req, res) => {
    res.send('user kismindayiz.');
}) */ //onceki




module.exports = router;
