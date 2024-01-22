const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

   name: {
       type: String,
       trim: true,
       required : [true, 'Lutfen isim giriniz'],
       maxlength: 32
   },

   email: {
       type: String,
       trim: true,
       required : [true, 'Lutfen eposta giriniz'],
       unique: true,
       match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
       ]

   },

   password: {
       type: String,
       trim: true,
       required : [true, 'Sifre girmek gerekli'],
       minlength: [6, 'sifre en az 6 karakter olmali'],
       match: [
           /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Sifre en az 1 tane buyuk harf , kucuk harf , sayi ve ozel karakter icermeli'
       ]
   },

   role: {
       type: Number,
       default: 0,
  
   },



}, {timestamps: true});



// encrypting password before saving
userSchema.pre('save', async function(next){

   if(!this.isModified('password')){
       next()
   }
   this.password = await bcrypt.hash(this.password, 10);
});



// verify password
userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

// get the token
userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, 'sjsj', {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);