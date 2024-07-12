import React, { useEffect, useState } from 'react'
import { NavbarNew } from '../components/Heading/Navbar'
import { useAuth } from '../context/contextapi';
import { Card } from '../components/Cards/card';
import axios from 'axios';

export const MyMovies = () => {
  const [movies, setMovies] = useState([])
  const [auth, setAuth] = useAuth();
  const user = auth?.user?._id
  useEffect(() => {
    const getUserMovies = async () => {
      if (user) {
        const res = await axios.get(`${process.env.REACT_APP_URL}/movie/user/${user}`);
        setMovies(res.data.movies);
      } else {
        alert("something went wrong");
      }
    }
    getUserMovies();
  }, [user]);
  return (
    <>
      <div className='App'>
        <NavbarNew page='mymovies' />
        <div className="row">
          {
            movies.length>0?
            movies.map((movie)=>{
              return (
                <div key={movie?._id}>
                  <Card id={movie?._id} edit={true}/>
                </div>
              )
            }):""
          }
        </div>
      </div>
    </>
  )
}
