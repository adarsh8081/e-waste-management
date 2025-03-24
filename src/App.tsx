import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Team from './components/Team';
import Solution from './components/Solution';
import Loader from './components/Loader';
import logo from './assets/logo.jpg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src={logo} alt="E-Waste Management" className="logo" />
        </Link>
        
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''} onClick={closeMenu}>
            Products
          </Link>
          <Link to="/solution" className={location.pathname === '/solution' ? 'active' : ''} onClick={closeMenu}>
            Solution
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>
            About
          </Link>
          <Link to="/team" className={location.pathname === '/team' ? 'active' : ''} onClick={closeMenu}>
            Team
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
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
