import './Hero.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatBadgeVariants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

import Hero3DCanvas from '../Hero3DCanvas/Hero3DCanvas';

const Hero = () => {
  const navigate = useNavigate();
  const [destinationSearch, setDestinationSearch] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('1');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destinationSearch.trim()) params.set('search', destinationSearch.trim());
    if (checkInDate) params.set('date', checkInDate);
    if (travelersCount) params.set('travelers', travelersCount);

    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <section className="hero-section position-relative overflow-hidden" aria-label="Hero section">
      {/* 3D WebGL Particle Globe Canvas */}
      <Hero3DCanvas />
      {/* Floating Particles Overlay */}
      <div className="hero-particles" aria-hidden="true">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-particle" 
          style={{ width: '14px', height: '14px', top: '20%', left: '15%' }}
        />
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="hero-particle" 
          style={{ width: '20px', height: '20px', top: '65%', left: '80%' }}
        />
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hero-particle" 
          style={{ width: '10px', height: '10px', top: '40%', left: '70%' }}
        />
      </div>

      <div
        className="hero-bg hero-bg-animated"
        style={{
          backgroundImage: "url('/images/hero-main.jpg')",
        }}
      ></div>
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7 hero-content pt-5">
            <h1 className="hero-title">
              Explore The World<br />With <span className="text-gradient">Confidence</span>
            </h1>

            <p className="hero-subtitle">
              Discover breathtaking destinations, unforgettable adventures, and carefully planned travel experiences that create memories for a lifetime.
            </p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3 mb-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link to="/destinations" className="btn-primary-custom">
                  <i className="fas fa-compass me-2"></i> Explore Destinations
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link to="/contact" className="btn-secondary-custom">
                  <i className="fas fa-suitcase me-2"></i> Book Your Trip
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="d-flex flex-wrap gap-2 mb-4" aria-label="Trust and security badges">
              <motion.span variants={floatBadgeVariants} animate="animate" className="hero-trust-badge">
                <i className="fas fa-star text-warning"></i> <strong>4.9/5</strong> TripAdvisor
              </motion.span>
              <motion.span variants={floatBadgeVariants} animate="animate" className="hero-trust-badge" style={{ animationDelay: '0.8s' }}>
                <i className="fas fa-shield-alt style-color-teal" style={{ color: '#14B8A6' }}></i> 256-Bit SSL Secured
              </motion.span>
              <motion.span variants={floatBadgeVariants} animate="animate" className="hero-trust-badge" style={{ animationDelay: '1.6s' }}>
                <i className="fas fa-award text-info" style={{ color: '#0EA5E9' }}></i> 100% Certified Partner
              </motion.span>
            </motion.div>

            {/* Hero Quick Stats */}
            <motion.div variants={itemVariants} className="hero-stats">
              <div className="hero-stat-item">
                <div className="hero-stat-number">25K+</div>
                <div className="hero-stat-label">Happy Travelers</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-number">120+</div>
                <div className="hero-stat-label">Destinations</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-number">15</div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Glassmorphic Search Bar */}
        <motion.div 
          className="row mt-n5 pb-5" 
          style={{ position: 'relative', zIndex: 3 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="col-12">
            <form className="hero-search-bar" onSubmit={handleSearchSubmit} aria-label="Search travel routes">
              <div className="row g-3 align-items-end">
                <div className="col-md-3 col-sm-6">
                  <div className="search-field">
                    <label htmlFor="hero-destination-input"><i className="fas fa-map-marker-alt me-1.5" style={{ color: '#0EA5E9' }}></i> Destination</label>
                    <input 
                      id="hero-destination-input"
                      type="text" 
                      placeholder="Where do you want to go?" 
                      value={destinationSearch}
                      onChange={(e) => setDestinationSearch(e.target.value)}
                      aria-label="Destination search"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="search-field">
                    <label htmlFor="hero-checkin-input"><i className="fas fa-calendar me-1.5" style={{ color: '#0EA5E9' }}></i> Check In</label>
                    <input 
                      id="hero-checkin-input"
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      aria-label="Check in date"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="search-field">
                    <label htmlFor="hero-travelers-select"><i className="fas fa-users me-1.5" style={{ color: '#0EA5E9' }}></i> Travelers</label>
                    <select 
                      id="hero-travelers-select"
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      aria-label="Number of travelers"
                      style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.95rem' }}
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers</option>
                      <option value="5+">5+ Travelers</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit" 
                    className="search-btn w-100 justify-content-center"
                  >
                    <i className="fas fa-search me-1.5"></i> Find a Route
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
