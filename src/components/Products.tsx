import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Import images
import img1 from '../assets/products_images/1.jpg';       // Mobile phones
import img2 from '../assets/products_images/2.png';       // Laptops
import img3 from '../assets/products_images/3.webp';      // Smartwatches
import img4 from '../assets/products_images/4.avif';      // Keyboards
import img5 from '../assets/products_images/5.webp';      // Hard drives
import img6 from '../assets/products_images/6.avif';      // Headphones
import img7 from '../assets/products_images/7.jpg';       // TVs
import img8 from '../assets/products_images/8.jpg';       // Refrigerators
import img9 from '../assets/products_images/9.jpg';       // Washing machines
import img10 from '../assets/products_images/10.jpg';     // Game consoles
import img11 from '../assets/products_images/11.jpg';     // Networking devices
import img12 from '../assets/products_images/12.jpg';     // Printers
import img13 from '../assets/products_images/13.jpg';     // Batteries
import img14 from '../assets/products_images/14.webp';    // Light bulbs
import img15 from '../assets/products_images/15.jpg';     // Microwaves

const ProductsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  perspective: 1000px;
  background: #FBF7F0;
`;

const HeroSection = styled(motion.div)`
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #D9E4DD 0%, #FBF7F0 100%);
  border-radius: 2rem;
  margin-bottom: 4rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #333333;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #444444;
  max-width: 800px;
  line-height: 1.6;
  font-weight: 500;
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 4rem;
  background: #D9E4DD;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const CategoryTitle = styled.h2`
  color: #333333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  perspective: 1000px;
`;

const ProductCard = styled(motion.div)`
  background: #FBF7F0;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  transform: translateZ(10px);
  filter: contrast(1.2) brightness(1.1) saturate(1.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    filter: contrast(1.3) brightness(1.15) saturate(1.2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductTitle = styled.h3`
  color: #333333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: #444444;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ImpactText = styled.p`
  color: #555555;
  font-style: italic;
  line-height: 1.6;
  border-left: 3px solid #D9E4DD;
  padding-left: 1rem;
  margin-top: 1rem;
  font-weight: 500;
`;

const Products = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const categories = [
    {
      title: "Personal Electronics",
      products: [
        {
          title: "Mobile Phones & Smartphones",
          description: "Old, broken, or outdated mobile phones contain metals like gold, silver, and lithium, as well as harmful substances like lead and cadmium.",
          impact: "If not recycled, toxic materials can leach into soil and water.",
          image: img1
        },
        {
          title: "Laptops & Computers",
          description: "These devices contain plastic, circuit boards, and heavy metals like mercury and lead.",
          impact: "Hard drives may still contain sensitive data, and improper disposal can lead to environmental pollution.",
          image: img2
        },
        {
          title: "Smartwatches & Wearable Devices",
          description: "Small electronic gadgets with lithium-ion batteries and sensors.",
          impact: "Hard to recycle due to miniaturized components.",
          image: img3
        }
      ]
    },
    {
      title: "Computer Accessories",
      products: [
        {
          title: "Keyboards & Mice",
          description: "Mostly made of plastic and small electronic components, keyboards and mice are often discarded in bulk.",
          impact: "Non-biodegradable plastic and electronic waste contribute to landfill overflow.",
          image: img4
        },
        {
          title: "Hard Drives & Storage Devices",
          description: "Store digital data and contain electronic circuitry.",
          impact: "Data security risks if not properly wiped before disposal.",
          image: img5
        },
        {
          title: "Headphones & Earphones",
          description: "Made of plastic, wires, and small electronic components.",
          impact: "Non-recyclable plastic waste contributes to environmental pollution.",
          image: img6
        }
      ]
    },
    {
      title: "Home Appliances",
      products: [
        {
          title: "Televisions",
          description: "Older CRT TVs contain leaded glass, while modern LCD and LED TVs contain mercury and other toxic substances.",
          impact: "Heavy metals and glass pollution if not disposed of properly.",
          image: img7
        },
        {
          title: "Refrigerators & Air Conditioners",
          description: "Contain refrigerants like CFCs and HCFCs, which contribute to ozone depletion.",
          impact: "If not properly handled, they release greenhouse gases into the atmosphere.",
          image: img8
        },
        {
          title: "Washing Machines & Dishwashers",
          description: "Large home appliances with metal, plastic, and electrical wiring.",
          impact: "Bulky waste that requires specialized recycling processes.",
          image: img9
        }
      ]
    },
    {
      title: "Other Electronics",
      products: [
        {
          title: "Game Consoles & Controllers",
          description: "Contain circuit boards, plastic, and batteries.",
          impact: "Electronic components can be toxic if improperly discarded.",
          image: img10
        },
        {
          title: "Networking Devices",
          description: "Used for internet connectivity, these devices contain circuit boards and plastic casings.",
          impact: "Outdated networking equipment leads to high levels of e-waste.",
          image: img11
        },
        {
          title: "Printers & Scanners",
          description: "Contain plastic, electronic circuits, and ink cartridges with potentially hazardous chemicals.",
          impact: "Ink and toner waste can be harmful to the environment.",
          image: img12
        }
      ]
    },
    {
      title: "Small Electronics & Components",
      products: [
        {
          title: "Batteries",
          description: "Used in almost all electronic devices, they contain toxic chemicals like lead, cadmium, and lithium.",
          impact: "Can cause soil and water pollution if they leak.",
          image: img13
        },
        {
          title: "Light Bulbs & CFLs",
          description: "CFLs contain mercury, while LEDs contain electronic circuits.",
          impact: "Improper disposal can release hazardous substances.",
          image: img14
        },
        {
          title: "Microwaves & Small Appliances",
          description: "Consist of metal, plastic, and electronic components like circuit boards.",
          impact: "Improper disposal leads to heavy metal contamination.",
          image: img15
        }
      ]
    }
  ];

  return (
    <ProductsContainer ref={containerRef}>
      <HeroSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>E-Waste Products We Handle</Title>
        <Subtitle>
          Discover the various types of electronic waste we process and learn about their environmental impact.
          Our comprehensive recycling solutions ensure responsible disposal of all electronic devices.
        </Subtitle>
      </HeroSection>

      {categories.map((category, index) => (
        <CategorySection
          key={category.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <CategoryTitle>{category.title}</CategoryTitle>
          <ProductGrid>
            {category.products.map((product, productIndex) => (
              <ProductCard
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProductImage 
                  src={product.image} 
                  alt={product.title}
                  whileHover={{ scale: 1.05 }}
                />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ImpactText>Environmental Impact: {product.impact}</ImpactText>
              </ProductCard>
            ))}
          </ProductGrid>
        </CategorySection>
      ))}
    </ProductsContainer>
  );
};

export default Products; 