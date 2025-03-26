import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from "@tsparticles/react";
import { Engine } from "@tsparticles/engine";

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F6E3C5 0%, #A0D995 100%);
  color: #2A4858;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(108, 196, 161, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(76, 172, 188, 0.15) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  padding-top: 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.2rem;
    color: #4A6670;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 1200px) {
    padding-top: 0;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(76, 172, 188, 0.2);
    border-color: #6CC4A1;
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #4CACBC;
  }

  p {
    color: #4A6670;
    font-size: 1.1rem;
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px rgba(76, 172, 188, 0.2);
    border-color: #6CC4A1;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #4CACBC;
    font-weight: 600;
  }

  p {
    color: #4A6670;
    line-height: 1.6;
  }

  i {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #6CC4A1;
  }
`;

const CTASection = styled.div`
  text-align: center;
  padding: 4rem;
  background: linear-gradient(45deg, rgba(108, 196, 161, 0.1), rgba(76, 172, 188, 0.1));
  border-radius: 30px;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.2rem;
    color: #4A6670;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(76, 172, 188, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 172, 188, 0.4);
  }
`;

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const FloatingImage = styled(motion.img)`
  position: absolute;
  border-radius: 15px;
  filter: drop-shadow(0 0 20px rgba(145, 94, 255, 0.3));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 0 30px rgba(145, 94, 255, 0.5));
  }
`;

const GlowingCircle = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(145, 94, 255, 0.2) 0%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  z-index: 100;
`;

const ScrollProgressFill = styled(motion.div)`
  width: 100%;
  background: linear-gradient(to top, #915EFF, #6B46C1);
  border-radius: 10px;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #6CC4A1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4CACBC;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #4A6670;
  line-height: 1.6;
`;

const InteractiveFeatureCard = styled(FeatureCard)`
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00ffcc, #915EFF, #6B46C1);
  }

  &:hover {
    transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
    border-color: rgba(0, 255, 200, 0.3);
    box-shadow: 
      0 20px 40px rgba(145, 94, 255, 0.2),
      0 0 50px rgba(0, 255, 200, 0.1);
    
    ${FeatureIcon} {
      transform: translateZ(30px);
      filter: drop-shadow(0 0 20px rgba(0, 255, 200, 0.5));
    }
    
    ${FeatureTitle} {
      transform: translateZ(25px);
      background: linear-gradient(45deg, #00ffcc, #915EFF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    ${FeatureDescription} {
      transform: translateZ(20px);
    }
  }

  ${FeatureIcon}, ${FeatureTitle}, ${FeatureDescription} {
    transition: all 0.5s ease;
  }
`;

const CircleBackground = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(145, 94, 255, 0.2) 0%, transparent 70%);
  filter: blur(50px);
  animation: float 10s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -30px); }
  }
`;

const StatsCardEnhanced = styled(StatCard)`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    border-color: rgba(0, 255, 200, 0.3);
    box-shadow: 
      0 10px 30px rgba(145, 94, 255, 0.2),
      0 0 50px rgba(0, 255, 200, 0.1);
  }

  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
`;

const Globe = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #00ffcc 0%, #915EFF 50%, #1a1a2d 100%);
  box-shadow: 
    inset 0 0 60px rgba(255, 255, 255, 0.2),
    0 0 60px rgba(0, 255, 200, 0.3),
    0 0 100px rgba(145, 94, 255, 0.3);
  z-index: 0;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    background: 
      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 70%);
    animation: rotateGlow 8s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(0, 255, 200, 0.2) 80%, rgba(145, 94, 255, 0.4) 100%);
  }

  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    right: 5%;
  }
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(145, 94, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 200, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: 0;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    0% { transform: translateY(0); }
    100% { transform: translateY(50px); }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;

  &::after {
    content: '';
    width: 2px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(145, 94, 255, 0.7), transparent);
    margin-top: 10px;
    animation: scroll 2s ease-in-out infinite;
  }

  @keyframes scroll {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(10px); opacity: 0.5; }
  }
`;

