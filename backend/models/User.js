const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  balance: {
    type: Number,
    default: 50000, 
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
