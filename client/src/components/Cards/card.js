import React, { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieForm from '../Forms/MovieForm';

export const Card = (props) => {
  const [movie,setMovie] = useState();
  const [showMovieForm,setShowMovieForm]=useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const getMovieDetails = async()=>{
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/movie/${props.id}`);
        setMovie(res.data.movie);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieDetails();
  },[props.id]);
  return (
    <>
      <div className="card">
        <div className="img">
          <img alt="x" src={movie?.poster} onClick={()=>navigate(`/movie/${props.id}`)}/>
        </div>
        <div className="card-content" onClick={()=>navigate(`/movie/${props.id}`)}>
          <div className="first-line">{movie?.movieName.substring(0,50)}</div>
          <div className="descri">{movie?.plot.substring(0,70)}...</div>
        </div>
        {props.edit && <img alt="tool" src="tool.svg" className='tool' onClick={()=>setShowMovieForm(true)}/>}
      </div>
      {showMovieForm && <MovieForm close={()=>setShowMovieForm(false)} operation="edit" id={props.id}/>}
    </>
  )
}
