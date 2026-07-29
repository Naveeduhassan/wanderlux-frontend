import './Hero.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      {/* Floating Particles Overlay */}
      <div className="hero-particles" aria-hidden="true">
        <div className="hero-particle" style={{ width: '12px', height: '12px', top: '20%', left: '15%', animationDelay: '0s' }}></div>
        <div className="hero-particle" style={{ width: '18px', height: '18px', top: '65%', left: '80%', animationDelay: '2.5s' }}></div>
        <div className="hero-particle" style={{ width: '10px', height: '10px', top: '40%', left: '70%', animationDelay: '5s' }}></div>
        <div className="hero-particle" style={{ width: '14px', height: '14px', top: '80%', left: '25%', animationDelay: '3.5s' }}></div>
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
            <h1 className="hero-title animate-fade-up delay-1">
              Explore The World<br />With <span className="text-gradient">Confidence</span>
            </h1>
            <p className="hero-subtitle animate-fade-up delay-2">
              Discover breathtaking destinations, unforgettable adventures, and carefully planned travel experiences that create memories for a lifetime.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 animate-fade-up delay-3 mb-4">
              <Link to="/destinations" className="btn-primary-custom">
                <i className="fas fa-compass me-2"></i> Explore Destinations
              </Link>
              <Link to="/contact" className="btn-secondary-custom">
                <i className="fas fa-suitcase me-2"></i> Book Your Trip
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="d-flex flex-wrap gap-2 animate-fade-up delay-4 mb-4" aria-label="Trust and security badges">
              <span className="hero-trust-badge">
                <i className="fas fa-star text-warning"></i> <strong>4.9/5</strong> TripAdvisor
              </span>
              <span className="hero-trust-badge">
                <i className="fas fa-shield-alt style-color-teal" style={{ color: '#14B8A6' }}></i> 256-Bit SSL Secured
              </span>
              <span className="hero-trust-badge">
                <i className="fas fa-award text-info" style={{ color: '#0EA5E9' }}></i> 100% Certified Partner
              </span>
            </div>

            {/* Hero Quick Stats */}
            <div className="hero-stats animate-fade-up delay-5">
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
            </div>
          </div>
        </div>

        {/* Glassmorphic Functional Search Bar */}
        <div className="row mt-n5 pb-5 animate-fade-up delay-5" style={{ position: 'relative', zIndex: 3 }}>
          <div className="col-12">
            <form className="hero-search-bar" onSubmit={handleSearchSubmit} aria-label="Search travel routes">
              <div className="row g-3 align-items-end">
                <div className="col-md-3 col-sm-6">
                  <div className="search-field">
                    <label><i className="fas fa-map-marker-alt me-1.5" style={{ color: '#0EA5E9' }}></i> Destination</label>
                    <input 
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
                    <label><i className="fas fa-calendar me-1.5" style={{ color: '#0EA5E9' }}></i> Check In</label>
                    <input 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      aria-label="Check in date"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="search-field">
                    <label><i className="fas fa-users me-1.5" style={{ color: '#0EA5E9' }}></i> Travelers</label>
                    <select 
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
                  <button type="submit" className="search-btn w-100 justify-content-center">
                    <i className="fas fa-search me-1.5"></i> Find a Route
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
