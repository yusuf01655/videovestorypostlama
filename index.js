const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
const mediaRoutes = require("./routes/media");
app.use("/api/v1/media/",mediaRoutes);

const mongoDbUri = "mongodb://localhost:27017/videovestorypostlama";
mongoose.connect(mongoDbUri,{useNewUrlParser:true,});
mongoose.connection.on("connected",() => {
    console.log("mongodbye baglandik.");
});
mongoose.connection.on("error",(err) => {
    console.log("mongodbye baglanirken hata.");
});


app.listen(4000, () =>{
    console.log("uygulama port 4000de calisiyor..");
});
