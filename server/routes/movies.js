const express = require('express');
const Movie = require('../models/movieModel');
const Actor = require('../models/actorModel');
const Producer = require('../models/producerModel');
const User = require('../models/userModel');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const allMovies = await Movie.find();
    return  res.status(200).send({ success: true, allMovies });
  } catch (error) {
    console.log(error);
  }
}
);
route.get('/user/:user', async (req, res) => {
  try {
    const {user}=req.params;
    const allMovies = await User.findById(user).populate("movies");
    const movies=allMovies.movies;
    return  res.status(200).send({ success: true, movies });
  } catch (error) {
    console.log(error);
  }
}
);

route.post('/create',async (req, res) => {
  try {
    const { movieName, releaseYear, plot, poster, actors, producer ,user} = req.body;
    const existingMovie = await Movie.findOne({movieName,releaseYear,producer});
    if(existingMovie){
      return res.status(201).send({ success: false, message: "movie already exists" });
    }
    const movie = await Movie.create({
        movieName,
        releaseYear,
        plot, 
        poster,
        actors,
        producer
      });
      actors.forEach(async (actor) => {
          await Actor.findByIdAndUpdate(actor,{$push:{movies:movie._id}});
      });
      await Producer.findByIdAndUpdate(producer,{$push:{movies:movie._id}});
      await User.findByIdAndUpdate(user,{$push:{movies:movie._id}});
      return res.status(200).send({ success: true, message: "Movie added successfully" });
  } catch (error) {
    console.log(error);
  }
});

route.post('/edit',async (req, res) => {
  try {
    const { id , movieName, releaseYear, plot, poster, actors, producer } = req.body;
    await Movie.findByIdAndUpdate(
      id,
      {
        movieName,
        releaseYear,
        plot, 
        poster,
        actors,
        producer
      }
    );
    return res.status(200).send({ success: true, message: "Movie updated successfully" });
  } catch (error) {
    console.log(error);
  }
})

route.get('/populate/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const movie = await Movie.findById(id)
    .populate({
      path:"actors",
      select:"_id name"
    })
    .populate({
      path:"producer",
      select:"_id name"
    })
    return res.status(200).send({ success: true, movie});
  } catch (error) {
    console.log(error);
  }
})

route.get('/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const movie = await Movie.findById(id)
    return res.status(200).send({ success: true, movie});
  } catch (error) {
    console.log(error);
  }
})

module.exports=route;