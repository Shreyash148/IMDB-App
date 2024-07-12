import React, { useEffect, useState } from 'react'
import './details.css'
import { NavbarNew } from '../../components/Heading/Navbar'
import PersonCard from '../../components/Cards/PersonCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MovieDetails = () => {
  const param =useParams();
  const [movie,setMovie] = useState({});
  useEffect(()=>{
    const getMovieDetails = async()=>{
      try {
        // console.log(param.id);
        const res = await axios.get(`${process.env.REACT_APP_URL}/movie/${param.id}`);
        // console.log(res.data.movie);
        setMovie(res.data.movie);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieDetails();
  },[param.id])
  return (
    <>
      <div className='detailContainer'>
        <NavbarNew page="" />
          <div className="basicDetails">
            <img alt="x" src={movie?.poster} className="image" />
            <div className='name'>{movie?.movieName}</div>
            <div className='date'>released in {movie?.releaseYear}</div>
            <div className="infoTitle">Plot : </div>
            <div className="info">
              {movie?.plot}
            </div>
          </div>
          <div className='infoTitle'>Producer</div>
          <div className="producer">
            <PersonCard personType="producer" id={movie?.producer}/>
          </div>
          <div className='infoTitle'>Actors</div>
          <div className="slider">
            {
              movie?.actors?.length>0?
              movie.actors.map((actor)=>
              {
                return (
                <div key={actor}>
                  <PersonCard personType="actor" id={actor}/>
                </div>
                )
              }):""
            }
          </div>
      </div>
    </>
  )
}

export default MovieDetails;