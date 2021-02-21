const express = require ('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/user')

router.post('/reg',(request, response) =>{
  let newUser = new User({
    name: request.body.name,
    login: request.body.login,
    password: request.body.password
  });
  User.addUser(newUser, (error, user)=>{
    if(error)
      response.json({success: false, msg:"error"});
    else
      response.json({success: true, msg:"success"})
  });
});

router.post('/auth',(request, response) =>{
  const login = request.body.login;
  const password = request.body.login;

  User.getUserByLogin(login,(error,user)=>{
    if(error) throw error;
    if(!user) return response.json({success:false, msg:"user isn't found"});

  User.comparePassword(password, user.password, (error, isMatch)=>{
    if(error) throw error;
    if(isMatch){
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 3600*24
      });
      response.json({success:true, token: 'JWT'+token, user:{
        id: user._id,
        name: user.name,
        login: user.login
      }})
    }else return response.json({success:false, msg:"wrong password"});
    });
  });
});

router.get('/reg',(request, response) =>{
  response.send('Registration');
});

router.get('/auth',(request, response) =>{
  response.send('Athorization');
});

router.get('/cabinet', passport.authenticate('jwt',{session:false}), (request, response) =>{
  response.send('Cabinet');
});



module.exports = router;
