const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    enum:["Male","Female","Other"],
    required:true
  },
  bio:{
    type:String,
  },
  dob:{
    type:Date,
    required:true
  },
  image:{
    type:String,
  },
  movies:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Movie'
    }
  ]
})

module.exports= mongoose.models.Producer || mongoose.model("Producer",producerSchema);