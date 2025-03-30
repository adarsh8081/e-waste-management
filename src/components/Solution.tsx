import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Ewaste from '../assets/Ewaste.jpg';
import Ewaste2 from '../assets/Ewaste2.jpg';
import Ewaste3 from '../assets/Ewaste3.jpg';

const Container = styled.div`
  background: #FFFFFF;
  min-height: 100vh;
  color: #2D3436;
`;

const Hero = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 100%);
  position: relative;
  padding: 3rem 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1E88E5;
  margin: 0;
  line-height: 1.2;

  span {
    color: #1565C0;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #546E7A;
  margin: 1rem 0 0 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProblemSection = styled.section`
  padding: 4rem 2rem;
  background: #FFFFFF;
  position: relative;
`;

const GlobalDistributionCard = styled(motion.div)`
  background: #FFFFFF;
  border: 1px solid #E3F2FD;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const GlobalDistributionHeader = styled.div`
  padding: 1.5rem;
  background: #1E88E5;
  position: relative;
`;

const GlobalDistributionTitle = styled.h2`
  font-size: 1.4rem;
  color: #FFFFFF;
  margin: 0;
  font-weight: 600;
  text-align: center;
`;

const GlobalDistributionDescription = styled.p`
  color:hsl(0, 0.00%, 100.00%);
  font-size: 1rem;
  margin: 1rem 1.5rem;
  line-height: 1.5;
  text-align: center;
`;

const GlobalDistributionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InsightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GlobalInsightBox = styled(motion.div)`
  background: #F8F9FA;
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  border-left: 3px solid #1E88E5;

  strong {
    color: #1565C0;
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  p {
    color: #2D3436;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const MapContainer = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E3F2FD;
  height: 100%;

  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #1E88E5;
  margin: 0 0 2.5rem 0;
  text-align: center;
  position: relative;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #1E88E5;
    border-radius: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: #FFFFFF;
  border: 1px solid #E3F2FD;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background: #1E88E5;
  position: relative;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #FFFFFF;
  margin: 0;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: #546E7A;
  margin: 1rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const InsightBox = styled.div`
  background: #F8F9FA;
  padding: 1.25rem 1.5rem;
  margin: 0 1.5rem 1rem;
  border-radius: 8px;
  border-left: 3px solid #1E88E5;

  strong {
    color: #1565C0;
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  p {
    color: #546E7A;
  margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const SolutionSection = styled.section`
  padding: 4rem 2rem;
  background: #F8F9FA;
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const SolutionCard = styled(motion.div)`
  background: #FFFFFF;
  border: 1px solid #E3F2FD;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const SolutionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SolutionContent = styled.div`
  padding: 1.5rem;
`;

const SolutionTitle = styled.h3`
  font-size: 1.4rem;
  color: #1E88E5;
  margin: 0;
  font-weight: 600;
`;

const SolutionDescription = styled.p`
  color: #546E7A;
  margin: 0.75rem 0 0 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ImpactMetric = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 8px;
  border-left: 3px solid #1E88E5;
  
  h4 {
    color: #1565C0;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    color: #546E7A;
  margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const MapSection = styled.section`
  padding: 4rem 2rem;
  background: #0A0F1C;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
  }
`;

const MapCard = styled(motion.div)`
  background: #151C2C;
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 20px;
  overflow: hidden;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.1);
`;

const MapTitle = styled.h2`
  font-size: 3rem;
  color: #1E88E5;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MapDescription = styled.p`
  font-size: 1.2rem;
  color: #2D3436;
  text-align: center;
  margin: 0 auto 40px auto;
  max-width: 800px;
  line-height: 1.6;
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapInsights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MapInsightBox = styled(motion.div)`
  background: #1A2333;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: #00ff88;
    border-radius: 0 4px 4px 0;
  }

  strong {
    color: #00ff88;
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }

  p {
    color: #94A3B8;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const MapVisualization = styled.div`
  iframe {
  width: 100%;
    height: 400px;
  border: none;
    border-radius: 12px;
    background: #151C2C;
  }
`;

const Solution: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const problemInsights = [
    {
      title: "Rising E-Waste Crisis",
      description: "Global e-waste generation trends show an alarming increase, threatening environmental sustainability.",
      insight: "The data reveals a consistent upward trend, with projections showing a 21% increase by 2024.",
      solution: "AI-powered sorting and recycling systems can process this increasing volume efficiently.",
      plot: "/plots/time_series.html"
    },
    {
      title: "Global Distribution",
      description: "Mapping the worldwide spread of e-waste processing capabilities.",
      insight: "Only 20% of regions have advanced processing facilities.",
      solution: "Strategic placement of quantum-enhanced recycling centers.",
      plot: "/plots/choropleth.html"
    },
    {
      title: "Major Contributing Nations",
      description: "Identifying the largest contributors to help focus international cooperation efforts.",
      insight: "Top 10 nations account for over 65% of global e-waste generation.",
      solution: "Targeted implementation of advanced recycling facilities in high-impact regions.",
      plot: "/plots/top_countries.html"
    },
    {
      title: "Material Composition",
      description: "Understanding the complex makeup of e-waste for optimal resource recovery.",
      insight: "Precious metals constitute 15% of e-waste, representing significant economic value.",
      solution: "Plasma-based extraction technology recovers 95% of valuable materials.",
      plot: "/plots/composition.html"
    },
    {
      title: "Regional Impact Patterns",
      description: "Analyzing environmental impact variations across different regions.",
      insight: "Developing regions show 40% higher environmental impact due to informal processing.",
      solution: "Implementation of standardized processing methods reduces environmental damage by 80%.",
      plot: "/plots/regional_trends.html"
    },
    {
      title: "Processing Efficiency",
      description: "Statistical analysis of current processing methods and their effectiveness.",
      insight: "Traditional methods recover only 30% of valuable materials.",
      solution: "Molecular reconstruction technology achieves 98% recovery rate.",
      plot: "/plots/box_plots.png",
      isImage: true
    },
    {
      title: "Recovery Trends",
      description: "Analysis of material recovery rates and technological improvements over time.",
      insight: "Advanced processing methods show 300% improvement in recovery efficiency.",
      solution: "Integration of AI and molecular reconstruction yields optimal recovery rates.",
      plot: "/plots/recovery_trends.html"
    }
  ];

  const solutions = [
    {
      title: "Quantum-Enhanced Sorting",
      description: "AI-powered system with 99.9% accuracy in material identification and sorting",
      image: Ewaste,
      impact: {
        title: "Environmental Impact",
        description: "Reduces sorting errors by 99.9%, preventing hazardous material contamination"
      }
    },
    {
      title: "Plasma Recovery",
      description: "Zero-waste rare earth element extraction using advanced plasma technology",
      image: Ewaste2,
      impact: {
        title: "Resource Recovery",
        description: "Recovers 95% of precious metals, reducing mining demand by 40%"
      }
    },
    {
      title: "Molecular Reconstruction",
      description: "Converting e-waste into high-grade materials through molecular restructuring",
      image: Ewaste3,
      impact: {
        title: "Circular Economy",
        description: "Achieves 98% material reuse rate, creating a true circular economy"
      }
    }
  ];

  const filteredProblemInsights = problemInsights.filter(problem => problem.title !== "Global Distribution");

  return (
    <Container>
      <Hero>
        <div>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
            E-Waste Crisis & <span>Solutions</span>
          </Title>
          <Subtitle>
            Transforming Environmental Challenges into Sustainable Opportunities
          </Subtitle>
        </div>
      </Hero>

      <ProblemSection>
        <GlobalDistributionCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlobalDistributionHeader>
            <GlobalDistributionTitle>Global E-Waste Distribution</GlobalDistributionTitle>
            <GlobalDistributionDescription>
              Mapping the worldwide spread of e-waste processing capabilities and identifying areas for strategic facility placement.
            </GlobalDistributionDescription>
          </GlobalDistributionHeader>
          <GlobalDistributionContent>
            <InsightColumn>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <strong>Current Challenge</strong>
                <p>Only 20% of regions have advanced processing facilities, leading to inefficient and environmentally harmful practices in underserved areas.</p>
              </GlobalInsightBox>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <strong>Strategic Solution</strong>
                <p>Implementation of quantum-enhanced recycling centers in key locations to maximize coverage and minimize transportation impact.</p>
              </GlobalInsightBox>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <strong>Expected Impact</strong>
                <p>80% increase in processing capacity and 60% reduction in transportation emissions through optimized facility placement.</p>
              </GlobalInsightBox>
            </InsightColumn>
            <MapContainer>
              <iframe src="/plots/choropleth.html" title="Global E-Waste Distribution Map" />
            </MapContainer>
          </GlobalDistributionContent>
        </GlobalDistributionCard>

        <SectionTitle>Global E-Waste Analytics</SectionTitle>
        <Grid>
          {filteredProblemInsights.map((problem, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardHeader>
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardDescription>{problem.description}</CardDescription>
              <InsightBox>
                <strong>Key Problem</strong>
                <p>{problem.insight}</p>
              </InsightBox>
              <InsightBox>
                <strong>Our Solution</strong>
                <p>{problem.solution}</p>
              </InsightBox>
              {problem.plot && (
                <VisualizationContainer>
                  {problem.plot.endsWith('.html') ? (
                    <iframe src={problem.plot} title={problem.title} />
                  ) : (
                    <img src={problem.plot} alt={problem.title} />
                  )}
                </VisualizationContainer>
              )}
            </Card>
          ))}
        </Grid>
      </ProblemSection>

      <SolutionSection>
        <SectionTitle>Innovative Solutions</SectionTitle>
        <SolutionGrid>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SolutionImage src={solution.image} alt={solution.title} />
              <SolutionContent>
                <SolutionTitle>{solution.title}</SolutionTitle>
                <SolutionDescription>{solution.description}</SolutionDescription>
                <ImpactMetric>
                  <h4>{solution.impact.title}</h4>
                  <p>{solution.impact.description}</p>
                </ImpactMetric>
              </SolutionContent>
            </SolutionCard>
          ))}
        </SolutionGrid>
      </SolutionSection>
    </Container>
  );
};

export default Solution;