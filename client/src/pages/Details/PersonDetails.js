import React, { useEffect, useState } from 'react'
import './details.css'
import { NavbarNew } from '../../components/Heading/Navbar'
import { Card } from '../../components/Cards/card'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const PersonDetails = () => {
  const {pathname}=useLocation();
  const [person,setPerson] = useState();
  useEffect(()=>{
    const getPersonDetails = async()=>{
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}${pathname}`);
        if(pathname.includes('actor'))setPerson(res.data.actor);
        if(pathname.includes('producer'))setPerson(res.data.producer)
      } catch (error) {
        console.log(error);
      }
    }
    getPersonDetails();
  },[pathname])
  return (
    <>
      <div className='detailContainer'>
        <NavbarNew page="" />
        <div className="basicDetails">
          <img alt="x" src={person?.image} className="image" />
          <div className='name'>{person?.name}</div>
          <div className='date'>Born on {new Date(person?.dob).toDateString()}</div>
          <div className='info'>{person?.gender}</div>
          <div className="infoTitle">Bio : </div>
          <div className="info">
            {person?.bio}
          </div>
        </div>
        <div className='infoTitle'>Movies</div>
        <div className="slider">
          {
            person?.movies.length>0?
            person.movies.map((single)=>
            {
              return <Card id={single._id} edit={false}/>
            }
            ):""
          }
        </div>
      </div>
    </>
  )
}

export default PersonDetails