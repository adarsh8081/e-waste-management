import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Team from './components/Team';
import Loader from './components/Loader';
import logo from './assets/logo.jpg';

interface NavButtonProps {
  $isActive: boolean;
  to: string;
  children: React.ReactNode;
}

const Navigation = () => {
  const location = useLocation();
  
  return (
    <motion.nav 
      className="nav-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
    >
      <div className="nav-content">
        <Link to="/" className="logo">
          <motion.img 
            src={logo} 
            alt="E-Waste Management" 
            className="logo-image"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        <StyledNavLinks>
          {['Home', 'Products', 'About', 'Our Team', 'Contact'].map((item, index) => {
            const path = item === 'Home' ? '/' : 
                        item === 'Our Team' ? '/ourteam' : 
                        `/${item.toLowerCase()}`;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <StyledNavButton 
                  to={path}
                  $isActive={location.pathname === path}
                >
                  {item}
                </StyledNavButton>
              </motion.div>
            );
          })}
        </StyledNavLinks>
      </div>
    </motion.nav>
  );
};

const StyledNavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const StyledNavButton = styled(Link)<{ $isActive: boolean }>`
  --purple: ${props => props.$isActive ? '#915EFF' : '#AE67FA'};
  font-size: 16px;
  padding: 0.6em 1.5em;
  letter-spacing: 0.08em;
  position: relative;
  font-family: inherit;
  border-radius: 0.6em;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  border: 2px solid var(--purple);
  background: ${props => props.$isActive 
    ? 'linear-gradient(to right, rgba(145, 94, 255, 0.2) 1%, rgba(145, 94, 255, 0.1) 40%, rgba(145, 94, 255, 0.1) 60%, rgba(145, 94, 255, 0.2) 100%)'
    : 'linear-gradient(to right, rgba(174, 103, 250, 0.1) 1%, transparent 40%, transparent 60%, rgba(174, 103, 250, 0.1) 100%)'};
  color: var(--purple);
  box-shadow: inset 0 0 10px rgba(145, 94, 255, 0.4), 0 0 9px 3px rgba(145, 94, 255, 0.1);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #915EFF;
    box-shadow: inset 0 0 10px rgba(145, 94, 255, 0.6), 0 0 9px 3px rgba(145, 94, 255, 0.2);
    transform: translateY(-2px);
  }

  &:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform .4s ease-in-out;
    background: linear-gradient(to right, transparent 1%, rgba(145, 94, 255, 0.1) 40%, rgba(145, 94, 255, 0.1) 60%, transparent 100%);
  }

  &:hover:before {
    transform: translateX(15em);
  }
`;

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="App" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'radial-gradient(circle at top center, rgba(145, 94, 255, 0.15) 0%, rgba(21, 12, 38, 1) 50%, rgba(10, 7, 18, 1) 100%)'
      }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/ourteam" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
