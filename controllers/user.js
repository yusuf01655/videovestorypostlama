const User = require("../Models/User");
/* exports.merhabaYazdir = (req, res) => {
    res.json({message: "controller user calisiyor... "})

} */
exports.kaydol = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            success: false,
            message: "bu email zaten var...",
        });
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        console.log("controllers>user.js>exports.kaydol kismi: "+error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}