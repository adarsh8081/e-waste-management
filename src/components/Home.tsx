import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  const images = [
    {
      src: '/images/AdobeStock_83196599-Converted.png',
      title: 'E-Waste Collection',
      description: 'Professional e-waste collection and sorting process'
    },
    {
      src: '/images/shutterstock_303965150.jpg',
      title: 'Electronic Waste',
      description: 'Various types of electronic waste ready for recycling'
    },
    {
      src: '/images/tr71823-ewaste-au.jpeg',
      title: 'E-Waste Impact',
      description: 'Environmental impact of electronic waste'
    },
    {
      src: '/images/download.jpeg',
      title: 'Recycling Process',
      description: 'Step by step e-waste recycling process'
    }
  ];

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1>E-Waste Management Solutions</h1>
        <p className="intro-text">
          Responsible disposal and recycling of electronic waste for a sustainable future
        </p>

        <div className="crisis-section">
          <h2>The Rising E-Waste Crisis: A Global Challenge</h2>
          
          <div className="crisis-content">
            <div className="crisis-text">
              <p>
                In today's fast-paced digital world, technological advancements and increasing consumer demand for electronics have led to a massive surge in <strong>electronic waste (e-waste)</strong>. According to the <strong>Global E-waste Monitor 2020</strong>, the world is expected to generate <strong>74 million metric tons</strong> of e-waste by 2030—a staggering increase fueled by shorter device lifespans and rapid innovation.
              </p>
              
              <p>
                E-waste contains hazardous materials such as <strong>lead, mercury, and cadmium</strong>, which, if not disposed of properly, seep into the soil and water, posing severe threats to <strong>human health and the environment</strong>. Additionally, valuable resources like <strong>gold, copper, and rare earth metals</strong> are often lost due to inefficient recycling methods.
              </p>
              
              <p>
                As the demand for <strong>AI-driven devices, high-performance GPUs, and smart gadgets</strong> rises, so does the urgency to implement <strong>sustainable e-waste management solutions</strong>. Through responsible collection, recycling, and repurposing of electronic components, we can <strong>reduce toxic waste</strong>, <strong>conserve natural resources</strong>, and <strong>build a greener future</strong>.
              </p>
              
              <p>
                Our initiative aims to tackle this crisis by creating an <strong>innovative and scalable e-waste management system</strong>—focusing on collection, extraction, reuse, and responsible disposal. Join us in our mission to turn <strong>waste into opportunity</strong> and drive a <strong>sustainable future!</strong> 🌍♻️
              </p>
            </div>

            <div className="crisis-stats">
              <div className="stat-card">
                <h3>74M</h3>
                <p>Metric tons of e-waste expected by 2030</p>
              </div>
              <div className="stat-card">
                <h3>3+</h3>
                <p>Hazardous materials in e-waste</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Commitment to sustainable recycling</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image.src} alt={image.title} />
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 