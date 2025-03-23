import React from 'react';
import '../styles/Products.css';

const Products: React.FC = () => {
  const products = [
    {
      title: 'E-Waste Collection',
      description: 'Professional collection services for businesses and individuals',
      image: '/images/AdobeStock_83196599-Converted.png'
    },
    {
      title: 'Recycling Solutions',
      description: 'State-of-the-art recycling processes for all types of electronic waste',
      image: '/images/shutterstock_303965150.jpg'
    },
    {
      title: 'Data Destruction',
      description: 'Secure data wiping and physical destruction services',
      image: '/images/tr71823-ewaste-au.jpeg'
    }
  ];

  return (
    <div className="products-container">
      <h1>Our Products & Services</h1>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button className="learn-more">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 