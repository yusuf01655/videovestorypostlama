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
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath('C:/ffmpeg-6.1.1-full_build/bin/ffmpeg.exe');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
// Import the fs and path modules
const fs = require('fs');


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


 FileName2 = 'abcd';

//ERROR MIDDLEWARE
 app.use(errorHandler);
//MIDDLEWARE
app.use("/api", userRoutes);
app.use("/api", authRoutes);
// Example backend route definition

const Media = require("./Models/Media");
// Example server route handling the trim operation
app.post("/api/v1/media/trim/:mediaId", async (req, res) => {
  console.log("Received trim request for mediaId:", req.params.mediaId);
  console.log("Received start and end times:", req.body.startTime, req.body.endTime);
  const { mediaId } = req.params;
  const { startTime, endTime } = req.body;

  // Find the media document by the mediaId
  const media = await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: "Media not found" });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputFilePath =  video;
  //video varmi kontrol et
  // Check if the input file path exists
const fileExists = fs.existsSync('.' +inputFilePath);

// If the file exists, get the file status information
if (fileExists) {
  // Get the file stats
  const fileStats = fs.statSync('.' +inputFilePath);

  // Check if the path is a file
  const isFile = fileStats.isFile();

  // If the path is a file, get the file name and extension
  if (isFile) {
    // Get the file name
    const fileName = path.basename('.' +inputFilePath);

    // Get the file extension
    const fileExtension = path.extname('.' +inputFilePath);

    // Log the file name and extension
    console.log('File name:', fileName);
    console.log('File extension:', fileExtension);
    FileName2 = fileName;
  } else {
    // Log that the path is not a file
    console.log('The path is not a file');
  }
} else {
  // Log that the file does not exist
  console.log('The file does not exist');
}

  // Construct the output file path
  const outputFilePath = `./public/videos/trimmed_${FileName2}`;

  // Create a ffmpeg command to trim the video
  const command = ffmpeg('.' +inputFilePath)
    .setStartTime(startTime)
    .setDuration(endTime - startTime)
    .output(outputFilePath)
    .on("error", (err) => {
      // Handle the error
      console.error("Error trimming video:", err);
      // Send an error response
      return res.status(500).json({ message: "Error trimming video" });
    })
    .on("end", () => {
      // Handle the success
      console.log("Video trimmed successfully");
      // Send a success response with the trimmed video URL
      return res.status(200).json({
        message: "Video trimmed successfully",
        trimmedVideoUrl: outputFilePath,
      });
    });
    command.run();
  });

  degreeInRadian = '';
  // Example server route handling the rotate operation
app.post('/api/v1/media/rotate/:mediaId', async (req, res) => {
  console.log('Received rotate request for mediaId:', req.params.mediaId);
  console.log('Received rotation angle:', req.body.rotationAngle);

  const { mediaId } = req.params;
  const { rotationAngle } = req.body;
  //degreeInRadian = rotationAngle * (Math.PI/180);
  // Find the media document by the mediaId
  const media = await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputFilePath = video;

  // Check if the input file path exists
  const fileExists = fs.existsSync('.' + inputFilePath);

  // If the file exists, proceed with rotation
  if (fileExists) {
    try {
      // Construct the output file path
      const outputFilePath = `./public/videos/flipped_${path.basename(inputFilePath)}`;
      /* if(rotationAngle == 90){
        //.videoFilter(`rotate=${degreeInRadian}`)
      } */
      // Create a ffmpeg command to rotate the video
      dondurmeAcisi = rotationAngle; 
      
      if(dondurmeAcisi==4){
        dondurmeAcisi = '2,transpose=2'
      }
      videoFilterParametresi = `transpose=${dondurmeAcisi}`
      const command = ffmpeg('.' + inputFilePath)
        .videoFilter(videoFilterParametresi)
        .output(outputFilePath)
        .on('error', (err) => {
          // Handle the error
          console.error('Error rotating video:', err);
          // Send an error response
          return res.status(500).json({ message: 'Error rotating video' });
        })
        .on('end', () => {
          // Handle the success
          console.log('Video rotated successfully');
          // Send a success response with the rotated video URL
          return res.status(200).json({
            message: 'Video rotated successfully',
            rotatedVideoUrl: outputFilePath,
          });
        });

      command.run();
    } catch (error) {
      console.error('Error during rotation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Log that the file does not exist
    console.log('The file does not exist');
    return res.status(404).json({ message: 'Video file not found' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
