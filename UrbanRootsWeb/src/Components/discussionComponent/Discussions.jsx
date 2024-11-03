import React, {useState} from 'react'
import NavBar from '../landingPageComponent/NavBar'
import PostModal from './postModal'
import PostList from './postList'
import ForumHeader from './forumHeader'
const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNewPost = (post) => {
    setPosts([...posts, { ...post, id: posts.length + 1, replies: [] }]);
  };

  const handleSelectPost = (postId) => {
    setSelectedPost(posts.find(post => post.id === postId));
  };

  return (
    <div>
      <NavBar/>
      <div className="forum-page">
      <ForumHeader onNewPost={() => setModalOpen(true)} />
      <PostList posts={posts} onSelectPost={handleSelectPost} />
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onPostCreate={handleNewPost}
      />
    </div>
    </div>
  )
}

export default Discussion