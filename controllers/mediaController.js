const Media = require("../Models/Media");

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();

    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.create = async(req, res) =>{
    const { name } = req.body;
    let videosPaths = [];
    if(Array.isArray(req.files.videos) && req.files.videos.length>0){
        for(let video of req.files.videos){
            videosPaths.push("/"+ video.path);
        }
    }
    try{
        const createdMedia = await Media.create({ name, videos: videosPaths,});
        //1yeni ekleyecegim kod
        
        //1
        res.json({message: "Media created successfully",createdMedia});

    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMedia = await Media.findByIdAndDelete(id);
    console.log("Deleting media with ID:", id);
    if (!deletedMedia) {
      console.log("Media not found");
      return res.status(404).json({ message: "Media not found" });
    }
    console.log("Media deleted successfully");
    res.json({ message: "Media deleted successfully", deletedMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// Add a function to trim a media document by its id
exports.trim = async (req, res) => {
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
  const inputFilePath = video;

  // Construct the output file path
  const outputFilePath = `public/videos/trimmed-${mediaId}`;

  // Create a ffmpeg command to trim the video
  const command = ffmpeg(inputFilePath)
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
};
