import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForumHeader = ({ onNewPost }) => {
  const navigate = useNavigate();

  const handleNewPostClick = () => {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      // If logged in, proceed to open the post modal
      onNewPost();
    } else {
      // If not logged in, redirect to the login page
      navigate('/login');
    }
  };

  return (
      <div className="forum-header-container">
      <h1 className="forum-heading">"Sprout Your Thoughts"</h1>
      <h3 className='forum-subHeading'>Start a Discussion, Let it Grow !</h3>
      <div className="forum-header-divider"></div>
      <div className="forum-actions">
        <button className="new-post-button" onClick={handleNewPostClick}>+ New Post</button> 
      </div>
      </div>
  );
};

export default ForumHeader;
