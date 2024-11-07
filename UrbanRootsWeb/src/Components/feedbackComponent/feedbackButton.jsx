    import React, { useState } from 'react';
    import Feedback from './feedback'; // Adjust the path based on your file structure

    const App = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        const toggleModal = () => {
            setIsModalOpen(!isModalOpen);
        };

        return (
            <div className="app">
                {/* Floating Feedback Button */}
                <button className="feedback-button" onClick={toggleModal}>
                    Feedback
                </button>

                {/* Render Feedback Component as a Modal */}
                {isModalOpen && (
                    <div className="feedback-modal">
                        <div className="feedback-modal-content">
                            <span className="feedback-close" onClick={toggleModal}>&times;</span>
                            <Feedback onClose={toggleModal} />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default App;
