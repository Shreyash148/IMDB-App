import React, { useState } from "react";
import './navbar.css';
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/contextapi";
import MovieForm from "../Forms/MovieForm";


export const NavbarNew = ({ page }) => {
  const [auth, setAuth] = useAuth();
  const [showMovieForm,setShowMovieForm]=useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      authToken: ""
    })
    localStorage.removeItem("auth");
  }
  return (
    <>
    <nav style={{ alignItems: "center" }} className="navbar">
      <div className="hidde" style={{ paddingBlock: 10 }}>
        <Link to="/" style={{ marginRight: "20px" }} className="about">
          <span className={page === '/' ? `selectedpage` : `clear`}>
            Home
          </span>
        </Link>
        <Link to={auth.user?"/mymovies":"/login"} style={{ marginRight: "20px" }} className="about">
          <span className={page === 'mymovies' ? `selectedpage` : `clear`}>
            My Movies
          </span>
        </Link>
      </div>
      <div className="user-items">
        {!auth.user?
        <>
        <Link to="/register" className="auth-button">Register</Link>
        <Link to="/login" className="auth-button">Login</Link>
        </>
        :<>
          <div className='create-button' onClick={()=>setShowMovieForm(true)}>
            + Add Movie
          </div>
          <div className='dropdown'>
            <div className="profile">
              <img alt="profile" src="/profileImg.svg" />
              {auth?.user?.name.substring(0,10)}
            </div>
              <Link to="/login" onClick={handleLogout} style={{ textDecoration: "none" }} className="dropdown-content">Logout</Link>
          </div>
      </>
      } 
      </div>
    </nav>
    {showMovieForm && <MovieForm close={()=>setShowMovieForm(false)} operation="create" id={null}/>}
    </>
  );
};
