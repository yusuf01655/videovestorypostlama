const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'lutfen isim giriniz'],
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'lutfen email giriniz'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'gecerli bir email giriniz'
  ]

  },
  password: {
    type: String,
    trim: true,
    required: [true, 'lutfen sifre giriniz'],
    minlength: [6,'sifre en az altı (6) karakter olmali' ],
    unique: true,
 /*    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'gecerli bir email giriniz'
  ] */
  },
  rol: {
    type: Number,
    default: 0,

  }

/*   salt: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  } */
}, {timestamps: true});

//const User = 

module.exports = mongoose.model('User', userSchema);