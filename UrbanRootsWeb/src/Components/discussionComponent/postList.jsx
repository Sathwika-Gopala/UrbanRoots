import React from 'react';
import PostItem from './postItem';
import CommentSection from './CommentSection'; 

const PostList = ({ posts, onSelectPost, onDeletePost, onAddComment }) => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-container">
          <PostItem 
            post={post} 
            onSelectPost={onSelectPost} 
            onDeletePost={onDeletePost} 
          />
          <CommentSection
            comments={post.comments || []} 
            onCommentAdd={(comment) => onAddComment(post.id, comment)}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
