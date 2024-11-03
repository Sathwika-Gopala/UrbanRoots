import React, { useState, useEffect } from 'react';
import NavBar from '../landingPageComponent/NavBar';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import events1 from "../../assets/Kid'sGardeningDay.png"; 
import events2 from "../../assets/basicWorkshop.png";
import events3 from "../../assets/DIY Garden Decor Workshop.png";
import events4 from "../../assets/Medicinal Herb Gardening.png";
import events5 from "../../assets/events4.png";
import events6 from "../../assets/events5.png";
import events7 from "../../assets/events6.png";

import "./Events.css";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Events = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUsername(storedUserData.username);
    }
  }, []);

  const events = [
    {
      id: 1,
      title: "Kids’ Gardening Day",
      date: "November 18, 2024",
      location: "GreenHub Community Center, Downtown",
      cost: "100 Rs",
      image: events1,
      availableSeats: 50,
      description: "A family-friendly event with fun activities for kids, such as planting seeds, making seed bombs, and learning about nature."
    },
    {
      id: 2,
      title: "Gardening Basics Workshop",
      date: "December 2, 2024",
      location: "Urban Park Center",
      cost: "50 Rs",
      image: events2,
      availableSeats: 20,
      description: "A beginner's session teaching essential gardening skills, like soil preparation, planting, and watering techniques."
    },
    {
      id: 3,
      title: "Medicinal Herb Gardening",
      date: "January 15, 2025",
      location: "Greens Community Garden",
      cost: "250 Rs",
      image: events4,
      availableSeats: 50,
      description: "Learn about medicinal plants, their uses, and how to cultivate them at home. Create your own herbal remedies using herbs grown on-site."
    },
    {
      id: 4,
      title: "DIY Garden Decor Workshop",
      date: "Februray 01, 2025",
      location: "City Greenhouse Studio",
      cost: "150 Rs",
      image: events3,
      availableSeats: 30,
      description: "Add charm to your garden with handmade, eco-friendly decor! Perfect for beginners and plant lovers alike."
    },
    {
      id: 5,
      title: "Permaculture Design Workshop",
      date: "Februray 20, 2025",
      location: "City Greenhouse Studio",
      cost: "150 Rs",
      image: events5,
      availableSeats: 20,
      description: "Dive into sustainable gardening by learning the principles of permaculture. Design an eco-friendly garden layout that maximizes natural resources."
    },
    {
      id: 6,
      title: "Monthly Garden Walk",
      date: "March 15, 2025",
      location: "Riverside Botanical Park",
      cost: "150 Rs",
      image: events6,
      availableSeats: 20,
      description: "Explore the beauty of seasonal plants and learn gardening tips with our expert guides."
    },
    {
      id: 7,
      title: "Nature Art Day",
      date: "April 20, 2025",
      location: "City Greenhouse Studio",
      cost: "150 Rs",
      image: events7,
      availableSeats: 20,
      description: "Encourage participants to collect leaves, twigs, stones, and flowers to create nature-inspired art. This could include rock painting, leaf rubbings, or flower mandalas"
    },
    
  ];

  const handleBookNow = (event) => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      // If user is logged in, proceed to the booking page or open dialog
      setCurrentEvent(event);
      setIsDialogOpen(true);
    } else {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSeats(1);
  };

  const handleProceedToPayment = () => {
    const totalCost = selectedSeats * parseInt(currentEvent.cost.replace(/\D/g, ''));
    navigate('/payment', { state: { currentEvent, selectedSeats, totalCost } });
    console.log(`Proceeding to payment for ${selectedSeats} seats at ${currentEvent.title}`);
    handleCloseDialog();
  };

  return (
    <div className="events-page">
      <NavBar />
      
      {/* Main Event */}
      <div className="event-content">
        <div className="leftContainer">
          <img src={events1} alt="Kids’ Gardening Day" className="event-image" />
        </div>
        <div className="rightContainer">
          <h2>{events[0].title}</h2>
          <p className="event-details">
            <span><FaCalendarAlt className="icon" /> <strong>Date:</strong> {events[0].date}</span><br />
            <span><FaMapMarkerAlt className="icon" /> <strong>Location:</strong> {events[0].location}</span><br />
            <span><FaDollarSign className="icon" /> <strong>Cost:</strong> {events[0].cost}</span><br /><br />
            <span className="highlight">Why Attend?</span><br />
            {events[0].description}
          </p>
          <button className="button" onClick={() => handleBookNow(events[0])}>Book Now</button>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events-section">
        <h3 className="upcoming-heading">
          <FaCalendarAlt/> Upcoming Events
        </h3>
        <h5>Secure your spot and help create a greener city!</h5>
        <div className="upcoming-events-container">
          {events.slice(1).map((event) => (
            <div className="upcoming-event-box" key={event.id}>
              <img src={event.image} alt={event.title} className="upcoming-event-image" />
              <div className="upcoming-event-details">
                <p className='event-box-heading'>{event.title}</p>
                <h4 className="why-attend">{event.description}</h4>
                <p className='event-box-p'><FaCalendarAlt/> {event.date}</p>
                <p className='event-box-p'><FaMapMarkerAlt/> {event.location}</p>
                <p className='event-box-p'><FaDollarSign/> {event.cost}</p>
                <div className="upcoming-buttons">
                  <button className="button explore-button" onClick={() => handleBookNow(event)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Booking Dialog */}
      {isDialogOpen && currentEvent && (
    <div className="dialog-overlay">
    <div className="dialog fancy-dialog">
      <h3 className="dialog-title">Booking for {currentEvent.title}</h3>
      <h4 className="dialog-greeting">Hello, {username}! Ready to book your spot?</h4>
  
      <label className="dialog-label">
      Select Number of Seats:
      <div className="seat-selector">
        <button
          className="seat-button"
          onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
        >
          -
        </button>
        <span className="seat-count">{selectedSeats}</span>
        <button
          className="seat-button"
          onClick={() => setSelectedSeats(Math.min(currentEvent.availableSeats, selectedSeats + 1))}
        >
          +
        </button>
      </div>
    </label>
  
      <div className="dialog-buttons">
        <button className="dialogcancel-button" onClick={handleCloseDialog}>
           Cancel
        </button>
        <button className="proceed-button" onClick={handleProceedToPayment}>
           Proceed to Payment
        </button>
      </div>
    </div>
  </div>
  
      )}
    </div>
  );
};

export default Events;
