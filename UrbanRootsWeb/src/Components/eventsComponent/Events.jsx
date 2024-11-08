import React, { useState, useEffect } from 'react';
import NavBar from '../landingPageComponent/NavBar';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import './Events.css';
import { useNavigate } from 'react-router-dom';

// Import your images
import events1 from "../../assets/Kid'sGardeningDay.png";
import events2 from "../../assets/basicWorkshop.png";
import events3 from "../../assets/DIY Garden Decor Workshop.png";
import events4 from "../../assets/Medicinal Herb Gardening.png";
import events5 from "../../assets/events4.png";
import events6 from "../../assets/events5.png";
import events7 from "../../assets/events6.png";

const Events = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);  // State to hold event data

  // Map the imported images to the event titles or IDs
  const imageMap = {
    "Kid's Gardening Day": events1,
    "Basic Workshop": events2,
    "DIY Garden Decor Workshop": events3,
    "Medicinal Herb Gardening": events4,
    "Permaculture Workshop": events5,
    "Monthly Garden Walk": events6,
    "Nature Art Day": events7
  };

  useEffect(() => {
    // Fetch event data from the backend API when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');  // Make sure this matches your backend URL
        const data = await response.json();
        setEvents(data);  // Store events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUsername(storedUserData.username);
    }
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSeats(1);
  };

 // Handle booking
const handleBookNow = (event) => {
  const userData = localStorage.getItem('userData');

  if (userData) {
    // Set the event image directly from the imageMap
    const eventWithImage = { ...event, image: imageMap[event.title] || events1 };
    
    // Set the current event with the image included
    setCurrentEvent(eventWithImage);
    setIsDialogOpen(true);
  } else {
    navigate('/login');
  }
};

// Proceed to Payment
const handleProceedToPayment = () => {
  if (!currentEvent) {
    console.error("No event selected.");
    return;
  }

  const eventCost = typeof currentEvent.cost === "string" 
    ? parseInt(currentEvent.cost.replace(/\D/g, '')) 
    : currentEvent.cost;

  const totalCost = selectedSeats * (eventCost || 0);

  // Pass currentEvent including its image directly to the payment page
  navigate('/payment', { state: { currentEvent, totalCost } });

  handleCloseDialog();
};

  

  return (
    <div className="events-page">
      <NavBar />
      
      {/* Main Event - Displaying the first event */}
      {events.length > 0 && (
        <div className="event-content">
          <div className="leftContainer">
            {/* Use the image from the imageMap */}
            <img src={imageMap[events[0].title] || events1} alt={events[0].title} className="event-image" />
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
      )}

      {/* Upcoming Events Section - Displaying other events */}
     {/* For upcoming events */}
<div className="upcoming-events-section">
  <h3 className="upcoming-heading">
    <FaCalendarAlt /> Upcoming Events
  </h3>
  <h5>Secure your spot and help create a greener city!</h5>
  <div className="upcoming-events-container">
    {events.slice(1).map((event, index) => {
      // Map the events in the right order
      const eventImage = imageMap[event.title] || events1; // Default fallback image
      const imageIndex = index + 2;  // Adjust the index to start from 2 (for events2, events3, etc.)

      // Ensure the correct event image
      return (
        <div className="upcoming-event-box" key={event.id}>
          <img 
            src={imageMap[Object.keys(imageMap)[imageIndex - 1]] || eventImage} 
            alt={event.title} 
            className="upcoming-event-image" 
          />
          <div className="upcoming-event-details">
            <p className='event-box-heading'>{event.title}</p>
            <h4 className="why-attend">{event.description}</h4>
            <p className='event-box-p'><FaCalendarAlt /> {event.date}</p>
            <p className='event-box-p'><FaMapMarkerAlt /> {event.location}</p>
            <p className='event-box-p'><FaDollarSign /> {event.cost}</p>
            <div className="upcoming-buttons">
              <button className="button explore-button" onClick={() => handleBookNow(event)}>Book Now</button>
            </div>
          </div>
        </div>
      );
    })}
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
                  onClick={() => setSelectedSeats(Math.min(currentEvent.availableseats, selectedSeats + 1))}
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
