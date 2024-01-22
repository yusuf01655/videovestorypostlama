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