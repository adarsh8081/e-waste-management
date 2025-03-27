import React, { useState, useEffect, useRef, Suspense, FC } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import E1 from '../assets/E1.png';
import E2 from '../assets/E2.png';
import Ewaste from '../assets/Ewaste.jpg';
import Ewaste2 from '../assets/Ewaste2.jpg';
import Ewaste3 from '../assets/Ewaste3.jpg';
import Ewaste4 from '../assets/Ewaste4.png';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// Map constants
const MAP_CENTER: LatLngTuple = [20, 0];
const MAP_ZOOM = 2;

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

const Canvas3DContainer = styled.div`
  height: 400px;
  width: 100%;
  margin: 2rem 0;
  border-radius: 1rem;
  overflow: hidden;
  background: #1a1a1a;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const ChartContainer = styled.div`
  background: #FBF7F0;
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const AchievementBadge = styled(motion.div)`
  background: linear-gradient(45deg, #FFD700, #FFA500);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 1rem;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  cursor: pointer;
`;

const ImpactScore = styled.div`
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(45deg, #00ff87, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 2rem 0;
`;

// Simple 3D Model Component
const EwasteModel: FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const animate = () => {
      if (!meshRef.current) return;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (meshRef.current) {
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
      }
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2, 1, 1, 1]} />
      <meshStandardMaterial
        color="#00ff87"
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

interface RecyclingLocation {
  lat: number;
  lng: number;
  impact: number;
  deviceCount: number;
  materialsRecovered: {
    metals: number;
    plastics: number;
    glass: number;
  };
  facilityType: 'Collection Center' | 'Processing Plant' | 'Recycling Facility';
  co2Saved: number;
}

// Add predefined e-waste processing centers
const INITIAL_PROCESSING_CENTERS: RecyclingLocation[] = [
  {
    lat: 40.7128,
    lng: -74.0060,
    impact: 8500,
    deviceCount: 25000,
    materialsRecovered: {
      metals: 12500,
      plastics: 8000,
      glass: 4500
    },
    facilityType: 'Processing Plant',
    co2Saved: 15000
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    impact: 7800,
    deviceCount: 22000,
    materialsRecovered: {
      metals: 11000,
      plastics: 7000,
      glass: 4000
    },
    facilityType: 'Recycling Facility',
    co2Saved: 13500
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    impact: 9200,
    deviceCount: 28000,
    materialsRecovered: {
      metals: 14000,
      plastics: 9000,
      glass: 5000
    },
    facilityType: 'Processing Plant',
    co2Saved: 17000
  },
  {
    lat: 28.6139,
    lng: 77.2090,
    impact: 6500,
    deviceCount: 19000,
    materialsRecovered: {
      metals: 9500,
      plastics: 6000,
      glass: 3500
    },
    facilityType: 'Collection Center',
    co2Saved: 11000
  }
];

const Solution: React.FC = () => {
  const containerRef = useRef(null);
  const [ewasteCount, setEwasteCount] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userImpact, setUserImpact] = useState(0);
  const [recyclingLocations, setRecyclingLocations] = useState<RecyclingLocation[]>(INITIAL_PROCESSING_CENTERS);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    try {
      // Simulate real-time e-waste processing with realistic data
      const interval = setInterval(() => {
        setRecyclingLocations(prev => prev.map(location => ({
          ...location,
          deviceCount: location.deviceCount + Math.floor(Math.random() * 10),
          impact: location.impact + Math.floor(Math.random() * 5),
          co2Saved: location.co2Saved + Math.floor(Math.random() * 100),
          materialsRecovered: {
            metals: location.materialsRecovered.metals + Math.floor(Math.random() * 5),
            plastics: location.materialsRecovered.plastics + Math.floor(Math.random() * 3),
            glass: location.materialsRecovered.glass + Math.floor(Math.random() * 2)
          }
        })));
      }, 5000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error in data simulation:', error);
    }
  }, []);

  const chartData = {
    labels: ['Metals', 'Plastics', 'Glass', 'Other'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const impactMetrics = [
    {
      title: "Global Impact",
      value: ewasteCount * 100,
      label: "Devices Processed",
      icon: "🌍"
    },
    {
      title: "Your Impact",
      value: userImpact,
      label: "Points Earned",
      icon: "⭐"
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
          <ImpactScore>
            <CountUp end={userImpact} duration={2} separator="," />
            <div style={{ fontSize: '1.5rem' }}> Impact Points</div>
          </ImpactScore>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUserImpact(prev => prev + 100)}
          >
            Make an Impact
          </ActionButton>
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
        <MapWrapper>
          <MapContainer 
            center={MAP_CENTER} 
            zoom={MAP_ZOOM} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {recyclingLocations.map((location, index) => (
              <Circle
                key={`${location.lat}-${location.lng}-${index}`}
                center={[location.lat, location.lng] as LatLngTuple}
                radius={75000}
                pathOptions={{
                  color: location.facilityType === 'Processing Plant' ? '#00ff87' :
                         location.facilityType === 'Recycling Facility' ? '#60efff' : '#ffd700',
                  fillColor: location.facilityType === 'Processing Plant' ? '#00ff87' :
                            location.facilityType === 'Recycling Facility' ? '#60efff' : '#ffd700',
                  fillOpacity: 0.6
                }}
              >
                <Popup>
                  <div style={{ padding: '10px' }}>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>{location.facilityType}</h3>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Devices Processed:</strong> {location.deviceCount.toLocaleString()}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Materials Recovered (kg):</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Metals: {location.materialsRecovered.metals.toLocaleString()}</li>
                        <li>Plastics: {location.materialsRecovered.plastics.toLocaleString()}</li>
                        <li>Glass: {location.materialsRecovered.glass.toLocaleString()}</li>
                      </ul>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>CO₂ Saved (kg):</strong> {location.co2Saved.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
                      Location: [{location.lat.toFixed(4)}, {location.lng.toFixed(4)}]
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </MapWrapper>
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
        <SectionTitle>Interactive E-Waste Visualization</SectionTitle>
        <Canvas3DContainer>
          <ErrorBoundary fallback={<div>Error loading 3D visualization</div>}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              style={{ background: '#1a1a1a' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Suspense fallback={null}>
                <EwasteModel />
              </Suspense>
              <OrbitControls
                enablePan={false}
                maxDistance={10}
                minDistance={2}
              />
            </Canvas>
          </ErrorBoundary>
        </Canvas3DContainer>
      </Section>

      <Section>
        <SectionTitle>Real-Time Processing Analytics</SectionTitle>
        <ChartContainer>
          <Doughnut data={chartData} options={chartOptions} />
        </ChartContainer>
      </Section>

      <Section>
        <SectionTitle>Your Achievements</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🌟', '🏆', '🎖️', '🌍'].map((emoji, index) => (
            <AchievementBadge
              key={index}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {emoji}
            </AchievementBadge>
          ))}
        </div>
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
                setUserImpact(prev => prev + 50);
              }}
            >
              <Image
                src={solution.image}
                alt={solution.title}
                whileHover={{ scale: 1.05, rotateY: 180 }}
                transition={{ duration: 0.6 }}
              />
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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default Solution;