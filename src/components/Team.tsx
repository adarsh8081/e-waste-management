import React, { useEffect } from 'react';
import '../styles/Team.css';
import placeholderImage from '../assets/logo.jpg';

const Team: React.FC = () => {
  useEffect(() => {
    console.log('Team component mounted');
    console.log('Placeholder image path:', placeholderImage);
  }, []);

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      description: 'With over 15 years of experience in e-waste management, John leads our mission to create a sustainable future.',
      image: placeholderImage
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Director',
      description: 'Sarah oversees our recycling operations and ensures the highest standards of environmental compliance.',
      image: placeholderImage
    },
    {
      name: 'Michael Chen',
      role: 'Technical Lead',
      description: 'Michael brings innovative solutions to our e-waste processing methods and leads our R&D initiatives.',
      image: placeholderImage
    },
    {
      name: 'Emily Rodriguez',
      role: 'Sustainability Manager',
      description: 'Emily develops and implements our environmental policies and community outreach programs.',
      image: placeholderImage
    }
  ];

  return (
    <div className="team-container" style={{ 
      minHeight: '100vh',
      paddingTop: '2rem',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="team-header">
        <h1 style={{ color: '#915EFF' }}>Our Team</h1>
        <p className="team-intro" style={{ color: '#e2e2e2' }}>
          Meet the dedicated professionals working towards a sustainable future in e-waste management.
          Our diverse team brings together expertise in technology, environmental science, and operations.
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(145, 94, 255, 0.2)'
          }}>
            <div className="member-image">
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderBottom: '1px solid rgba(145, 94, 255, 0.2)'
                }} 
                onError={(e) => {
                  console.error('Image failed to load:', member.image);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'image-placeholder';
                  placeholder.textContent = member.name.split(' ').map(n => n[0]).join('');
                  target.parentElement?.appendChild(placeholder);
                }}
              />
            </div>
            <div className="member-info">
              <h3 style={{ color: '#915EFF' }}>{member.name}</h3>
              <h4 style={{ color: '#e2e2e2' }}>{member.role}</h4>
              <p style={{ color: '#e2e2e2' }}>{member.description}</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn" style={{ color: '#915EFF' }}>
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter" style={{ color: '#915EFF' }}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="GitHub" style={{ color: '#915EFF' }}>
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 