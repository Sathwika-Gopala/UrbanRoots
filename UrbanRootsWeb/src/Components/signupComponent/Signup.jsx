import React from 'react'

function Signup() {
  return (
    <div className='page-container'>
      {/* Header Section */}
      <header className='header'>
        <h1>Welcome to Nature's Platform</h1>
      </header>

      {/* Signup Section */}
      <div className='sign-up-container'>
        <h2>Sign Up</h2>
        <form className='sign-up-form'>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder='Username' />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" autoComplete='off' placeholder='Email' />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder='*******' />

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup