const express = require('express');
const Producer = require('../models/producerModel');

const route = express.Router();


route.get('/filter/:searchString',async(req,res)=>{
  try {
    const {searchString}=req.params;
    const producer = await Producer.find({name:{$regex:searchString,$options:"i"}}).select("name");
    return res.json(producer);
  } catch (error) {
    console.log(error);
  }
});

route.post('/create',async(req,res)=>{
  try {
    const { name,gender,bio,dob,image } = req.body;
    const producer=await Producer.findOne({name,dob});
    if(producer){
      return res.status(201).send({ success: false, message: "Producer already exists" });
    }
    await Producer.create({name,gender,bio,dob,image});
    return res.status(200).send({ success: true, message: "Producer added successfully" });
  } catch (error) {
    console.log(error);
  }
})
route.get('/:id',async(req,res)=>{
  try {
     const { id } = req.params;
     const producer = await Producer.findById(id).populate("movies");
     return  res.status(200).send({ success: true,producer});
  } catch (error) {
    console.log(error);
  }
});
module.exports=route;
