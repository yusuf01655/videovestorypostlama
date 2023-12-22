const express = require('express');
const appp = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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
appp.use(morgan('dev'));
appp.use(bodyParser.json())
//routes middleware
appp.use("/api",userRoutes);


/* appp.get('/', (req, res) => {
    res.send('Anasayfa');
}); */


const port = 4000;
appp.listen(port, () => {
    console.log('${port} nolu porttan baglaniyoruz.');

})

