import React, { useState } from 'react';
import NavBar from '../landingPageComponent/NavBar';
import PostModal from './postModal';
import PostList from './postList';
import ForumHeader from './forumHeader';

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNewPost = (post) => {
    setPosts([...posts, { ...post, id: posts.length + 1, comments: [] }]);
    setModalOpen(false);
  };

  const handleSelectPost = (postId) => {
    setSelectedPost(posts.find(post => post.id === postId));
  };

  const handleDeletePost = (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };
  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div>
      <NavBar />
      <div className="forum-page">
        <ForumHeader onNewPost={() => setModalOpen(true)} />
        <PostList
          posts={posts}
          onSelectPost={handleSelectPost}
          onDeletePost={handleDeletePost}
          onAddComment={handleAddComment}
        />
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onPostCreate={handleNewPost}
        />
      </div>
    </div>
  );
};

export default Discussion;
