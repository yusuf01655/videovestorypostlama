const express = require("express");
const mediaController = require("../controllers/mediaController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(!fs.existsSync("public")){
            fs.mkdirSync("public");
        }
        if(!fs.existsSync("public/videos")){
            fs.mkdirSync("public/videos");
        }
        cb(null,"public/videos");

    },
    filename: function(req, file, cb){
        cb(null,Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        var ext = path.extname(file.originalname);
        if(ext !== ".mp4" && ext !== ".mkv"){
            return cb(new Error("sadece videolara izin verilir"));
        }
        cb(null,true);
    },
});





const router = express.Router();

//get all media islemi
router.get('/all',mediaController.getAll);

//post create new media islemi
router.post('/create',upload.fields([{name: "videos", maxCount: 5,},]),mediaController.create);
router.delete('/delete/:mediaId', async (req, res) => {
    try {
      const mediaId = req.params.mediaId;
       // Use Mongoose to find and delete the media item
    const deletedMedia = await Media.findOneAndDelete({ _id: mediaId });

    if (!deletedMedia) {
      // If no media item is found, return an error response
      return res.status(404).json({ message: 'Media not found' });
    }
      

      res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
      console.error('Error deleting media:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;

