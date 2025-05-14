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
    // // Fetch event data from the backend API when the component mounts
    // const fetchEvents = async () => {
    //   try {
    //     const response = await fetch('http://139.84.149.135/api/events');  
    //     const data = await response.json();
    //     setEvents(data);  // Store events in state
    //   } catch (error) {
    //     console.error('Error fetching events:', error);
    //   }
    // };

    // fetchEvents();

    // Hardcoded events data for local/frontend use
    setEvents([
      {
        id: 1,
        title: "Kid's Gardening Day",
        date: "2024-06-15",
        location: "Urban Roots Community Garden",
        cost: "₹200",
        description: "A fun-filled day for kids to learn about gardening through hands-on activities and games.",
        availableseats: 30
      },
      {
        id: 2,
        title: "Basic Workshop",
        date: "2024-06-20",
        location: "Urban Roots Center",
        cost: "₹300",
        description: "Learn the basics of urban gardening, soil preparation, and plant care.",
        availableseats: 25
      },
      {
        id: 3,
        title: "DIY Garden Decor Workshop",
        date: "2024-06-25",
        location: "Urban Roots Studio",
        cost: "₹250",
        description: "Get creative and make your own garden decorations using recycled materials.",
        availableseats: 20
      },
      {
        id: 4,
        title: "Medicinal Herb Gardening",
        date: "2024-07-01",
        location: "Urban Roots Herb Garden",
        cost: "₹350",
        description: "Discover the benefits of medicinal herbs and how to grow them at home.",
        availableseats: 15
      },
      {
        id: 5,
        title: "Permaculture Workshop",
        date: "2024-07-10",
        location: "Urban Roots Farm",
        cost: "₹400",
        description: "An introduction to permaculture principles and sustainable gardening techniques.",
        availableseats: 20
      },
      {
        id: 6,
        title: "Monthly Garden Walk",
        date: "2024-07-15",
        location: "Urban Roots Community Garden",
        cost: "Free",
        description: "Join our monthly walk to explore seasonal plants and gardening tips.",
        availableseats: 50
      },
      {
        id: 7,
        title: "Nature Art Day",
        date: "2024-07-20",
        location: "Urban Roots Park",
        cost: "₹150",
        description: "A creative day for all ages to make art inspired by nature.",
        availableseats: 40
      }
    ]);

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
