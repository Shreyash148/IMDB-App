const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireSignin = async(req,res,next)=>{
    try {
    const decode= jwt.verify(req.headers.authorization,process.env.JWT_SEC);
     req.user=decode;
     const user = await User.findById(req.user.id);
     next();   
    } catch (error) {
        res.send("error");
    }
}

module.exports = {requireSignin};

