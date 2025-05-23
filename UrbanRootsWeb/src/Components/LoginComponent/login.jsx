import React, { useState } from 'react';
import NavBar from "../landingPageComponent/NavBar"; // Import your NavBar
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome icons

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending login data to the backend API
      const response = await axios.post(
        "http://139.84.149.135/api/login",
        formData
      );

      localStorage.setItem("userData", JSON.stringify(response.data));
      console.log(response.data);
      navigate("/events"); // Redirect on success
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show error message if username and password don't match
        setErrorMessage("Incorrect username or password.");
        setShowModal(true);
      } else {
        console.error("Error logging in", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <NavBar />

      <div className="login-page">
        <h1>Welcome Back, Green Thumb!</h1>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="username" className="login-label">Username:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="login-input"
                required
              />
              <label htmlFor="password" className="login-label">Password:</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="************"
                className="login-input"
                required
              />
            </div>

            <div className="login-button-container">
              <button type="submit" className="login-button">Login</button>
            </div>
            <div className="signup-redirect">
              <p>New to UrbanRoots? <Link to="/signup">Sign up </Link></p>
            </div>
          </form>

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
    </div>
  );
}

export default Login;
