import React, { useState } from 'react';
import Chatbot from './chatbot'; // Import the Chatbot component
import {FaHeadset} from 'react-icons/fa';

const ChatbotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="app">
      {/* Floating Chatbot Button */}
      <button className="chatbot-button" onClick={toggleChatbot}>
      <FaHeadset className="icon"/> Helpline
      </button>

      {/* Render Chatbot Component as a Modal */}
      {isChatbotOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-modal-content">
            <span className="chatbot-close" onClick={toggleChatbot}>&times;</span>
            <Chatbot />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
