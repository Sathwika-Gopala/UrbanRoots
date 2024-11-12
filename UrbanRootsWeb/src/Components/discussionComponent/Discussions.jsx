import React, { useState, useEffect } from 'react';
import NavBar from '../landingPageComponent/NavBar';
import PostModal from './postModal';
import PostList from './PostList';
import ForumHeader from './forumHeader';

// Helper function to handle localStorage operations
const getPostsFromStorage = () => {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
};

const savePostsToStorage = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
//loading posts from api
  useEffect(() => {
    fetch('http://139.84.149.135/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // const handleNewPost = (post) => {
  //   const updatedPosts = [...posts, { ...post, id: posts.length + 1, comments: [] }];
  //   setPosts(updatedPosts);
  //   setModalOpen(false);
  // };
  const handleNewPost = (post) => {
    fetch('http://139.84.149.135/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setModalOpen(false);
      })
      .catch((error) => console.error('Error creating post:', error));
  };
  

  const handleSelectPost = (postId) => {
    setSelectedPost(posts.find(post => post.id === postId));
  };

  // const handleDeletePost = (postId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  //   if (confirmDelete) {
  //     const updatedPosts = posts.filter(post => post.id !== postId);
  //     setPosts(updatedPosts);
  //   }
  // };
  const handleDeletePost = (postId) => {
    fetch(`http://139.84.149.135/api/posts/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error('Error deleting post:', error));
  };
  

  // const handleAddComment = (postId, comment) => {
  //   const updatedPosts = posts.map(post => {
  //     if (post.id === postId) {
  //       return { ...post, comments: [...post.comments, comment] };
  //     }
  //     return post;
  //   });
  //   setPosts(updatedPosts);
  // };
  const handleAddComment = (postId, comment) => {
    fetch(`http://139.84.149.135/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: updatedPost.comments } : post
          )
        );
      })
      .catch((error) => console.error('Error adding comment:', error));
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
