import React, { useEffect, useState } from 'react'
import { NavbarNew } from '../components/Heading/Navbar'
import { Card } from '../components/Cards/card'
import axios from 'axios'

function Home() {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    const getAllMovies = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_URL}/movie`);
      setMovies(res.data.allMovies);
    }
    getAllMovies();
  },[])
  return (
    <>
      <div className='App'>
      <NavbarNew page="/" />
      <div className='row'>
        {
          movies.length>0?movies.map((movie)=>{
              return(
                <div key={movie?._id}>
                  <Card id={movie?._id} edit={false}/>
                </div>
              )
          }):""
        }
      </div>
      </div>
    </>
  )
}

export default Home