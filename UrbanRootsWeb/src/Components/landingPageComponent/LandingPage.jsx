import React from 'react'
import NavBar from './NavBar'
import bg from '../../assets/bg.png'

const LandingPage = () => {
  return (
    <div className='LandingPage-container'>
        <NavBar/>
        <div className="home-banner-container">
        <div className="home-bannerImage-container">
        <img className='bgImage' src={bg} alt=""/>
        <div className='text-overlay'>
            <h1>
            Grow Together,
            Live Sustainably!
            </h1>
            <section class="features-section">
    <h2>Unlock Your Gardening Potential </h2>
    <div class="features-container">
        <div class="feature">
            <img src="path/to/community-icon.png" alt="Community Connect Icon" class="feature-icon"/>
            <h3>Community Connect</h3>
            <p>Meet fellow gardeners and share experiences.</p>
        </div>
        <div class="feature">
            <img src="path/to/event-icon.png" alt="Event Calendar Icon" class="feature-icon"/>
            <h3>Event Calendar</h3>
            <p>Stay updated on upcoming gardening events.</p>
        </div>
        <div class="feature">
            <img src="path/to/resources-icon.png" alt="Resources Icon" class="feature-icon"/>
            <h3>Resources</h3>
            <p>Access a wealth of gardening resources and tips.</p>
        </div>
    </div>
</section>

        </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage