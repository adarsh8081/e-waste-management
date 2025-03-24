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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover;
    opacity: 0.15;
    z-index: 1;
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
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: #333333;
  font-weight: 500;
`;

const Section = styled(motion.section)`
  margin-bottom: 6rem;
  background: #D9E4DD;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #333333;
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  transform: translateZ(20px);
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
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

const Image = styled(motion.img)`
  width: 100%;
  height: 250px;
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

const CardTitle = styled.h3`
  color: #333333;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  transform: translateZ(15px);
  font-weight: 600;
`;

const Description = styled.p`
  color: #444444;
  line-height: 1.8;
  transform: translateZ(10px);
  font-weight: 500;
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
`;

const StepContent = styled.div`
  flex: 1;
  transform: translateZ(10px);
`;

const Solution: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroContent>
          <HeroTitle>E-Waste Dismantling</HeroTitle>
          <HeroSubtitle>
            Everything You Need to Know About Sustainable E-Waste Management
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Section
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Our E-Waste Recycling Process</SectionTitle>
        <Grid>
          {recyclingProcess.map((step, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              viewport={{ once: true }}
            >
              <Image 
                src={step.image} 
                alt={step.title}
                whileHover={{ scale: 1.05 }}
              />
              <CardTitle>{step.title}</CardTitle>
              <Description>{step.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Recovered Materials & Their Applications</SectionTitle>
        <Grid>
          {recoveredMaterials.map((material, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              viewport={{ once: true }}
            >
              <Image 
                src={material.image} 
                alt={material.title}
                whileHover={{ scale: 1.05 }}
              />
              <CardTitle>{material.title}</CardTitle>
              <Description>{material.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Key Challenges in E-Waste Dismantling</SectionTitle>
        <Grid>
          {challenges.map((challenge, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              viewport={{ once: true }}
            >
              <Image 
                src={challenge.image} 
                alt={challenge.title}
                whileHover={{ scale: 1.05 }}
              />
              <CardTitle>{challenge.title}</CardTitle>
              <Description>{challenge.description}</Description>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Environmental Impact</SectionTitle>
        <ProcessStep
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true }}
        >
          <StepNumber>1</StepNumber>
          <StepContent>
            <CardTitle>Reduced Landfill Waste</CardTitle>
            <Description>
              By properly recycling e-waste, we prevent harmful materials from entering landfills and contaminating soil and groundwater.
            </Description>
          </StepContent>
        </ProcessStep>
        <ProcessStep
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true }}
        >
          <StepNumber>2</StepNumber>
          <StepContent>
            <CardTitle>Resource Conservation</CardTitle>
            <Description>
              Recovering valuable materials reduces the need for mining and manufacturing new materials, conserving natural resources.
            </Description>
          </StepContent>
        </ProcessStep>
        <ProcessStep
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true }}
        >
          <StepNumber>3</StepNumber>
          <StepContent>
            <CardTitle>Energy Savings</CardTitle>
            <Description>
              Recycling materials requires significantly less energy than extracting and processing raw materials.
            </Description>
          </StepContent>
        </ProcessStep>
      </Section>

      <Section
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>How You Can Contribute</SectionTitle>
        <Grid>
          <Card
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, rotateX: 5 }}
            viewport={{ once: true }}
          >
            <CardTitle>Donate Old Devices</CardTitle>
            <Description>
              Extend the lifespan of your devices by donating them to organizations that can refurbish and reuse them.
            </Description>
          </Card>
          <Card
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateX: 5 }}
            viewport={{ once: true }}
          >
            <CardTitle>Use Certified Recyclers</CardTitle>
            <Description>
              Ensure proper disposal by using certified e-waste recyclers who follow environmental regulations.
            </Description>
          </Card>
          <Card
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotateX: 5 }}
            viewport={{ once: true }}
          >
            <CardTitle>Support Right to Repair</CardTitle>
            <Description>
              Join the movement to encourage longer device lifespans and reduce e-waste generation.
            </Description>
          </Card>
        </Grid>
      </Section>
    </SolutionContainer>
  );
};

export default Solution; 