const StatsValue = styled(motion.span)`
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #00ffcc, #915EFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(0, 255, 200, 0.3);
`;

const LiveStats = styled(motion.div)`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 200px;

  @media (max-width: 1200px) {
    position: static;
    transform: none;
    width: 100%;
    margin-bottom: 2rem;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

const StatItem = styled(motion.div)`
  display: flex;
  align-items: baseline;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.2rem;
  flex-direction: column;
  text-align: center;

  @media (max-width: 1200px) {
    margin: 0 2rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    margin-top: 2rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #4A6670;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StatNumber = styled(motion.h3)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #4CACBC;
`;

const StatTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2A4858;
`;

const StatDescription = styled.p`
  color: #4A6670;
  font-size: 1rem;
  line-height: 1.5;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CTAButtonWrapper = styled(motion.button)`
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(76, 172, 188, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 172, 188, 0.4);
  }
`;

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 94, 255, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToStats = () => {
    const statsSection = document.querySelector('#stats-section');
    statsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HomeContainer>
      <ScrollProgress>
        <ScrollProgressFill style={{ scaleY: scaleX }} />
      </ScrollProgress>

      <HeroSection>
        <GridLines />
        <ParticleCanvas ref={canvasRef} />
        
        <LiveStats
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <StatItem>
            <StatsValue
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              24/7
            </StatsValue>
            Monitoring
          </StatItem>
          <StatItem>
            <StatsValue
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              100%
            </StatsValue>
            Eco-Friendly
          </StatItem>
          <StatItem>
            <StatsValue
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              50+
            </StatsValue>
            Partners
          </StatItem>
        </LiveStats>

        <Globe
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            scale: {
              duration: 1,
              ease: "easeOut"
            }
          }}
        />

        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transforming E-Waste into a Sustainable Future
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join us in our mission to revolutionize electronic waste management and create a cleaner, greener planet for future generations.
          </HeroSubtitle>
          <StyledLink to="/solution">
            <CTAButtonWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Solution
            </CTAButtonWrapper>
          </StyledLink>
        </HeroContent>

        <ScrollIndicator
          onClick={scrollToStats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: 5 }}
        >
          Scroll to explore
        </ScrollIndicator>
      </HeroSection>

      <StatsSection id="stats-section">
        <StatsGrid>
          {[
            {
              number: "50M+",
              title: "Tons of E-Waste",
              description: "Annual global electronic waste generation, with only 20% being properly recycled."
            },
            {
              number: "80%",
              title: "Recyclable Materials",
              description: "Most electronic devices contain valuable materials that can be recovered and reused."
            },
            {
              number: "$62.5B",
              title: "Economic Value",
              description: "The estimated value of raw materials in global e-waste annually."
            },
            {
              number: "40%",
              title: "Carbon Reduction",
              description: "Potential reduction in carbon emissions through proper e-waste recycling."
            }
          ].map((stat, index) => (
            <StatsCardEnhanced
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatTitle>{stat.title}</StatTitle>
              <StatDescription>{stat.description}</StatDescription>
            </StatsCardEnhanced>
          ))}
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <FeatureGrid>
          {[
            {
              icon: "♻️",
              title: "Sustainable Recycling",
              description: "Our advanced recycling processes ensure maximum material recovery while minimizing environmental impact."
            },
            {
              icon: "🌱",
              title: "Green Technology",
              description: "We employ eco-friendly technologies and practices to process e-waste responsibly."
            },
            {
              icon: "🤝",
              title: "Community Impact",
              description: "Creating jobs and supporting local communities through sustainable e-waste management."
            }
          ].map((feature, index) => (
            <InteractiveFeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </InteractiveFeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <HeroTitle style={{ fontSize: '3rem', marginBottom: '2rem' }}>
            Ready to Make a Difference?
          </HeroTitle>
          <StyledLink to="/contact">
            <CTAButtonWrapper
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </CTAButtonWrapper>
          </StyledLink>
        </motion.div>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;