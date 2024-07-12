const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName:{
    type:String,
    required:true
  },
  releaseYear:{
    type:Number,
    required:true
  },
  plot:{
    type:String,
    required:true
  },
  poster:{
    type:String
  },
  actors:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Actor'
    }
  ],
  producer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Producer'
  }
});

module.exports = mongoose.models.Movie || mongoose.model("Movie",movieSchema);