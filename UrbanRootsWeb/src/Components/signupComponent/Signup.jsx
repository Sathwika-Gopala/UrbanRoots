<<<<<<< HEAD
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const naviate = useNavigate();
  const handleSubmit = ()=> {
    naviate('/landingPage')
  }
  return (
    <div className='page-container'>
      {/* Header Section */}
      <header className='header'>
        <h1>Welcome to Nature's Platform</h1>
      </header>

      {/* Signup Section */}
      <div className='sign-up-container'>
        <h2>Sign Up</h2>
        <form className='sign-up-form'>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder='Username' />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" autoComplete='off' placeholder='Email' />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder='*******' />

          <button type='submit' onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
=======

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../landingPageComponent/NavBar";
import sideImage from "../../assets/loginPage1bg.png"; // Your image path
import axios from "axios"; // Import axios for API calls
import '@fortawesome/fontawesome-free/css/all.min.css';


function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.contact ||
      !formData.location ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("All fields are required.");
      setShowModal(true);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }
    try {
      // Send signup data to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData
      );
      console.log(response.data);
      navigate("/landingPage"); // Redirect on success
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
  setShowModal(true);
      } else {
        console.error("Error signing up", error);
        alert('An unexpected error occurred. Please try again.'); // General error message
      }
    }
  };

  return (
    <div className="signup-page">
      <div>
        <NavBar />
      </div>
      <div className="signupPage">
        <div className="sideImageCont">
          <div className="image-container">
            <img src={sideImage} alt="Nature Side" className="side-image" />
          </div>
          <div className="text-container">
            <h2>Welcome</h2>
            <p>
              "Join a community where nature, learning, and connection thrive.
              Together, we create space for growth, sustainability, and
              meaningful interactions for all."
            </p>
          </div>
        </div>

        <div className="sign-up-container">
  <h1>Create Account</h1>
  <form className="sign-up-form" onSubmit={handleSubmit}>
  <div className="input-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="username"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
    </div>

    <div className="input-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        autoComplete="off"
      />
    </div>
   {/* Contact No and Location on the same line */}
   <div className="input-group">
      <label htmlFor="contactNo">Contact No:</label>
      <input
        type="text"
        id="contact"
        value={formData.contactNo}
        onChange={handleInputChange}
        placeholder="Contact No"
      />
    </div>

    <div className="input-group">
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="Location"
      />
    </div>

    {/* Password and Confirm Password on the same line */}
    <div className="input-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="************"
      />
    </div>

    <div className="input-group">
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="************"
      />
    </div>

    <div className="button-container">
      <button
        type="button"
        className="cancel-button"
        onClick={() => navigate("/landingPage")}
      >
        Cancel
      </button>
      <button type="submit" className="button-submit">Sign Up</button>
    </div>
  </form>
</div>
{showModal && (
 <div className="modal">
 <div className="modal-content animated">
   <span className="close" onClick={() => setShowModal(false)}>&times;</span>
   <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
     <div className="circle-cross">
       <span className="cross-sign">&#x2716;</span>
     </div>
     <p className='modal-text' style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
   </div>
   <button className= 'cross-button' onClick={() => setShowModal(false)}>Close</button>
 </div>
</div>
)}

      </div>
    </div>
  );
}

export default Signup;
>>>>>>> origin
