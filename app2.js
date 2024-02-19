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

//  you have a route like this in your backend
app.get('/api/v1/media/getVideo/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  // Find the media document by the mediaId
  const media = await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: "Media not found" });
  }

  // Get the first video from the videos array
  const video = media.videos[0];
  //console.log(video);
  // Construct the input file path
  
  const videoPath = path.join(__dirname, video);
  // Send the video file as a response
  res.sendFile(videoPath);
});

// Endpoint to handle POST request for inserting sticker overlay on the video
app.post('/api/v1/media/overlaysticker/:mediaId', async (req, res) => {
  try {
    const { mediaId } = req.params;
    const { stickerUrl, stickerPosition } = req.body;

    const media = await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/stickerli_${path.basename(inputVideoPath)}`;
    
  //[0:v][1:v]overlay=x:y // deneyelim.
  //overlay=main_w-overlay_w:main_h-overlay_h  //sag alt koseye yerlestiriyor, ilk denedigim
    // Execute ffmpeg command to overlay the sticker on the video
    //https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/800px-Logo_of_Twitter.svg.png
    

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(inputVideoPath)
        .input(stickerUrl)
        .complexFilter([
          `[0:v][1:v]overlay=${stickerPosition.x}:${stickerPosition.y}`
        ])
        .output(outputVideoPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Send a success response
    res.status(200).json({ message: 'Sticker overlay inserted successfully' });
  } catch (error) {
    console.error('Error inserting sticker overlay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/v1/media/overlaytext/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const { textPosition } = req.body;
  const { mytext } = req.body;
  try{
      const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/metineklenmis_${path.basename(inputVideoPath)}`;
    const fontPath = `./public/font/times.ttf`;
  // Assuming you have the video path; adjust this accordingly based on your actual setup
  

  // Execute FFmpeg command to add text overlay
  ffmpeg(inputVideoPath)
    .complexFilter([
      {
        filter: 'drawtext',
        options: {
          fontfile: fontPath, // Provide the path to your font file
          text: mytext,
          fontsize: 24,
          x: textPosition.x,
          y: textPosition.y,
          fontcolor: 'red',
        },
      },
    ])
    .on('end', () => {
      console.log('Video edited successfully!');
      res.status(200).json({ message: 'Video edited successfully!' });
    })
    .on('error', (err) => {
      console.error('Error editing video:', err);
      res.status(500).json({ error: 'Error editing video' });
    })
    .save(outputVideoPath); // Specify the output path
}catch(error){
  console.error('Error inserting text overlay:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
//endpoint 
app.post('/api/v1/media/gritonlamaliyap/:mediaId', async (req, res) => {
  const { mediaId } = req.params;

  try {
    const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/gritonlamali_${path.basename(inputVideoPath)}`;

    
    //colorchannelmixer=0.3:0.4:0.3:0.3:0.3:0.3:0.3:0.3:0.3:0.3 //onceki
  //hue=s=0
    // Grayscale the video using fluent-ffmpeg
    ffmpeg(inputVideoPath)
      .output(outputVideoPath)
      .videoFilter('hue=s=0')
      .on('end', () => {
        console.log('Grayscale operation finished');
        res.status(200).json({ message: 'Video successfully grayscaled' });
      })
      .on('error', (err) => {
        console.error('Error during grayscale operation:', err);
        res.status(500).json({ error: 'Error during grayscale operation' });
      })
      .run();
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
});
app.post('/api/v1/media/yenidenolceklendir/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const {videoPozisyonu} = req.body;
  try {
    const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/olceklendirilmis_${path.basename(inputVideoPath)}`;

    
    
  
  
    ffmpeg(inputVideoPath)
      .output(outputVideoPath)
      .videoFilter(`scale=${videoPozisyonu.genislik}:${videoPozisyonu.yukseklik}`)
      .on('end', () => {
        console.log('yeniden olceklendirme islemi tamamdir');
        res.status(200).json({ message: 'Video successfully grayscaled' });
      })
      .on('error', (err) => {
        console.error('Error during grayscale operation:', err);
        res.status(500).json({ error: 'Error during scaling operation' });
      })
      .run();
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
});
app.post('/api/v1/media/kirp/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const {videoPozisyonu} = req.body;
  try {
    const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/kirpilmis_${path.basename(inputVideoPath)}`;

    
    
  
  
    ffmpeg(inputVideoPath)
      .output(outputVideoPath)
      .videoFilter(`crop=${videoPozisyonu.genislik}:${videoPozisyonu.yukseklik}:${videoPozisyonu.x}:${videoPozisyonu.y}:`)
      .on('end', () => {
        console.log('kirpma islemi tamamdir');
        res.status(200).json({ message: 'Video successfully kirpildi' });
      })
      .on('error', (err) => {
        console.error('Error during kirpma operation:', err);
        res.status(500).json({ error: 'Error during scaling operation' });
      })
      .run();
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
});

app.post('/api/v1/media/parlaklikvekontrast/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const {videoPozisyonu} = req.body;
  try {
    const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/parlaklikkontrast_${path.basename(inputVideoPath)}`;

    
    
  
  
    ffmpeg(inputVideoPath)
      .output(outputVideoPath)
      .videoFilter(`eq=brightness=${videoPozisyonu.parlaklik}:contrast=${videoPozisyonu.kontrast}`)
      .on('end', () => {
        console.log('parlaklik kontrast islemi tamamdir');
        res.status(200).json({ message: 'parlaklik kontrast islemi tamam' });
      })
      .on('error', (err) => {
        console.error('Error during brightness contrast operation:', err);
        res.status(500).json({ error: 'Error during brightness contrast operation' });
      })
      .run();
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
});

app.post('/api/v1/media/bulaniklastir/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const {videoPozisyonu} = req.body;
  try {
    const media =  await Media.findById(mediaId);

  // Check if the media document exists
  if (!media) {
    // Send a not found response
    return res.status(404).json({ message: 'Media not found' });
  }

  // Get the first video from the videos array
  const video = media.videos[0];

  // Construct the input file path
  const inputVideoPath = path.join(__dirname, video);


   
    // Output video file path
    const outputVideoPath = `./public/videos/bulanik${path.basename(inputVideoPath)}`;

    
    
  
  //`boxblur=${videoPozisyonu.blurstrength1}:${videoPozisyonu.blurstrength2}`
    ffmpeg(inputVideoPath)
      .output(outputVideoPath)
      .videoFilter(`boxblur=${videoPozisyonu.blurstrength1}:${videoPozisyonu.blurstrength2}`)
      .on('end', () => {
        console.log('bulaniklastirma islemi tamamdir');
        res.status(200).json({ message: 'bulaniklastirma islemi tamam' });
      })
      .on('error', (err) => {
        console.error('Error during bulaniklastirma operation:', err);
        res.status(500).json({ error: 'Error during bulaniklastirma operation' });
      })
      .run();
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
