import React, {useState}from 'react';
const DeleteIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 16 16">
    <path d="M2 1.5h12a.5.5 0 0 1 .5.5v1h-13v-1a.5.5 0 0 1 .5-.5zM2 3h12v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm3 1v8m2-8v8m2-8v8" strokeWidth="1.5" />
  </svg>
);

const LikeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="red" viewBox="0 0 16 16">
    <path d="M8 15S3 12 1 8.5C-.348 5.651 1.045 2 4 2c1.41 0 2.691.53 3.707 1.414L8 4.5l.293-.086C9.309 2.53 10.59 2 12 2c2.955 0 4.348 3.651 3 6.5C13 12 8 15 8 15z" strokeWidth="1.5" />
  </svg>
);

const LikeIconFilled = () => (
  <svg width="16" height="16" fill="#FF4D4D" viewBox="0 0 16 16">
    <path d="M8 15S3 12 1 8.5C-.348 5.651 1.045 2 4 2c1.41 0 2.691.53 3.707 1.414L8 4.5l.293-.086C9.309 2.53 10.59 2 12 2c2.955 0 4.348 3.651 3 6.5C13 12 8 15 8 15z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5C0 .671.671 0 1.5 0h13c.829 0 1.5.671 1.5 1.5v11c0 .829-.671 1.5-1.5 1.5H2l-2 2v-2H1.5C.671 14 0 13.329 0 12.5v-11z" strokeWidth="1.5" />
  </svg>
);

const PostItem = ({ post, onSelectPost, onDeletePost }) => {
  const formattedDate = new Date(post.date).toLocaleDateString();
  const repliesCount = post.replies?.length || 0;
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="post-item">
      <h3 onClick={() => onSelectPost(post.id)}>{post.title}</h3>
      <h4>{post.content}</h4>
      <p>by {post.author}</p>
      <span>{formattedDate}</span>
      {/* <span>{repliesCount} replies</span> */}
      <div className="post-icons">
        <button onClick={() => onDeletePost(post.id)} className='deleteButton'>
          <DeleteIcon />
        </button>
        <button
          onClick={handleLikeToggle}
          style={{ cursor: 'pointer', color: isLiked ? '#FF4D4D' : 'currentColor' }}
        >
          {isLiked ? (
            <LikeIconFilled />
          ) : (
            <LikeIcon />
          )}
        </button>
        <button className='commentButton'>
          <CommentIcon />
        </button>
      </div>
    </div>
  );
};

export default PostItem;
