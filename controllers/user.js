const User = require("../Models/User");
const ErrorResponse = require("../utils/errorResponse")
/* exports.merhabaYazdir = (req, res) => {
    res.json({message: "controller user calisiyor... "})

} */
exports.kaydol = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    /* if(userExist){
        return next(new ErrorResponse('bu email zaten var...',400));
    } */
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        console.log("controllers>user.js>exports.kaydol kismi: "+error.message);
        next(error);
    }
}
exports.girisYap = async (req, res, next) => {
   try{
        const {email,password} = req.body;
        if(!email || !password){
            return next(new ErrorResponse('eposta veya sifreyi bos birakmayiniz.',400));
        }
        //kullanici eposta kontrolu
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse('gecersiz sifre veya eposta',404));
        }
        //eslesip eslesmemesiyle ilgili olarak sifreyi dogrula 
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new ErrorResponse('gecersiz sifre veya eposta',404));
        }
        

        
        generateToken(user, 200, res);
   }catch(error){
        console.log(error);
        next(new ErrorResponse('giris yapilamadi bilgilerinizi kontrol ediniz',404));
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
exports.tekKullanici = async (req, res, next,) => {
  
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
    }catch(error){
        next(error);
    }
}