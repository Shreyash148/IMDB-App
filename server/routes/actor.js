const express = require('express');
const Actor = require('../models/actorModel');

const route = express.Router();


route.get('/filter/:searchString',async(req,res)=>{
  try {
    const {searchString}=req.params;
    const actors = await Actor.find({name:{$regex:searchString,$options:"i"}}).select("name");
    return res.json(actors);
  } catch (error) {
    console.log(error);
  }
});

route.post('/create',async(req,res)=>{
  try {
    const { name,gender,bio,dob,image } = req.body;
    const actor=await Actor.findOne({name,dob});
    if(actor){
      return res.status(201).send({ success: false, message: "Actor already exists" });
    }
    await Actor.create({name,gender,bio,dob,image});
    return res.status(200).send({ success: true, message: "Actor added successfully" });
  } catch (error) {
    console.log(error);
  }
})
route.get('/:id',async(req,res)=>{
  try {
     const { id } = req.params;
     const actor = await Actor.findById(id).populate("movies");
     return  res.status(200).send({ success: true, actor });
  } catch (error) {
    console.log(error);
  }
});
module.exports=route;
