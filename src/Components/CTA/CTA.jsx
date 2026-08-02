import './CTA.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', display: 'inline-block', marginBottom: '16px' }}>
            Start Your Journey
          </span>
          
          <h2>Ready For Your Next <span style={{ color: '#0EA5E9' }}>Adventure?</span></h2>
          
          <p>Start planning your dream vacation today. Explore amazing destinations, compare travel packages, and book your next unforgettable journey with confidence.</p>
          
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link to="/packages" className="btn-primary-custom">
                <i className="fas fa-suitcase-rolling me-2"></i> Book Your Trip
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="btn-secondary-custom">
                <i className="fas fa-envelope me-2"></i> Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
