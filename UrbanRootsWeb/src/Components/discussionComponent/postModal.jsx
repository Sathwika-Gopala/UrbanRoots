import React, { useState, useEffect } from 'react';

const PostModal = ({ isOpen, onClose, onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState({ name: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData({ name: parsedData.username || '' });
    }
  }, []);

  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both the title and content.');
      return;
    }

    const newPost = { title, content, author: userData.name, date: new Date() };
    onPostCreate(newPost);

    setTitle('');
    setContent('');
    setError('');
    onClose();
  };

  return isOpen ? (
    <div className="post-modal-overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
        ></textarea>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  ) : null;
};

export default PostModal;
