const express = require('express');
const appp = express();
const mongoose = require('mongoose');

///veritabanina baglan
const mongoDbUri = "mongodb://localhost:27017/videovestorypostlama";
mongoose.connect(mongoDbUri,{useNewUrlParser:true,});
mongoose.connection.on("connected",() => {
    console.log("mongodbye baglandik.");
});
mongoose.connection.on("error",(err) => {
    console.log("mongodbye baglanirken hata.");
});
///

//route lari import et
const userRoutes = require('./routes/user');


//middleware
appp.use("/api",userRoutes);


/* appp.get('/', (req, res) => {
    res.send('Anasayfa');
}); */


const port = 4000;
appp.listen(port, () => {
    console.log('${port} nolu porttan baglaniyoruz.');

})

