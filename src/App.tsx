import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import logo from './assets/logo.jpg';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="logo">
          <img src={logo} alt="E-Waste Management" className="logo-image" />
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
            Products
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
