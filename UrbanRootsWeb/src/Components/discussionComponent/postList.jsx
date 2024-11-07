import React from 'react';
import PostItem from './postItem'; // Assuming PostItem is rendering individual posts
import CommentSection from './commentSection'; // Assuming CommentSection handles adding/displaying comments

const PostList = ({ posts, onSelectPost, onDeletePost, onAddComment }) => {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p className='p1'>No posts yet. Be the first to create one!</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-container">
            <PostItem 
              post={post} 
              onSelectPost={onSelectPost} 
              onDeletePost={onDeletePost} 
              onAddComment={onAddComment}
            />
            {/* <CommentSection
              comments={post.comments || []} 
              onCommentAdd={(comment) => onAddComment(post.id, comment)}
            /> */}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
