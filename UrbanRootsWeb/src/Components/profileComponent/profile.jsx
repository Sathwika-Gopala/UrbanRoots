import React, { useEffect, useState } from 'react';
import NavBar from "../landingPageComponent/NavBar";
import './Profile.css'; 
import profilePic from "../../assets/image2.avif";
import profileIcon from "../../assets/profileIconbg.png";
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import MyDiscussions from './MyDiscussions'; 

const PersonalInfo = ({ selectedImage, setSelectedImage, profileData }) => {
  const [fileName, setFileName] = useState('');
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the image in the state
        localStorage.setItem('profileImage', reader.result); // Store the image in localStorage
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };
  
  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };

  const handleDeletePhoto = () => {
    setSelectedImage(null);
    setFileName('');
    localStorage.removeItem('profileImage'); // Remove the image from localStorage
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
              value={profileData?.username || ''} 
              placeholder="Enter your name" 
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              className="input-box" 
              value={profileData?.email || ''} 
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
              value={profileData?.contact || ''} 
              placeholder="Enter your contact number" 
            />
          </div>
          <div className="form-field">
            <label htmlFor="location">Location:</label>
            <input 
              type="text" 
              className="input-box" 
              value={profileData?.location || ''} 
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

function Profile() {
  const [activeSection, setActiveSection] = useState('PersonalInfo');
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('profileImage') || null); // Load from localStorage
  const [profileData, setProfileData] = useState(null); 
  const [userPosts, setUserPosts] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setProfileData(parsedData);

      // Fetch the user's posts
      fetch(`http://localhost:5000/api/posts?userId=${parsedData.id}`)
        .then((response) => response.json())
        .then((data) => setUserPosts(data))
        .catch((error) => console.error('Error fetching user posts:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("profileImage"); // Remove the profile image from localStorage
    navigate("/login");
  };
  
  const renderContent = () => {
    switch (activeSection) {
      case 'PersonalInfo':
        return <PersonalInfo selectedImage={selectedImage} setSelectedImage={setSelectedImage} profileData={profileData} />;
      case 'FavoriteEvents':
        return <FavoriteEvents />;
      case 'Settings':
        return <MyDiscussions posts={userPosts} />; 
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
            src={selectedImage || profilePic} 
            alt="Profile"
            className="profile-image"
          />
          <h3>{profileData?.username || ''}</h3>
          <ul>
            <li onClick={() => setActiveSection('PersonalInfo')} className={activeSection === 'PersonalInfo' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <img src={profileIcon} alt="Profile Icon" className="icon" /> Personal Info
            </li>
            {/* <li onClick={() => setActiveSection('FavoriteEvents')} className={activeSection === 'FavoriteEvents' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <img src={profileIcon} alt="Profile Icon" className="icon" /> Events Attended
            </li> */}
            <li onClick={() => setActiveSection('Settings')} className={activeSection === 'Settings' ? 'active' : ''} style={{ fontSize: '22px' }}>
              <span className="icon">&#128172;</span> My Discussions
            </li>
          </ul>
          <div className='logoutButton' onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <li style={{ color: '#FF6347', fontSize: '24px' }}>
              <span className="logoutIcon">
                <FaSignOutAlt />
              </span> Logout
            </li>
          </div>
        </div>

        <div className="content">
          {renderContent()} 
        </div>
      </div>
    </div>
  );
}

export default Profile;
