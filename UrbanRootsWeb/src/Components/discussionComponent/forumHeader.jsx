import React from 'react';

const ForumHeader = ({ onNewPost }) => {
  return (
    <div className="forum-header">
      <h1>UrbanRoots Forum</h1>
      <button className="new-post-button" onClick={onNewPost}>
        + New Post
      </button>
    </div>
  );
};

export default ForumHeader;
