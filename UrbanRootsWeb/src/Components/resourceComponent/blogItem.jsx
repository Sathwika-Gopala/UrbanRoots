import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import Chip from'./chip';
const BlogItem = ({blog: {id, description, title, createdAt, authorName, authorAvatar, category, cover}}) => {
  return (
    <div className='blogItem-wrap'>
        <img src={cover} alt="cover image" className='blogItem-cover'/>
        <Chip label={category}/>
        <h3>{title}</h3>
        <p className='blogItem-description'>{description}</p>
        <footer>
            <div className='blogItem-author'>
                <img src={authorAvatar} alt='avatar'/>
                <div>
                    <h6>{authorName}</h6>
                    <p>{createdAt}</p>
                </div>
            </div>
            <Link className='blogItem-link' to ={`/resources/${id}`}><ArrowForwardIcon/></Link >
        </footer>
    </div>
  )
}

export default BlogItem