import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import E1 from '../assets/E1.png';
import E2 from '../assets/E2.png';
import Ewaste from '../assets/Ewaste.jpg';
import Ewaste2 from '../assets/Ewaste2.jpg';
import Ewaste3 from '../assets/Ewaste3.jpg';
import Ewaste4 from '../assets/Ewaste4.png';

// Styled components
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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 1rem;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
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

const StepTitle = styled.h3`
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

const StepDescription = styled.p`
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

const InteractiveCounter = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const CounterValue = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 1rem 0;
  background: linear-gradient(45deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CounterLabel = styled.div`
  font-size: 1.2rem;
  color: #888;
`;

const InteractiveCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &:hover {
    transform: translateY(-10px) rotateX(10deg) rotateY(10deg);
    
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff87 0%, #60efff 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  color: #1a1a1a;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,255,135,0.3);
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const VisualizationCard = styled(motion.div)`
  background: #FBF7F0;
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  width: 90%;
  max-width: 1200px;
  margin: 2.5rem auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1400px) {
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
`;

const VisualizationTitle = styled.h3`
  color: #333333;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const VisualizationDescription = styled.p`
  color: #444444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InsightBox = styled.div`
  background: linear-gradient(135deg, #D9E4DD 0%, #FBF7F0 100%);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #00ff87;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const VisualizationFrame = styled.iframe`
  width: 100%;
  height: 70vh;
  min-height: 500px;
  border: none;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
  }
`;

const Solution: React.FC = () => {
  const containerRef = useRef(null);
  const [ewasteCount, setEwasteCount] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const impactMetrics = [
    {
      title: "Global Impact",
      value: ewasteCount * 100,
      label: "Devices Processed",
      icon: "🌍"
    },
    {
      title: "Community Impact",
      value: Math.floor(ewasteCount * 2.5),
      label: "kg CO2 Saved",
      icon: "🌱"
    }
  ];

  const innovativeSolutions = [
    {
      title: "AI-Powered Sorting Revolution",
      description: "Our quantum-enhanced AI system achieves 99.9% sorting accuracy, processing 1000 items per minute. Real-time material identification enables perfect segregation.",
      image: Ewaste,
      stats: { efficiency: 99.9, speed: 1000, accuracy: 99.8 }
    },
    {
      title: "Plasma Recovery Technology",
      description: "Revolutionary plasma-based extraction recovers rare earth elements with zero chemical waste. Patented process yields 40% more precious metals than traditional methods.",
      image: Ewaste2,
      stats: { yield: 40, purity: 99.99, energy: 60 }
    },
    {
      title: "Molecular Reconstruction",
      description: "Breakthrough molecular restructuring converts e-waste plastics into high-grade materials for new electronics, achieving a true circular economy.",
      image: Ewaste3,
      stats: { conversion: 95, quality: 98, cycle: 100 }
    }
  ];

  return (
    <SolutionContainer ref={containerRef}>
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroContent>
          <HeroTitle>Next-Gen E-Waste Solutions</HeroTitle>
          <HeroSubtitle>
            Join the Global Movement for Sustainable Electronics
          </HeroSubtitle>
          <p style={{
            fontSize: '1.1rem',
            color: '#555555',
            lineHeight: '1.8',
            margin: '2rem auto',
            maxWidth: '700px',
            fontWeight: '400'
          }}>
            Our innovative e-waste management platform combines cutting-edge technology with environmental responsibility. 
            We're dedicated to transforming electronic waste into valuable resources while protecting our planet. 
            Through advanced recycling processes, data-driven insights, and global collaboration, we're building a 
            sustainable future for electronics.
          </p>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Global E-Waste Processing Network</SectionTitle>
        <Description style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Track real-time e-waste processing across our global network of recycling facilities. 
          Each center specializes in sustainable electronics recycling, material recovery, and 
          environmental impact reduction. Watch as we transform electronic waste into valuable 
          resources while reducing our carbon footprint.
        </Description>
        <VisualizationFrame src="/plots/map.html" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#00ff87', borderRadius: '50%' }}></div>
            <span>Processing Plant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#60efff', borderRadius: '50%' }}></div>
            <span>Recycling Facility</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#ffd700', borderRadius: '50%' }}></div>
            <span>Collection Center</span>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Real-Time Processing Analytics</SectionTitle>
        <Description style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Comprehensive analytics and visualizations showing the global impact of our e-waste management solutions.
          These insights help drive better decision-making and showcase our commitment to environmental sustainability.
        </Description>

        <VisualizationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VisualizationTitle>Global E-Waste Generation Trends</VisualizationTitle>
          <VisualizationDescription>
            Track the evolution of e-waste generation patterns from 2020 to 2024, highlighting the urgent need for sustainable solutions.
          </VisualizationDescription>
          <InsightBox>
            <strong>Key Insight:</strong> The data reveals a consistent upward trend in e-waste generation, emphasizing the growing importance of effective management strategies.
          </InsightBox>
          <VisualizationFrame src="/plots/time_series.html" />
        </VisualizationCard>

        <VisualizationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VisualizationTitle>Leading E-Waste Contributing Nations</VisualizationTitle>
          <VisualizationDescription>
            Analyze the top countries contributing to global e-waste, informing targeted management strategies and international cooperation.
          </VisualizationDescription>
          <InsightBox>
            <strong>Key Insight:</strong> Understanding regional patterns enables more effective resource allocation and policy development.
          </InsightBox>
          <VisualizationFrame src="/plots/top_countries.html" />
        </VisualizationCard>

        <VisualizationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VisualizationTitle>E-Waste Composition Analysis</VisualizationTitle>
          <VisualizationDescription>
            Detailed breakdown of e-waste types, enabling optimized recycling strategies and resource recovery.
          </VisualizationDescription>
          <InsightBox>
            <strong>Key Insight:</strong> Different e-waste categories require specialized handling approaches for maximum recovery efficiency.
          </InsightBox>
          <VisualizationFrame src="/plots/composition.html" />
        </VisualizationCard>

        <VisualizationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <VisualizationTitle>Environmental Impact Assessment</VisualizationTitle>
          <VisualizationDescription>
            Measure and track the environmental impact of e-waste across different regions and processing methods.
          </VisualizationDescription>
          <InsightBox>
            <strong>Key Insight:</strong> Regional variations in environmental impact highlight opportunities for targeted improvements.
          </InsightBox>
          <VisualizationFrame src="/plots/regional_trends.html" />
        </VisualizationCard>

        <VisualizationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <VisualizationTitle>CO2 Emissions Impact</VisualizationTitle>
          <VisualizationDescription>
            Analyze the relationship between e-waste processing and carbon emissions, tracking our environmental footprint.
          </VisualizationDescription>
          <InsightBox>
            <strong>Key Insight:</strong> Understanding emissions patterns helps optimize our processing methods for minimal environmental impact.
          </InsightBox>
          <VisualizationFrame src="/plots/choropleth.html" />
        </VisualizationCard>
      </Section>

      <Section>
        <SectionTitle>Quantum-Enhanced Solutions</SectionTitle>
        <Grid>
          {innovativeSolutions.map((solution, index) => (
            <InteractiveCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => {
                setActiveSection(index);
              }}
            >
              <ImageContainer style={{ transform: activeSection === index ? 'rotateY(180deg)' : 'none' }}>
                <img
                  src={solution.image}
                  alt={solution.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageContainer>
              <CardTitle>{solution.title}</CardTitle>
              <Description>{solution.description}</Description>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeSection === index ? 'auto' : 0,
                  opacity: activeSection === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                {Object.entries(solution.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    style={{ margin: '0.5rem 0' }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  >
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                    <motion.div
                      style={{
                        background: 'linear-gradient(90deg, #00ff87 0%, #60efff 100%)',
                        height: '10px',
                        borderRadius: '5px',
                        width: `${value}%`
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </InteractiveCard>
          ))}
        </Grid>
      </Section>
    </SolutionContainer>
  );
};

export default Solution;