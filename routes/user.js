const express = require('express');
const router = express.Router();
const {girisYap, kaydol, cikisYap, tekKullanici} = require("../controllers/user");



//simdiki
router.post('/kaydol', kaydol);
router.post('/girisYap', girisYap);
router.get('/cikisYap', cikisYap);
router.get('/user/:id', tekKullanici);
/* router.get('/', (req, res) => {
    res.send('user kismindayiz.');
}) */ //onceki




module.exports = router;
