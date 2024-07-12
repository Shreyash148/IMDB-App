import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './contextapi';
import axios from 'axios';

export default function PrivateRoutes() {
    const [ok,setOk]=useState();
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
        const authCheck=async()=>{
            const res = await axios(`${process.env.REACT_APP_URL}/user-auth`,{
                headers:{
                    'Authorization':auth?.authToken
                }
            })
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.authToken)authCheck();
    },[auth?.authToken,navigate])
  return (
    ok?<div><Outlet/></div>:"loading..."
  )
}
