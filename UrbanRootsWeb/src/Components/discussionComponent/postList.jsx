import React from 'react'
import PostItem from './postItem'

const PostList = ({ posts, onSelectPost }) => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post.id} post={post} onSelectPost={onSelectPost} />
      ))}
    </div>
  );
};

export default PostList;
