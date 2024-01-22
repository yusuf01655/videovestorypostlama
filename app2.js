const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const path = require("path");
require('dotenv').config();
const mediaRoutes = require("./routes/media");

const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');


//IMPORT ROUTES




app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/media/",mediaRoutes);
app.use('/public', express.static(path.join(__dirname, 'public'))); //klasordeki videolar static oldugundan  erisebilmek icin
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videovestorypostlama', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected",() => {
  console.log("mongodbye baglandik.");
});
mongoose.connection.on("error",(err) => {
  console.log("mongodbye baglanirken hata.");
});


// Define a simple mongoose schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Create a route to handle item creation
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//kullanici ekle
/* const User = require('./Models/User');
app.post('/api/kaydol', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); */
// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
    }));
app.use(cookieParser());
app.use(cors());


// ROUTES MIDDLEWARE




//ERROR MIDDLEWARE
 app.use(errorHandler);
//MIDDLEWARE
app.use("/api", userRoutes);
app.use("/api", authRoutes);
// Example backend route definition




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
