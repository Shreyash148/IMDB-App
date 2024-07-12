const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

route.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.send({success:false,message:'Invalid details'});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.send({success:false,message:'Invalid details'});
    }
    const check = await bcrypt.compare(password,user.password);
    const authToken = await jwt.sign({id:user._id},process.env.JWT_SEC,{expiresIn:"7d"});
    if(check){
        return res.send({success:true,message:"Login successful",authToken,user});
    }
    else{
        return res.send({success:false,message:'Invalid details'});
    }

});


route.post('/register', [
  body('name', "Name too short").isLength({ min: 3 }),
  body('email', "Invalid email format").isEmail().isLength({ min: 8 }),
  body('contactNumber', "Invalid Phone No").isNumeric().isLength({ min: 10, max: 12 }),
  body('password', 'Set a strong password').isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
  })
],
  async (req, res) => {
    // console.log(req.body);
      const { name, password, email, contactNumber} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.send({ success: false, message: errors.errors[0].msg })
      }
      else {
          // check existing user
          const user = await User.findOne({ email });
          if (user) {
              return res.status(201).send({ success: false, message: "user already exists" });
          }

          //hash password
          const salt = await bcrypt.genSalt(10);
          let secPwd = await bcrypt.hash(password, salt);

          //create user
          User.create({
              name,
              password: secPwd,
              email,
              contactNumber
          })
          res.json({ success: true, message: "user successfully registered" });
      }
  });

module.exports = route