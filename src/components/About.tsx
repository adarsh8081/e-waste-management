import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing sustainable e-waste management solutions
            that protect our environment and create a better future for generations
            to come. Our state-of-the-art recycling facilities ensure proper
            disposal of electronic waste while recovering valuable materials.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Impact</h2>
          <p>
            Through our innovative recycling processes, we have successfully
            processed millions of pounds of e-waste, preventing harmful materials
            from entering landfills while recovering precious metals and other
            valuable resources for reuse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 