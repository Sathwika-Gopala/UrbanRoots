import React from 'react'

const SearchBar = ({value, handleSearchKey, clearSearch, formSubmit}) => {
  return (
    <div className="searchBar-wrap">
        <form onSubmit={formSubmit}>
            <input type='text' placeholder='Search by Category' value={value} onChange={handleSearchKey}/>
            {/* clear input */}
            {value && <span onClick={clearSearch} className='clearButton'>X</span>} 
            <button>Go</button>
        </form>
    </div>
  )
}

export default SearchBar