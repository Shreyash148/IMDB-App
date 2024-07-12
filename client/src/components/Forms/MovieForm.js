import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMovieForm, resetMovieForm } from '../../actions';
import './modal.css';
import PersonForm from './PersonForm';
import axios from 'axios';
import { useAuth } from '../../context/contextapi';

const MovieForm = (props) => {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [auth, setAuth] = useAuth();

  const [actorInput, setActorInput] = useState('');
  const [producerInput, setProducerInput] = useState('');
  const [showActorDropdown, setShowActorDropdown] = useState(false);
  const [filteredActors, setFilteredActors] = useState([]);
  const [showProducerDropdown, setShowProducerDropdown] = useState(false);
  const [filteredProducers, setFilteredProducers] = useState([]);
  const [showPersonForm, setShowPersonForm] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      if (files && files.length > 0) {
        const file = files[0];
        // console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader?.result?.toString() || "";
          dispatch(updateMovieForm(name, base64String));
        };
        reader.readAsDataURL(file);
      }
    } else {
      dispatch(updateMovieForm(name, value));
    }
  };

  const handleActorChange = async (e) => {
    const value = e.target.value;
    setActorInput(value);
    if (value) {
      const res = await axios.get(`${process.env.REACT_APP_URL}/actor/filter/${value}`);
      const filtered = res.data;
      setFilteredActors(filtered);
      setShowActorDropdown(true);
    } else {
      setShowActorDropdown(false);
    }
  };

  const handleActorSelect = (actor) => {
    let check = false;
    if (formData.actors.length > 0)
      formData.actors.map((x) => {
        if (x._id === actor._id) check = true;
        return x;
      });
    if (!check) {
      dispatch(updateMovieForm('actors', [...formData.actors, actor]));
      setActorInput('');
    } else {
      alert("already added");
    }
    setShowActorDropdown(false);
  };

  const handleProducerChange = async (e) => {
    const value = e.target.value;
    setProducerInput(value);
    if (value) {
      const res = await axios.get(`${process.env.REACT_APP_URL}/producer/filter/${value}`);
      const filtered = res.data;
      setFilteredProducers(filtered);
      setShowProducerDropdown(true);
    } else {
      setShowProducerDropdown(false);
    }
  };

  const handleProducerSelect = (producer) => {
    dispatch(updateMovieForm('producers', producer));
    setProducerInput(producer.name);
    setShowProducerDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allActors = formData.actors.map((actor) => { return actor._id });
    if (auth?.user?._id) {
      const movieData = {
        movieName: formData.movieName,
        releaseYear: formData.yearOfRelease,
        plot: formData.plot,
        poster: formData.poster,
        actors: allActors,
        producer: formData.producers._id,
      }
      if(props.operation==="edit")movieData.id=props.id;
      else movieData.user=auth.user._id;
      // console.log(movieData)
      const res = await axios.post(`${process.env.REACT_APP_URL}/movie/${props.operation}`,movieData)
      if (res.data.success) {
        alert(res.data.message);
        dispatch(resetMovieForm());
        setProducerInput('');
        props.close();
      } else {
        alert(res.data.message);
      }
    } else {
      alert("something went wrong");
    }
  };

  useEffect(()=>{
    const getMovieDetails = async()=>{
      if(props.id){
        const res = await axios.get(`${process.env.REACT_APP_URL}/movie/populate/${props.id}`);
        const movie=res.data.movie;
        // console.log(movie);
        dispatch(updateMovieForm('movieName',movie.movieName));
        dispatch(updateMovieForm('plot',movie.plot));
        dispatch(updateMovieForm('poster',movie.poster));
        dispatch(updateMovieForm('actors',movie.actors));
        dispatch(updateMovieForm('producers',movie.producer));
        dispatch(updateMovieForm('yearOfRelease',movie.releaseYear));
        setProducerInput(movie.producer.name);
      }
    }
    if(props.operation==="edit")getMovieDetails();
  },[props.operation,props.id,dispatch]);

  return (
    <div className="modal-container">
      <div className="form-container">
        <div className='close' onClick={() => props.close()}>
          <span style={{ "backgroundColor": "red", "padding": "0.5rem", "cursor": "pointer" }}>X</span>
        </div>
        <h1>Movie Information Form</h1>
        <form encType="multipart/form-data" className="form movie-form">
          <div className='movie-poster-container'>
          {
            formData.poster?
            <img src={formData.poster} alt="profile" className='movie-poster'/>
            :<img src='/photo.png' alt="profile" className='movie-poster'/>
          }
          </div>
          <label className="form-label">
              Poster:
              <input type="file" name="poster" accept="image/*" onChange={handleChange} required />
            </label>
            <br />
          <label className="form-label">
            Movie Name:
            <input type="text" name="movieName" value={formData.movieName} onChange={handleChange} required />
          </label>
          <br />

          <label className="form-label">
            Year of Release:
            <input type="number" name="yearOfRelease" value={formData.yearOfRelease} onChange={handleChange} required />
          </label>
          <br />

          <label className="form-label">
            Plot:
            <br />
            <textarea name="plot" rows="5" cols="33" value={formData.plot} onChange={handleChange} required></textarea>
          </label>
          <br />

          <label className="form-label">
            Actors:
            <ul className="actor-list">
              {formData.actors.map((actor, index) => (
                <li key={index}>{actor.name}</li>
              ))}
            </ul>
            <input
              type="text"
              name="actorInput"
              value={actorInput}
              onChange={handleActorChange}
              onFocus={() => setShowActorDropdown(actorInput.length > 0)}
            />
            {showActorDropdown && (
              <ul className="custom-dropdown">
                {filteredActors.length > 0 ? filteredActors.map((actor, index) => (
                  <li key={index} onClick={() => handleActorSelect(actor)}>
                    {actor.name}
                  </li>
                )) :
                  <li onClick={() => { setShowPersonForm("Actor") }}>Create New Actor</li>
                }
              </ul>
            )}
          </label>
          <br />
          <br />

          <label className="form-label">
            Producers:
            <input
              type="text"
              name="producers"
              value={producerInput}
              onChange={handleProducerChange}
              required
            />
            {showProducerDropdown && (
              <ul className="custom-dropdown">
                {
                  filteredProducers.length > 0 ? filteredProducers.map((producer, index) => (
                    <li key={index} onClick={() => handleProducerSelect(producer)}>
                      {producer.name}
                    </li>
                  ))
                    :
                    <li onClick={() => { setShowPersonForm("Producer") }}>Create New Producer</li>
                }
              </ul>
            )}
          </label>
          <br />

          <input type="button" value="Submit" className="form-submit" onClick={handleSubmit} />
        </form>
        {showPersonForm && <PersonForm close={() => setShowPersonForm(null)} personType={showPersonForm} />}
      </div>
    </div>
  );
};

export default MovieForm;
