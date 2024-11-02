import React, { useState } from 'react';

const PostModal = ({ isOpen, onClose, onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    onPostCreate({ title, content, author: 'Current User', date: new Date() });
    setTitle('');
    setContent('');
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
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  ) : null;
};

export default PostModal;
