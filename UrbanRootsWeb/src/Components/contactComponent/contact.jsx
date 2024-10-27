import React, { useRef, useState } from 'react';
import NavBar from '../landingPageComponent/NavBar';
import contactBg from '../../assets/images/contactBg.jpg';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';

const Contact = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const [errorMessage, setErrorMessage] = useState(false); // State for error message

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nx7j78u', 'template_fb4xaz1', form.current, {
        publicKey: 'iw_cpImPwG8ip_X2H',
      })
      .then(
        () => {
          setSuccessMessage(true); // Show success message on successful submission
          setErrorMessage(false); // Reset error message
          e.target.reset();
          setTimeout(() => setSuccessMessage(false), 2000); // Hide after 2 seconds
        },
        (error) => {
          console.log('FAILED...', error.text);
          setErrorMessage(true); // Show error message on failure
          setSuccessMessage(false); // Reset success message
          setTimeout(() => setErrorMessage(false), 2000); // Hide after 2 seconds
        },
      );
  };

  return (
    <div>
      <NavBar />
      <section className="contact-section">
        <div className="contact-img-wrapper">
          <img className="contact-img" src={contactBg} alt="" />
        </div>
        <div className="contact-container">
          <h2>Contact Us</h2>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input type="text" placeholder="Full Name" name="user_name" required />
            <input type="email" placeholder="Email" name="user_email" required />
            <textarea name="message" cols="30" rows="10" placeholder="Your Message" />
            <button className="--btn --btn-primary" type="submit">Submit</button>
          </form>

          {/* Success Message Alert */}
          {successMessage && (
            <div className='success-alert'>
              <Alert severity="success">Your message has been sent successfully!</Alert>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className='error-alert'>
              <Alert severity="error">There was an error sending your message. Please try again.</Alert>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
