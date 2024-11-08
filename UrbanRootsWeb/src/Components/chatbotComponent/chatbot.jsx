import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('username') || 'Guest';
    setUserName(name);
    const botGreeting = { sender: 'bot', text: `Hello, ${name}! How can I assist you today?` };
    setMessages([botGreeting]);
    setShowButtons(true);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      return data; // Return the event array
    } catch (error) {
      console.error('Error fetching events:', error);
      return []; // Return an empty array in case of an error
    }
  };
  
  
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
  
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');
  
    try {
      const lowerCaseInput = input.toLowerCase();
      if (lowerCaseInput.includes('event') || lowerCaseInput.includes('workshop')) {
        const events = await fetchEvents();
        if (events.length > 0) {
          // Format the event details properly
          const eventText = events
            .map(event => {
              const eventDate = new Date(event.date); // Parse the date
              const formattedDate = `${eventDate.getDate()}/${eventDate.getMonth() + 1}/${eventDate.getFullYear()}`; // Format to only show day/month/year
              return `
                <b>Title:</b> ${event.title} <br />
                <b>Date:</b> ${formattedDate} <br />
                <b>Location:</b> ${event.location} <br />
                <b>Description:</b> ${event.description} <br />
                <b>Cost:</b> $${event.cost} <br /><br />
              `;
            })
            .join('');
  
          const botReply = { sender: 'bot', text: eventText };
          setMessages((prevMessages) => [...prevMessages, botReply]);
        } else {
          const botReply = { sender: 'bot', text: 'Sorry, no upcoming events found.' };
          setMessages((prevMessages) => [...prevMessages, botReply]);
        }
      } else {
        const botReply = { sender: 'bot', text: 'Could you clarify? I didn\'t understand.' };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'An error occurred. Please try again.' },
      ]);
    }
  };
  
  // Handle button click actions
  const handleButtonClick = async (buttonText) => {
    let botReply;
    if (buttonText === 'Events') {
      try {
        const events = await fetchEvents();
        if (events.length > 0) {
          const eventText = events.map(event => {
            const eventDate = new Date(event.date); // Parse the date
            const formattedDate = `${eventDate.getDate()}/${eventDate.getMonth() + 1}/${eventDate.getFullYear()}`; // Format to only show day/month/year
            return `
              <b>Title:</b> ${event.title} <br />
              <b>Date:</b> ${formattedDate} <br />
              <b>Description:</b> ${event.description} <br /><br />
            `;
          }).join('');
          botReply = { sender: 'bot', text: eventText };
        } else {
          botReply = { sender: 'bot', text: 'No upcoming events.' };
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        botReply = { sender: 'bot', text: 'Sorry, there was an issue fetching events.' };
      }
    } else if (buttonText === 'Prior Experience') {
      botReply = { sender: 'bot', text: 'No experience? No problem! 🌱 Whether you’re a curious beginner or a seasoned gardener, everyone’s welcome to join the fun and grow together! 🌻' };
    } else if (buttonText === 'Clothing Requirements') {
      botReply = { sender: 'bot', text: 'Wear your comfy best! 🌿 Choose clothes you can move in, get a little messy, and feel relaxed. (Pro tip: maybe skip the white—gardens love to share their colors! 🌸🌱)' };
    } else if (buttonText === 'Audience Age') {
      botReply = { sender: 'bot', text: `🌱 Absolutely Anyone! 🌱<br>
        Our events are designed for all ages and experience levels—whether you're a first-time gardener or a green-thumbed expert! Everyone from kids 👶 to adults 👩‍🌾, families 👨‍👩‍👧‍👦, and even friend groups 🤗 are welcome to join and learn together.` };
    }
    setMessages((prevMessages) => [...prevMessages, botReply]);
  };
  
  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
        {showButtons && (
          <div className="chat-buttons">
            <button onClick={() => handleButtonClick('Events')}>Upcoming Events</button>
            <button onClick={() => handleButtonClick('Prior Experience')}>Prior experience needed?</button>
            <button onClick={() => handleButtonClick('Clothing Requirements')}>What to Wear?</button>
            <button onClick={() => handleButtonClick('Audience Age')}>Who Can Join?</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
