import React from 'react';

const PostItem = ({ post, onSelectPost }) => {
  return (
    <div className="post-item" onClick={() => onSelectPost(post.id)}>
      <h3>{post.title}</h3>
      <p>by {post.author}</p>
      <span>{post.date}</span>
      <span>{post.replies.length} replies</span>
    </div>
  );
};

export default PostItem;
