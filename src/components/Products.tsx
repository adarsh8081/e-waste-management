import React from 'react';
import '../styles/Products.css';

// Import all product images
import img1 from '../assets/products_images/1.jpg';
import img2 from '../assets/products_images/2.png';
import img3 from '../assets/products_images/3.webp';
import img4 from '../assets/products_images/4.avif';
import img5 from '../assets/products_images/5.webp';
import img6 from '../assets/products_images/6.avif';
import img7 from '../assets/products_images/7.jpg';
import img8 from '../assets/products_images/8.jpg';
import img9 from '../assets/products_images/9.jpg';
import img10 from '../assets/products_images/10.jpg';
import img11 from '../assets/products_images/11.jpg';
import img12 from '../assets/products_images/12.jpg';
import img13 from '../assets/products_images/13.jpg';
import img14 from '../assets/products_images/14.webp';
import img15 from '../assets/products_images/15.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Eco-Friendly Laptop",
    description: "Sustainable laptop made from recycled materials with energy-efficient components.",
    price: "$999",
    image: img1,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Recycled Smartphone",
    description: "Smartphone manufactured using recycled materials and eco-friendly packaging.",
    price: "$699",
    image: img2,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Green Tablet",
    description: "Environmentally conscious tablet with recycled components and sustainable design.",
    price: "$499",
    image: img3,
    category: "Electronics"
  },
  {
    id: 4,
    name: "Eco Headphones",
    description: "Sustainable headphones made from recycled plastics and eco-friendly materials.",
    price: "$199",
    image: img4,
    category: "Accessories"
  },
  {
    id: 5,
    name: "Recycled Smartwatch",
    description: "Smartwatch crafted from recycled materials with eco-conscious manufacturing.",
    price: "$299",
    image: img5,
    category: "Wearables"
  },
  {
    id: 6,
    name: "Green Power Bank",
    description: "Sustainable power bank with recycled components and energy-efficient charging.",
    price: "$79",
    image: img6,
    category: "Accessories"
  },
  {
    id: 7,
    name: "Eco-Friendly Monitor",
    description: "Energy-efficient monitor made from recycled materials with low power consumption.",
    price: "$399",
    image: img7,
    category: "Electronics"
  },
  {
    id: 8,
    name: "Recycled Keyboard",
    description: "Sustainable keyboard manufactured using recycled plastics and eco-friendly materials.",
    price: "$89",
    image: img8,
    category: "Accessories"
  },
  {
    id: 9,
    name: "Green Mouse",
    description: "Eco-conscious mouse made from recycled materials with sustainable design.",
    price: "$49",
    image: img9,
    category: "Accessories"
  },
  {
    id: 10,
    name: "Recycled Printer",
    description: "Sustainable printer with recycled components and energy-saving features.",
    price: "$299",
    image: img10,
    category: "Electronics"
  },
  {
    id: 11,
    name: "Eco-Friendly Router",
    description: "Energy-efficient router made from recycled materials with low power consumption.",
    price: "$129",
    image: img11,
    category: "Networking"
  },
  {
    id: 12,
    name: "Recycled Webcam",
    description: "Sustainable webcam manufactured using recycled plastics and eco-friendly materials.",
    price: "$69",
    image: img12,
    category: "Accessories"
  },
  {
    id: 13,
    name: "Green External Drive",
    description: "Eco-conscious external drive made from recycled materials with sustainable design.",
    price: "$89",
    image: img13,
    category: "Storage"
  },
  {
    id: 14,
    name: "Recycled Speakers",
    description: "Sustainable speakers with recycled components and energy-efficient audio.",
    price: "$149",
    image: img14,
    category: "Audio"
  },
  {
    id: 15,
    name: "Eco-Friendly Microphone",
    description: "Environmentally conscious microphone made from recycled materials.",
    price: "$99",
    image: img15,
    category: "Audio"
  }
];

const Products: React.FC = () => {
  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Eco-Friendly Products</h1>
        <p>Discover our range of sustainable electronics and accessories, all made with recycled materials and eco-conscious manufacturing processes.</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">{product.price}</div>
              <a href="#" className="product-button">Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 