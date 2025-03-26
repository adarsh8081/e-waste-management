import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import E1 from '../assets/E1.png';
import E2 from '../assets/E2.png';
import Ewaste from '../assets/Ewaste.jpg';
import Ewaste2 from '../assets/Ewaste2.jpg';
import Ewaste3 from '../assets/Ewaste3.jpg';
import Ewaste4 from '../assets/Ewaste4.png';

const SolutionContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  perspective: 1000px;
  background: #FBF7F0;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroSection = styled(motion.div)`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #D9E4DD 0%, #FBF7F0 100%);
  border-radius: 2rem;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  
  @media (max-width: 768px) {
    height: 50vh;
    margin-bottom: 2rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 40vh;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    padding: 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 2;
  color: #555555;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #333333;
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: #333333;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 6rem;
  background: #D9E4DD;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 4rem;
    padding: 2rem;
    border-radius: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 3rem;
    padding: 1.5rem;
    border-radius: 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: #333333;
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  transform: translateZ(20px);
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 1rem;
  }
`;

const Card = styled(motion.div)`
  background: #FBF7F0;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 1.25rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
    border-radius: 1rem;
    gap: 0.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 1rem;
  transform: translateZ(10px);
  filter: contrast(1.2) brightness(1.1) saturate(1.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 0;
  
  @media (max-width: 768px) {
    height: 200px;
    border-radius: 0.75rem;
  }

  @media (max-width: 480px) {
    height: 180px;
    border-radius: 0.5rem;
  }
`;

const CardTitle = styled.h3`
  color: #333333;
  font-size: 1.8rem;
  transform: translateZ(15px);
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.4rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    padding: 0.3rem 0;
  }
`;

const Description = styled.p`
  color: #444444;
  line-height: 1.8;
  transform: translateZ(10px);
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: #FBF7F0;
  padding: 2rem;
  border-radius: 1rem;
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  background: #333333;
  color: #FBF7F0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  transform: translateZ(15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0 auto 1rem;
  }

  @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.9rem;
    margin: 0 auto 0.75rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
  transform: translateZ(10px);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Solution: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50], {
    clamp: false
  });
  const opacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [1, 1, 1, 0]
  );

  const recyclingProcess = [
    {
      title: "Collection & Transportation",
      description: "E-waste is collected from households, businesses, or collection centers and transported to dismantling facilities or recycling plants.",
      image: Ewaste
    },
    {
      title: "Sorting & Categorization",
      description: "Devices are categorized based on type: Large appliances (washing machines, refrigerators), IT equipment (computers, laptops, servers), and Consumer electronics (TVs, mobile phones, tablets).",
      image: Ewaste2
    },
    {
      title: "Manual Dismantling",
      description: "Devices are manually disassembled to extract useful components like PCBs, plastic casings, glass screens, and batteries. Each component is carefully separated for specialized processing.",
      image: Ewaste3
    }
  ];

  const recoveredMaterials = [
    {
      title: "Precious Metals Recovery",
      description: "Metal refining processes extract valuable materials like gold, silver, platinum, and palladium from circuit boards and connectors. These materials are then purified for reuse in new electronics.",
      image: E1
    },
    {
      title: "Plastic Recycling",
      description: "Separated plastics are melted and repurposed for manufacturing new products, reducing the need for virgin plastic. This helps conserve petroleum resources and reduce plastic waste.",
      image: E2
    },
    {
      title: "Glass Processing",
      description: "CRT glass is carefully processed to remove lead and other hazardous materials before recycling. The processed glass can be used in new applications or safely disposed of.",
      image: Ewaste
    }
  ];

  const challenges = [
    {
      title: "Toxicity Management",
      description: "Handling hazardous substances safely requires specialized equipment and trained personnel to prevent environmental contamination and health risks.",
      image: Ewaste2
    },
    {
      title: "Cost & Investment",
      description: "Setting up dismantling plants requires significant investment in infrastructure, technology, and compliance with environmental regulations.",
      image: Ewaste3
    },
    {
      title: "Consumer Awareness",
      description: "Increasing public awareness about proper e-waste disposal and recycling is crucial for improving collection rates and reducing illegal dumping.",
      image: Ewaste4
    }
  ];

  return (
    <SolutionContainer ref={containerRef}>
      <HeroSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeroContent>
          <HeroTitle>E-Waste Dismantling</HeroTitle>
          <HeroSubtitle>
            Everything You Need to Know About Sustainable E-Waste Management
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Our E-Waste Recycling Process</SectionTitle>
        <Grid>
          {recyclingProcess.map((step, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image 
                src={step.image} 
                alt={step.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <CardTitle>{step.title}</CardTitle>
              <Description>{step.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Recovered Materials & Their Applications</SectionTitle>
        <Grid>
          {recoveredMaterials.map((material, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image 
                src={material.image} 
                alt={material.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <CardTitle>{material.title}</CardTitle>
              <Description>{material.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Key Challenges in E-Waste Dismantling</SectionTitle>
        <Grid>
          {challenges.map((challenge, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image 
                src={challenge.image} 
                alt={challenge.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <CardTitle>{challenge.title}</CardTitle>
              <Description>{challenge.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Environmental Impact</SectionTitle>
        {[
          {
            number: 1,
            title: "Reduced Landfill Waste",
            description: "By properly recycling e-waste, we prevent harmful materials from entering landfills and contaminating soil and groundwater."
          },
          {
            number: 2,
            title: "Resource Conservation",
            description: "Recovering valuable materials reduces the need for mining and manufacturing new materials, conserving natural resources."
          },
          {
            number: 3,
            title: "Energy Savings",
            description: "Recycling materials requires significantly less energy than extracting and processing raw materials."
          }
        ].map((step, index) => (
          <ProcessStep
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <StepNumber>{step.number}</StepNumber>
            <StepContent>
              <CardTitle>{step.title}</CardTitle>
              <Description>{step.description}</Description>
            </StepContent>
          </ProcessStep>
        ))}
      </Section>

      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>How You Can Contribute</SectionTitle>
        <Grid>
          {[
            {
              title: "Donate Old Devices",
              description: "Extend the lifespan of your devices by donating them to organizations that can refurbish and reuse them."
            },
            {
              title: "Use Certified Recyclers",
              description: "Ensure proper disposal by using certified e-waste recyclers who follow environmental regulations."
            },
            {
              title: "Support Right to Repair",
              description: "Join the movement to encourage longer device lifespans and reduce e-waste generation."
            }
          ].map((item, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <CardTitle>{item.title}</CardTitle>
              <Description>{item.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>
    </SolutionContainer>
  );
};

export default Solution; 