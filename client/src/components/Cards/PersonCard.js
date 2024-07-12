import React, { useEffect, useState } from 'react'
import "./card.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PersonCard(props) {
  const [person,setPerson] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    const getPersonDetails = async()=>{
      try {
        if(props.id){
          const res = await axios.get(`${process.env.REACT_APP_URL}/${props.personType}/${props.id}`);
          if(props.personType==='actor')setPerson(res.data.actor);
          if(props.personType==='producer')setPerson(res.data.producer)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPersonDetails();
  },[props])
  return (
    <>
      <div className="person-card" onClick={()=>navigate(`/${props.personType}/${props.id}`)}>
        <img alt="x" src={person?.image} className="person-img"/>
        <div className="person-card-content">
          <div className="first-line">{person?.name}</div>
          <div className="descri">Born : {new Date(person?.dob).toDateString()}</div>
        </div>
      </div>
    </>
  )
}

export default PersonCard