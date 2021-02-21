const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../config/db');

const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  login:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function(login,callback){
  const query = {login: login};
  User.findOne(query,callback);
};

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
};

module.exports.comparePassword = function(passwordFromUser,passwordFromDB,callback){
  bcrypt.compare(passwordFromUser,passwordFromDB,(error,isMatch)=>{
    if(error) throw error;
    callback(null,isMatch);
  });
};

module.exports.addUser = function(newUser,callback){
  bcrypt.genSalt(10,(error,salt)=>{
    bcrypt.hash(newUser.password, salt,(error,hash)=>{
      if(error) throw error;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
