import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../landingPageComponent/NavBar';

const Payment = () => {
    const location = useLocation();
    const { currentEvent, totalCost } = location.state; // Assuming these are passed from the previous component
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contact: ''
    });
    const [showNotification, setShowNotification] = useState(false); // State to control notification display

    useEffect(() => {
        // Fetch user data from local storage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData({
                name: parsedData.username || '',
                email: parsedData.email || '',
                contact: parsedData.contact || ''
            });
        }
    }, []); // This useEffect runs only once on component mount

    // Function to handle showing notification
    const handleShowNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 9000); // Automatically hide after 5 seconds
    };

    return (
        <div>
            <NavBar />
            {showNotification && (
                <div className="notification-banner">
                    <p>
                        Thank you for your attention! 
                        Please note that the payment integration will be implemented once the project goes live. 
                        In the meantime, we encourage you to explore the other features of UrbanRoots!
                    </p>
                </div>
            )}
            <div className="payment-page">
                <h4>Booking Payment for</h4>
                <h2>{currentEvent.title}</h2>
                <img className='payment-image' src={currentEvent.image} alt={currentEvent.title} />
                <p className='cost-p'>Total Cost: ₹{totalCost}</p>
                <div className='user-details'>
                    <h3>User Details</h3>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Contact: {userData.contact}</p>
                </div>
                <button className="notification-button" onClick={handleShowNotification}>
                    Pay ₹{totalCost}
                </button>
            </div>
        </div>
    );
};

export default Payment;
