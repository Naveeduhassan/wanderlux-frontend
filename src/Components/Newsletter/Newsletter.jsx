import './Newsletter.css';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
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
    <section className="newsletter-section" id="newsletter" aria-label="Newsletter">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 reveal-left visible" style={{ opacity: 1, transform: 'none' }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', display: 'inline-block', marginBottom: '12px' }}><i className="fas fa-envelope me-2"></i>Newsletter</span>
            <h2>Stay Updated With Our<br />Latest Offers</h2>
            <p className="mt-3">Subscribe to receive travel tips, exclusive discounts, and the latest tour packages directly in your inbox.</p>
          </div>
          <div className="col-lg-6 reveal-right visible" style={{ opacity: 1, transform: 'none' }}>
            <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Newsletter subscription form">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={status === 'sending'}
                style={
                  status === 'success'
                    ? { background: 'linear-gradient(135deg,#10B981,#059669)' }
                    : {}
                }
              >
                {status === 'idle' && (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>Subscribe
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <i className="fas fa-check me-2"></i>Sent Successfully!
                  </>
                )}
              </button>
            </form>
            <p className="mt-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}><i className="fas fa-lock me-2"></i>No spam ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
