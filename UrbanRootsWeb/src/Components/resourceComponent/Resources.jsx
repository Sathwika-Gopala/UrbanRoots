import React from 'react'
import NavBar from '../landingPageComponent/NavBar'
import SearchBar from './searchBar'
import BlogList from './blogList'
import { blogList } from '../../config/resourcesData'
import { useState } from 'react'
import EmptyList from './emptyList'
const Resources = () => {
  const [blogs, setBlogs] = useState(blogList)
  const [searchKey, setSearchKey] = useState('')
  //search submit
  const handleSearchSubmit=event=> {
    event.preventDefault();
    handleSearchResults()
  }
  // search for blogs by category
  const handleSearchResults=()=> {
    const allBlogs= blogList;
    const filteredBlogs = allBlogs.filter((blog)=>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );

    setBlogs(filteredBlogs);
  }
  const handleClearSearch=()=> {
    setBlogs(blogList);
    setSearchKey('');
  }
  return (
    <div>
      <NavBar/>
      <header className='resourcesHeader'>
        <h2>Cultivate Knowledge</h2>
        <h1>
          <span>"</span> Green Thumb Guide <span>"</span>
        </h1>
        <p>
        Awesome place to discover essential tips to help your garden flourish <br/> Let's grow together!
        </p>
      </header>
      <SearchBar 
      value={searchKey} 
      clearSearch={handleClearSearch}
      formSubmit={handleSearchSubmit} 
      handleSearchKey={(e) => setSearchKey(e.target.value)} 
      />
      {/* blog list and empty list(if filters not matching) */}
     {!blogs.length ? <EmptyList/> : <BlogList blogs={blogs}/>}
    </div>
  )
}

export default Resources