import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>GLA UNIVERSITY , MATHURA 281406</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>+91 9005609660 </p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>Adarsh.kumar_cs.aiml21@gla.ac.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 