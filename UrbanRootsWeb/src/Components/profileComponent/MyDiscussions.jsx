import React from 'react';

const MyDiscussions = ({ posts }) => {
  return (
    <div className='MyDiscussions'>
      <h2>My Discussions</h2>
      <div className='MyDiscussions-section'>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No discussions found.</p>
      )}
      </div>
    </div>
  );
};

export default MyDiscussions;
