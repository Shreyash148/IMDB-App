import React, { useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavbarNew } from '../../components/Heading/Navbar'

export default function Register(props) {
    const navigate = useNavigate()
    const [info, setInfo] = useState({ name: "", password: "", email: "", phoneNo: "", address: "",answer:""});
    const handleInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, {
            name: info.name,
            email: info.email,
            contactNumber: info.phoneNo,
            address: info.address,
            answer:info.answer,
            password: info.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        if(response.data.success){
          alert(response.data.message);
           return navigate('/login');
        }
        else{
            return alert(response.data.message);
        }
    }
    return (
        <>  
        <div className="App">
        <NavbarNew page="" />
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                    <h1 style={{ marginBottom: "1.5rem" }}>Register Here</h1>
                        <input type='text' className='input' placeholder='Name' value={info.name} name="name" onChange={handleInfo} required /><br />
                        <input type='text' className='input' placeholder='Email' value={info.email} name="email" onChange={handleInfo} required /><br />
                        <input type='text' className='input' placeholder='Address' value={info.address} name="address" onChange={handleInfo} required /><br />
                        <input type='text' className='input' placeholder='Phone No.' value={info.phoneNo} name="phoneNo" onChange={handleInfo} required /><br />
                        <input type='text' className='input' placeholder='What is your favorite sports?' value={info.answer} name="answer" onChange={handleInfo} required /><br />
                        <input type='text' className='input' placeholder='Password' value={info.password} name="password" onChange={handleInfo} required /><br />
                        <div className='submit'><button type='submit' >Sign Up</button></div>
                    </form>
                </div>
              </div>
        </>
    )
}
