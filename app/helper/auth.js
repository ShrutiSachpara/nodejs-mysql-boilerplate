const jwt = require('jsonwebtoken');
const config = require('config');
const logger  = require('../logger/logger')

//for Generating a token
const generateToken = (req, res, next) => {
  console.log('req.body.email',req.body);
      let token = jwt.sign({ email: req.body.email },process.env.JWT_KEY);
      console.log('token---->',token);
      res.header('auth-token', token);
      next();
  };
  
  const authenticate = (req, res, next) => {
    
    try {
      var token = req.headers['x-access-token'];
      console.log('authenticate token--------->',token);
      if (token == undefined) {
        res.send('token verfied failed.......!!');
      }
      const verifyUser = jwt.verify(token, 'secret');
      console.log('verifyUser',verifyUser);
      req.user = verifyUser;
      next();
    } catch (err) {
      res.send('token verfied failed');
      console.log('error------->',err);
    }
  }
  
  module.exports = { generateToken, authenticate };