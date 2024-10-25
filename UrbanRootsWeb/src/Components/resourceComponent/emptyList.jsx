import React from 'react'
import noResults from '../../assets/images/noResults.gif'
const EmptyList = () => {
  return (
    <div className='emptyList-wrap'>
        <img src={noResults} alt='No search results'/>
    </div>
  )
}

export default EmptyList