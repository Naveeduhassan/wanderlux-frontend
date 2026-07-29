import './Packages.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBookClick = (targetUrl) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('🔒 Please sign in or create an account to book your trip.');
      navigate(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    } else {
      navigate(targetUrl);
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages/public');
        if (res.data && res.data.length > 0) {
          setPackages(res.data);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="py-5" id="packages" aria-label="Tour packages preview">
      <div className="container">
        <div className="section-header center">
          <span className="section-label"><i className="fas fa-suitcase me-2"></i>Packages</span>
          <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>Our Best <span>Selling Packages</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>Carefully curated travel packages for every type of traveler</p>
        </div>
        <div className="row g-4">
          {packages.map((pkg) => {
            const displayTitle = pkg.name || pkg.title;
            const displayLocation = pkg.destination || pkg.location;
            const displayDays = pkg.duration || pkg.days;
            const displayPrice = typeof pkg.price === 'number' ? `$${pkg.price}` : pkg.price;
            const displayPriceLabel = pkg.priceType || pkg.priceLabel || 'Per person';

            return (
              <div key={pkg._id || pkg.id || displayTitle} className="col-lg-4 col-md-6">
                <div className="package-card h-100 d-flex flex-column">
                  <div className="pkg-img">
                    <img src={pkg.image} alt={displayTitle} />
                    {pkg.badgeText && <div className="pkg-badge">{pkg.badgeText}</div>}
                  </div>
                  <div className="pkg-body d-flex flex-column flex-grow-1">
                    <div className="pkg-meta">
                      <span><i className="fas fa-clock"></i> {displayDays}</span>
                      <span><i className="fas fa-map-marker-alt"></i> {displayLocation}</span>
                      <span><i className="fas fa-star" style={{ color: '#F59E0B' }}></i> {pkg.rating || '4.9'}</span>
                    </div>
                    <h4 className="pkg-title">{displayTitle}</h4>
                    <p className="pkg-desc">{pkg.description}</p>
                    {pkg.features && pkg.features.length > 0 && (
                      <div className="pkg-features">
                        {pkg.features.map((feature, idx) => {
                          const featText = typeof feature === 'string' ? feature : feature.text;
                          const featIcon = typeof feature === 'object' ? feature.icon : (pkg.featureIcons ? pkg.featureIcons[idx] : 'fas fa-check');
                          return (
                            <span key={idx} className="pkg-feature">
                              <i className={featIcon}></i> {featText}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <div className="pkg-footer gap-2 flex-wrap">
                      <div className="pkg-price me-auto">
                        <span>{displayPriceLabel}</span>
                        <strong>{displayPrice}</strong>
                      </div>
                      <Link to="/packages" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1-5 text-nowrap" style={{ fontSize: '0.8rem' }}>
                        <i className="fas fa-info-circle me-1"></i>Details
                      </Link>
                      <button 
                        type="button"
                        onClick={() => handleBookClick(`/contact?package=${encodeURIComponent(displayTitle)}&destination=${encodeURIComponent(displayLocation)}&price=${encodeURIComponent(displayPrice)}`)}
                        className="btn-primary-custom text-nowrap border-0" 
                        style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-5">
          <Link to="/packages" className="btn-outline-primary"><i className="fas fa-suitcase me-2"></i> View All Packages</Link>
        </div>
      </div>
    </section>
  );
};

export default Packages;
