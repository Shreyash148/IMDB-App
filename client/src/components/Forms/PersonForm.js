import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonForm, resetPersonForm } from '../../actions';
import './modal.css'; 
import axios from 'axios';

const PersonForm = (props) => {
  const formData = useSelector((state) => state.personForm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.toString() || "";
        dispatch(updatePersonForm(name, base64String));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(updatePersonForm(name, value));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Submit form data to your backend
    const res = await axios.post(`${process.env.REACT_APP_URL}/${props.personType.toLowerCase()}/create`,
      {
        name:formData.name,
        gender:formData.gender,
        bio:formData.bio,
        dob:formData.dob,
        image:formData.photo
      }
    );
    if(res.data.success){
      alert(res.data.message);
      dispatch(resetPersonForm());
      props.close();
    }else{
      alert(res.data.message);
    }
  };

  return (
    <div className="modal-container">
      <div className="form-container">
        <div className='close' onClick={props.close}>
          <span style={{"backgroundColor":"red","padding":"0.5rem","cursor":"pointer"}}>X</span>
        </div>
        <h1>{props.personType} Information Form</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form actor-form">
        <div className='person-photo-container'>
          {
            formData.photo?
            <img src={formData.photo} alt="profile" className='person-photo'/>
            :<img src='/photo.png' alt="profile" className='person-photo'/>
          }
          </div>
        <label className="form-label">
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
          </label>
          <br/>
          <label className="form-label">
          {props.personType} Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <br/>

          <label className="form-label">
            Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </label>
          <br/>

          <label className="form-label">
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br/>

          <label className="form-label">
            Bio:
            <br />
            <textarea name="bio" rows="5" cols="33" value={formData.bio} onChange={handleChange} required></textarea>
          </label>
          <br/>

          <input type="submit" value="Submit" className="form-submit" />
        </form>
      </div>
    </div>
  );
};

export default PersonForm;
