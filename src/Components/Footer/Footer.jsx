import './Footer.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      toast.success('Thank you for subscribing to WanderLux newsletter!');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
      }, 3500);
    }, 1200);
  };

  return (
    <footer className="footer" id="contact" role="contentinfo">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand">
              <div className="brand-name">
                <div className="brand-icon"><i className="fas fa-globe-americas"></i></div> WanderLux
              </div>
              <p>
                Creating unforgettable travel experiences for adventurers, romantics, and explorers around the world since 2011.<br /><br />
                <a 
                  href="https://maps.google.com/?q=54+MM+Alam+Road+Gulberg+III+Lahore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white-50 text-decoration-none hover-white d-inline-block mb-1"
                  title="Open Office Location on Google Maps"
                >
                  <i className="fas fa-map-marker-alt me-1.5" style={{ color: '#0EA5E9' }}></i> 54 MM Alam Road, Gulberg III, Lahore, Pakistan
                </a><br />
                <a 
                  href="https://wa.me/923001234567?text=Hi%20WanderLux!%20I%20would%20like%20to%20inquire%20about%20travel%20packages." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white-50 text-decoration-none hover-white d-inline-block"
                  title="Direct WhatsApp Support Chat"
                >
                  <i className="fab fa-whatsapp me-1.5" style={{ color: '#25D366' }}></i> +92 300 123 4567
                </a>
              </p>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" title="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram" title="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube" title="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Support" title="WhatsApp Support"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links">
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Careers</a></li>
              <li><Link to="/blog"><i className="fas fa-chevron-right"></i> Blog</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Destinations</h5>
            <ul className="footer-links">
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Dubai</Link></li>
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Switzerland</Link></li>
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Turkey</Link></li>
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Bali</Link></li>
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Maldives</Link></li>
              <li><Link to="/destinations"><i className="fas fa-chevron-right"></i> Paris</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link to="/packages"><i className="fas fa-chevron-right"></i> Packages</Link></li>
              <li><Link to="/gallery"><i className="fas fa-chevron-right"></i> Gallery</Link></li>
              <li><Link to="/testimonials"><i className="fas fa-chevron-right"></i> Testimonials</Link></li>
              <li><Link to="/faq"><i className="fas fa-chevron-right"></i> FAQ</Link></li>
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div className="col-lg-3 col-md-5">
            <h5 className="footer-heading">Support</h5>
            <ul className="footer-links mb-4">
              <li><a href="#"><i className="fas fa-chevron-right"></i> Privacy Policy</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Terms & Conditions</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Help Center</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Refund Policy</a></li>
            </ul>
            <h5 className="footer-heading mt-3">Newsletter</h5>
            <form className="d-flex gap-2" onSubmit={handleSubmit} aria-label="Footer newsletter">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                style={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.9)'
                }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                className="btn"
                disabled={status === 'sending'}
                style={
                  status === 'success'
                    ? {
                        background: 'linear-gradient(135deg,#10B981,#059669)',
                        color: 'white',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                        padding: '8px 14px'
                      }
                    : {
                        background: '#0EA5E9',
                        color: 'white',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                        padding: '8px 14px'
                      }
                }
              >
                {status === 'idle' && <i className="fas fa-paper-plane"></i>}
                {status === 'sending' && <i className="fas fa-spinner fa-spin"></i>}
                {status === 'success' && <i className="fas fa-check"></i>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>© 2026 WanderLux Travel Agency. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
