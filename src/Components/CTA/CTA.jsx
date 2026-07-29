import './CTA.css';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="container">
        <div className="cta-content">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', display: 'inline-block', marginBottom: '16px' }}>Start Your Journey</span>
          <h2 className="reveal visible" style={{ opacity: 1, transform: 'none' }}>Ready For Your Next <span style={{ color: '#0EA5E9' }}>Adventure?</span></h2>
          <p className="reveal visible" style={{ opacity: 1, transform: 'none' }}>Start planning your dream vacation today. Explore amazing destinations, compare travel packages, and book your next unforgettable journey with confidence.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center reveal visible" style={{ opacity: 1, transform: 'none' }}>
            <Link to="/packages" className="btn-primary-custom"><i className="fas fa-suitcase-rolling me-2"></i> Book Your Trip</Link>
            <Link to="/contact" className="btn-secondary-custom"><i className="fas fa-envelope me-2"></i> Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
