import React, { useState } from 'react';

const CommentSection = ({ comments, onCommentAdd }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onCommentAdd({ text: newComment, date: new Date() }); 
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p>{comment.text}</p>
            <span>{new Date(comment.date).toLocaleString()}</span> 
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className='commentInput'
      />
      <button className='commentSubmit' onClick={handleAddComment}>Submit</button>
    </div>
  );
};

export default CommentSection;
