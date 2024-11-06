import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = ({ onClose }) => {
    const stars = Array(5).fill(0);
    const [currentVal, setCurrentVal] = useState(0);
    const [hoverVal, setHoverVal] = useState(undefined);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleStarClick = (value) => {
        setCurrentVal(value);
    };

    const handleMouseHover = (value) => {
        setHoverVal(value);
    };

    const handleMouseLeave = () => {
        setHoverVal(undefined);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (currentVal === 0) {
            setError('Please give a rating before submitting.');
            return;
        }
        const successConfirm = window.confirm('Feedback Submitted')
        console.log('Feedback submitted:', { rating: currentVal, comment });

        // Resetting states after submission
        setCurrentVal(0);
        setHoverVal(undefined);
        setComment('');
        setError('');

        onClose(); 
    };

    return (
        <div className='feedback-container'>
            <h3>Give Your Rating</h3>
            {error && <p className='error-message'>{error}</p>}
            <div className='stars-component'>
                {stars.map((_, index) => (
                    <FaStar
                        onClick={() => handleStarClick(index + 1)}
                        onMouseOver={() => handleMouseHover(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        key={index}
                        className={(hoverVal || currentVal) > index ? 'star filled' : 'star'}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
            <textarea 
                placeholder="Your Comments..." 
                value={comment} 
                onChange={handleCommentChange} 
                required 
            />
            <button type="submit" onClick={handleFeedbackSubmit}>Submit</button>
            {/* <button type="button" onClick={onClose} className="close-modal">Close</button> */}
        </div>
    );
};

export default Feedback;
