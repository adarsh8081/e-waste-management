import React, { useState } from 'react';
import '../styles/Products.css';
import ProductDetails from './ProductDetails';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import all product images
import earbuds from '../assets/products_images/Earbuds.jpg';
import smartwatches from '../assets/products_images/Smartwatches.png';
import controllers from '../assets/products_images/jack and controllers.webp';
import oldBatteries from '../assets/products_images/old batteryes.avif';
import cflBulbs from '../assets/products_images/CFL bulbs.webp';
import routers from '../assets/products_images/Routers.webp';
import washingMachines from '../assets/products_images/old washing machines.avif';
import keyboardsMice from '../assets/products_images/keyboards and mouses.jpg';
import phones from '../assets/products_images/cell phones.jpg';
import televisions from '../assets/products_images/old telivisions.jpg';
import printers from '../assets/products_images/printers.jpg';
import circuitBoards from '../assets/products_images/12.jpg';
import storageDevices from '../assets/products_images/storage devices.jpg';
import microwaves from '../assets/products_images/microvave.jpeg';
import fridges from '../assets/products_images/fridges.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Discarded Earbuds",
    description: "Wireless earbuds and their charging cases contain lithium batteries, circuit boards, and plastics that become hazardous e-waste when disposed improperly.",
    image: earbuds,
    category: "Audio"
  },
  {
    id: 2,
    name: "Smart Watches",
    description: "Collection of smart watches with their screens, batteries, and miniature electronics that pose significant environmental risks when discarded.",
    image: smartwatches,
    category: "Wearables"
  },
  {
    id: 3,
    name: "Gaming Controllers",
    description: "Discarded gaming controllers and accessories containing circuit boards, batteries, and non-biodegradable plastics that contribute to e-waste.",
    image: controllers,
    category: "Electronics"
  },
  {
    id: 4,
    name: "Used Batteries",
    description: "Discarded batteries containing lead-acid and other harmful chemicals that can severely impact the environment if not properly recycled.",
    image: oldBatteries,
    category: "Batteries"
  },
  {
    id: 5,
    name: "CFL Bulbs",
    description: "Used CFL light bulbs containing mercury and other toxic materials requiring special handling and disposal procedures.",
    image: cflBulbs,
    category: "Lighting"
  },
  {
    id: 6,
    name: "Old Routers",
    description: "Obsolete networking equipment containing circuit boards and electronic components that require proper recycling.",
    image: routers,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Washing Machines",
    description: "Old washing machines that contain various metals, electronics, and harmful components requiring specialized disposal.",
    image: washingMachines,
    category: "Appliances"
  },
  {
    id: 8,
    name: "Keyboards and Mouse",
    description: "Pile of discarded keyboards and computer mice, representing a significant source of plastic and electronic waste. These peripherals contain circuit boards, rubber components, and non-biodegradable plastics that pollute our environment.",
    image: keyboardsMice,
    category: "Electronics"
  },
  {
    id: 9,
    name: "Mobile Phones",
    description: "Pile of discarded mobile phones containing precious metals, toxic batteries, and non-biodegradable materials requiring proper recycling.",
    image: phones,
    category: "Electronics"
  },
  {
    id: 10,
    name: "Old Televisions",
    description: "Obsolete televisions containing significant amounts of lead and other toxic materials in their components.",
    image: televisions,
    category: "Electronics"
  },
  {
    id: 11,
    name: "Old Printers",
    description: "Discarded printers containing electronic components, toner residue, and plastics that need proper disposal.",
    image: printers,
    category: "Electronics"
  },
  {
    id: 12,
    name: "Circuit Boards",
    description: "Discarded printed circuit boards containing valuable metals like gold and copper, along with toxic materials requiring proper recycling.",
    image: circuitBoards,
    category: "Electronics"
  },
  {
    id: 13,
    name: "Storage Devices",
    description: "Old storage devices containing sensitive data and electronic components that need secure and proper disposal.",
    image: storageDevices,
    category: "Electronics"
  },
  {
    id: 14,
    name: "Microwaves",
    description: "Discarded microwave ovens containing hazardous components and materials requiring specialized recycling.",
    image: microwaves,
    category: "Appliances"
  },
  {
    id: 15,
    name: "Refrigerators",
    description: "Old refrigerators containing harmful coolants, insulation materials, and electronic components requiring proper disposal.",
    image: fridges,
    category: "Appliances"
  }
];

// First, define base components that don't depend on others
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 0.75rem;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(255, 255, 255, 0.9) 100%
    );
    z-index: 1;
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(145, 94, 255, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 2;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  color: #2D3748;
  margin: 0;
  text-align: center;
  font-weight: 600;
  line-height: 1.4;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #915EFF, #6B46C1);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProductDescription = styled.p`
  color: #4A5568;
  text-align: center;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  color: #915EFF;
  border: 2px solid #915EFF;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #915EFF;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(145, 94, 255, 0.25);

    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

// Then define components that depend on others
const ProductCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(145, 94, 255, 0.2),
      inset 0 0 0 2px rgba(145, 94, 255, 0.4);

    ${ProductImage} {
      transform: scale(1.1);
    }

    ${ProductInfo} {
      transform: translateY(-4px);
    }
  }
`;

// Keep Hero components at the end since they're independent
const HeroSection = styled(motion.div)`
  min-height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(145, 94, 255, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%);
  border-radius: 2.5rem;
  margin: 2rem 0 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(145, 94, 255, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  padding: 3rem;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(145, 94, 255, 0.1) 0%,
      transparent 50%
    );
    animation: rotate 20s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    z-index: 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    min-height: 40vh;
    margin: 1.5rem 0 3rem;
    border-radius: 2rem;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    min-height: 35vh;
    margin: 1rem 0 2rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 1rem;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(45deg, #915EFF, #6B46C1);
    opacity: 0.1;
    filter: blur(40px);
    z-index: -1;
  }

  &::before {
    top: -50px;
    left: -100px;
  }

  &::after {
    bottom: -50px;
    right: -100px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #915EFF, #6B46C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #915EFF, #6B46C1);
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #4A5568;
  line-height: 1.8;
  font-weight: 500;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Add animation variants for the hero content
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="products-container">
      <HeroSection
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <HeroContent>
          <HeroTitle variants={titleVariants}>
            Common E-Waste Products
          </HeroTitle>
          <HeroSubtitle variants={subtitleVariants}>
            Learn about the electronic devices that are commonly discarded and
            their environmental impact. These products contain hazardous
            materials that require proper disposal and recycling.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id}>
            <CategoryTag>{product.category}</CategoryTag>
            <ImageContainer>
              <ProductImage src={product.image} alt={product.name} />
            </ImageContainer>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductDescription>
                {product.description}
              </ProductDescription>
              <LearnMoreButton onClick={() => handleLearnMore(product)}>
                Learn More
              </LearnMoreButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </div>
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Products; 