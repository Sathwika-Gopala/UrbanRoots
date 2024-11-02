import React, { useEffect, useState } from 'react';
import NavBar from "../landingPageComponent/NavBar";
import './Profile.css'; // Import CSS for styling
import profilePic from "../../assets/image2.avif";
import profileIcon from "../../assets/profileIconbg.png";
import eventIcon from "../../assets/star1.png";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
const PersonalInfo = ({ selectedImage, setSelectedImage, profileData }) => {
  const [fileName, setFileName] = useState(''); // Define fileName state
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file); // This key should match what multer expects
      formData.append('userId', profileData.id); // Assuming profileData has ID
  
      try {
        await axios.post('http://localhost:5000/api/upload-profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important to set the content type
          },
        });
        console.log('Profile picture uploaded successfully.');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };
  
  
  const triggerFileInput = () => {
    document.getElementById('file-upload').click(); // Simulate click on hidden input
  };
  


  const handleDeletePhoto = () => {
    setSelectedImage(null);
    setFileName(''); // Reset file name
  };

  return (
    <div className='personal-info'>
      <div className="personal-info-container">
        <h2>My Profile</h2>
        <p className='headingInfo'>Set your name, bio, and other public-facing information.</p>
        <div className="upload-image-box">
          <div className='BoxAndText'>
            <div className="image-upload-container">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="image-upload-input"
                value={profileData?.profileimage || ''}
                id="file-upload" 
                style={{ display: 'none' }} 
              />
              <label 
                htmlFor="file-upload" 
                className="circular-upload-label"
                style={{ cursor: 'pointer' }}
                onClick={triggerFileInput}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="uploaded-image" />
                ) : (
                  <span 
                    className="fas fa-user-circle" 
                    style={{
                      fontSize: '6rem',
                      color: '#e0e0e0',
                      display: 'inline-block',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      lineHeight: '100px',
                      textAlign: 'center'
                    }}
                  ></span>
                )}
              </label>
              <p className="file-status">{fileName || 'No file selected'}</p>
            </div>
            <div className="upload-text">
              <h3>Upload Your Image</h3>
              <p>Please upload your passport size photo</p>
            </div>
          </div>
          <div className="button-container">
            <button className="upload-button" onClick={triggerFileInput}>
              Upload File
            </button>
            <button className="delete-button" onClick={handleDeletePhoto} disabled={!selectedImage}>
              Delete Photo
            </button>
          </div>
        </div>
      </div>
      <div className="update-profile-container">
        <h2>Update Your Profile</h2>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              className="input-box" 
              value={profileData?.username || ''} // Use optional chaining for safety
              placeholder="Enter your name" 
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              className="input-box" 
              value={profileData?.email || ''} // Use optional chaining for safety
              placeholder="Enter your email" 
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="interests">Interests:</label>
            <textarea 
              className="textarea-box" 
              placeholder="Describe your interests..."
            ></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact">Contact:</label>
            <input 
              type="text" 
              className="input-box" 
              value={profileData?.contact || ''} // Use optional chaining for safety
              placeholder="Enter your contact number" 
            />
          </div>
          <div className="form-field">
            <label htmlFor="location">Location:</label>
            <input 
              type="text" 
              className="input-box" 
              value={profileData?.location || ''} // Use optional chaining for safety
              placeholder="Enter your location" 
            />
          </div>
        </div>
      </div>
      <div className="save-container">
        <button className="save-button">Save</button>
        <button className="cancel2-button">Cancel</button>
      </div>
    </div>
  );
};

const FavoriteEvents = () => (
  <div>
    <h2>Favorite Events</h2>
    <p>Your favorite events here.</p>
  </div>
);

const Settings = () => (
  <div>
    <h2>Settings</h2>
    <p>Your settings here.</p>
  </div>
);

function Profile() {
  const [activeSection, setActiveSection] = useState('PersonalInfo');
  const [selectedImage, setSelectedImage] = useState(null); // Move image state to Profile component
  const [profileData, setProfileData] = useState(null); // Profile data state
  const navigate = useNavigate(); // De
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setProfileData(parsedData); // Set profile data from localStorage
      setProfileData(parsedData);
      setSelectedImage(parsedData.profileimage ? `data:image/png;base64,${parsedData.profileimage}` : null); // Set the profile picture if it exists
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData"); // Clear user data from localStorage
    navigate("/login"); // Redirect to login or landing page
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'PersonalInfo':
        return <PersonalInfo selectedImage={selectedImage} setSelectedImage={setSelectedImage} profileData={profileData} />; // Pass profileData to PersonalInfo
      case 'FavoriteEvents':
        return <FavoriteEvents />;
      case 'Settings':
        return <Settings />;
      default:
        return <PersonalInfo selectedImage={selectedImage} setSelectedImage={setSelectedImage} profileData={profileData} />;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <div className="sidebar">
          <img
            src={selectedImage || profilePic} // Use selected image or fallback to default
            alt="Profile"
            className="profile-image"
          />
          <h3>{profileData?.username || ''}</h3>
          <ul>
            <li onClick={() => setActiveSection('PersonalInfo')} className={activeSection === 'PersonalInfo' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <img src={profileIcon} alt="Profile Icon" className="icon" /> Personal Info
            </li>
            <li onClick={() => setActiveSection('FavoriteEvents')} className={activeSection === 'FavoriteEvents' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <img src={eventIcon} alt="Profile Icon" className="icon" /> Events Attended
            </li>
            <li onClick={() => setActiveSection('Settings')} className={activeSection === 'Settings' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <span className="icon">&#128172;</span> Discussions
            </li>
          </ul>
          <div className='logoutButton' onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <li style={{ color: '#FF6347', fontSize: '24px' }}>
              <span className="logoutIcon">
                <FaSignOutAlt/>
              </span> Logout
            </li>
          </div>
        </div>

        <div className="content">
          {renderContent()} {/* Render the content based on active section */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
