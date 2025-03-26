import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(145, 94, 255, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion(Link))`
  font-size: 1.5rem;
  font-weight: 700;
  color: #915EFF;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '♻️';
    font-size: 1.75rem;
  }

  &:hover {
    color: #6B46C1;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    padding: 1rem;
    gap: 0.5rem;
    box-shadow: 0 4px 20px rgba(145, 94, 255, 0.1);

    &.active {
      display: flex;
    }
  }
`;

const NavLink = styled(motion(Link))`
  color: #4A5568;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #915EFF, #6B46C1);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #915EFF;
    background: rgba(145, 94, 255, 0.1);
    
    &::before {
      width: 80%;
    }
  }

  &.active {
    color: #915EFF;
    background: rgba(145, 94, 255, 0.15);
    
    &::before {
      width: 80%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #915EFF;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: #6B46C1;
    transform: scale(1.1);
  }
`;

const ContactButton = styled(motion.button)`
  background: linear-gradient(45deg, #915EFF, #6B46C1);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(145, 94, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(145, 94, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const navVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <NavContainer
      as={motion.nav}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <NavContent>
        <Logo 
          to="/"
          variants={linkVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={closeMenu}
        >
          E-Waste Management
        </Logo>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        <NavLinks className={isMenuOpen ? 'active' : ''}>
          <NavLink 
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products"
            className={location.pathname === '/products' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            Products
          </NavLink>
          <NavLink 
            to="/solution"
            className={location.pathname === '/solution' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            Solution
          </NavLink>
          <NavLink 
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/team"
            className={location.pathname === '/team' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            Team
          </NavLink>
          <NavLink 
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 