import React from 'react'
import NavBar from './NavBar'
import bg from '../../assets/bg.png'
import bgcrop from '../../assets/bgcrop.png'
import { useNavigate } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const LandingPage = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup')
    }
    const handleExploreEvents = () => {
        navigate('/events')
    }
    const handleDiscussions =()=> {
        navigate('/discussions')
    }
    const handleResources = () => {
        navigate('/resources')
    }
  return (
    <div className='LandingPage-container'>
        <NavBar/>
        <div className="home-banner-container">
        <div className="home-bannerImage-container">
        <img className='bgImage' src={bg} alt=""/>
        <img className='bgcrop' src={bgcrop} alt=""/>
        <div className='text-overlay'>
            <h2>
            Sow the Seeds of Connection
            {/* Grow Together, Live Sustainably! */}
            </h2>
            <section class="features-section">
                <div class="features-container">
                    <div className="feature">
                        <div class="feature-1" onClick={handleDiscussions}>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-finance-and-banking-10/66/172_social_group_social_class_cordial_group_group_social_organization_class_system-512.png" alt="Community Connect Icon" class="feature-icon"/>
                            <h3>Community Connect</h3>
                            <p>Meet fellow gardeners, share experiences and clear doubts.</p>
                        </div>
                        <div class="feature-2" onClick={handleExploreEvents}>
                            <img src="https://icon-library.com/images/calendar-transparent-icon/calendar-transparent-icon-3.jpg" alt="Event Calendar Icon" class="feature-icon"/>
                            <h3>Event Calendar</h3>
                            <p>Stay updated on upcoming gardening events.</p>
                        </div>
                        <div class="feature-3" onClick={handleResources}>
                            <img src="https://www.freeiconspng.com/uploads/book-stack-icon--icon-search-engine-16.png" alt="Resources Icon" class="feature-icon"/>
                            <h3>Resources</h3>
                            <p>Access a wealth of gardening resources and tips.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='LoginButton' onClick={handleSignup}>Signup/ Login</button>
                    <button className='GuestButton' onClick={handleExploreEvents}>Continue as Guest</button>
                </div>
            </section>
            <section className="about-section">
                <div className="about-content">
                    <h2>Our Story: Cultivating Connections</h2>
                    <p>

                Welcome to our community gardening platform, where urban residents come together to connect, learn, 
                and make a positive impact on the environment! 
                We know that city life can make it hard to find green spaces and engage with nature, but we’re here to change that.
                Our mission is simple: to create a vibrant community that promotes sustainability through shared gardening experiences. 
                Whether you’re a gardening pro, a curious beginner, or someone looking to make new friends, 
                our platform offers something for everyone. <br/> <br/>Join us for fun workshops on composting, native planting, and more! 
                Dive into lively discussions where you can share tips, ask questions, and celebrate your gardening journey. 
                Plus, access a treasure trove of resources to help you grow sustainably.
                Let’s transform our urban landscapes together, turning concrete jungles into thriving green havens. 
                Get ready to dig in, connect, and cultivate a brighter future—one garden at a time!
                </p>
                    <button className="learn-more" onClick={handleExploreEvents}>Explore Events</button>
                </div>
                <div className="about-image-container">
                    <img src="https://th.bing.com/th/id/OIP.IIOI8uIM9Gal4ZHoJFF8WgHaE9?w=233&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Gardening Community" className="about-image" />
                </div>
            </section>
            <section className='carousel-container'> 
                <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                interval={5000}
                >
                    <div>
                    <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" />
                    <div className="myCarousel">
                        <h3>Daniel</h3>
                        <h4>Student</h4>
                        <p>
                        Connecting with people through gardening has enriched my learning and built friendships.
                        </p>
                        <div className="rating">
                        {Array(5).fill().map((_, i) => (
                            <span key={i} className="star">⭐</span>
                        ))}
                        </div>
                    </div>
                    </div>

                    <div>
                    <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png" />
                    <div className="myCarousel">
                        <h3>Shanaya</h3>
                        <h4>Working Woman</h4>
                        <p>
                        This platform makes it easy to share tips and join workshops, even with my busy schedule!
                        </p>
                        <div className="rating">
                        {Array(4).fill().map((_, i) => (
                            <span key={i} className="star">⭐</span>
                        ))}
                        </div>
                    </div>
                    </div>

                    <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/6998/6998068.png" />
                    <div className="myCarousel">
                        <h3>Walter</h3>
                        <h4>Retiree</h4>
                        <p>
                        Gardening here has transformed my retirement into a vibrant community experience!
                        </p>
                        <div className="rating">
                        {Array(5).fill().map((_, i) => (
                            <span key={i} className="star">⭐</span>
                        ))}
                        </div>
                    </div>
                    </div>
                </Carousel>
            </section>
            <div>
            <button className='LoginButtonend' onClick={handleSignup}>Grow with Us</button>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage