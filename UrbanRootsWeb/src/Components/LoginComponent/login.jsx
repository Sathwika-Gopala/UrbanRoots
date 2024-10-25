import React, { useState } from 'react';
import NavBar from "../landingPageComponent/NavBar"; // Import your NavBar
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import sideImage from "../../assets/loginPage2.avif"; // Your image path
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome icons

function Login() {
  const [formData, setFormData] = useState({
    username: "",
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
      // Send login data to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );

      // Handle success
      console.log(response.data);
      navigate("/landingPage"); // Redirect on success
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
      {/* Include NavBar at the top */}
      <NavBar />

      <div className="login-page">
        
        {/* <div className="image-side">
          <img src={sideImage} alt="Login side" />
        </div> */}

        {/* Login form */}
        <div className="login-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="username" className="login-label">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="login-input"
                required
              />
            </div>

            <div className="login-input-group">
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
              <button type="submit" className="login-button">Sign In</button>
            </div>
            <div className="signup-redirect">
              <p>New to UrbanRoots? <Link to="/signup">Sign up here</Link></p>
            </div>
          </form>

          {showModal && (
            <div className="login-error-message">
              <p>{errorMessage}</p>
              <button className="login-close-error" onClick={() => setShowModal(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
