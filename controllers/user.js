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
exports.girisYap = async (req, res, next) => {
   try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "eposta ya da sifre yanlis...",
            })
        }
        //kullanici eposta kontrolu
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "gecersiz eposta",
            })
        }
        //eslesip eslesmemesiyle ilgili olarak sifreyi dogrula 
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "gecersiz sifre ",
            })
        }
        

        
        generateToken(user, 200, res);
   }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "giris yapilmadi. bilgilerinizi kontrol ediniz.",
        })
   }
}
const generateToken = async (user, statusCode, res) => {
    const token = await user.jwtGenerateToken();
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 1*60*60*1000)
    };
    res.status(statusCode).cookie('token', token, options).json({success: true, token})
}
//kullanici cikis yapma islemi
exports.cikisYap = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "cikis yapildi."
    })
}