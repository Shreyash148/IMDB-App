import React, { useState } from 'react'
import './auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/contextapi'
import { NavbarNew } from '../../components/Heading/Navbar'

export default function Login() {
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate()
  const [info, setInfo] = useState({ password: "", email: "" });
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  const handleLogin = async (e) => {
    e.preventDefault();
      const response = await axios.post(`${process.env.REACT_APP_URL}/auth/login`, {
        email: info.email,
        password: info.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      if (response.data.success) {
        alert(response.data.message);
        setAuth({...auth,user:response.data.user,authToken:response.data.authToken});
        localStorage.setItem("auth",JSON.stringify(response.data));
        return navigate('/');
      }
      else {
        return alert(response.data.message);;
      }

  }
  return (
    <>
      <div className="App">
      <NavbarNew page="" />
        <div className='container'>
          <form onSubmit={handleLogin}>
          <h1 style={{ marginBottom: "1.5rem" }}>Login Here</h1>
            <input type='text' className='input' placeholder='Email' value={info.email} onChange={handleInfo} name="email" required /><br />
            <input type='text' className='input' placeholder='Password' value={info.password} onChange={handleInfo} name="password" required /><br />
            <div className='submit'><button type='submit'>Login</button></div>
          </form>
        </div>
        </div>
    </>
  )
}
