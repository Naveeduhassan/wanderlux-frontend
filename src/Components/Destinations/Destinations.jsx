import './Destinations.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
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
    const fetchDestinations = async () => {
      try {
        const res = await api.get('/destinations/public');
        if (res.data && res.data.length > 0) {
          setDestinations(res.data);
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const renderStars = (rating = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      }
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <section className="py-5" id="destinations" aria-label="Popular destinations">
      <div className="container">
        <div className="section-header center">
          <span className="section-label"><i className="fas fa-globe-americas me-2"></i>Destinations</span>
          <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>Top Travel <span>Destinations</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>Discover the world's most breathtaking destinations handpicked by travel experts</p>
        </div>
        <div className="row g-4">
          {destinations.map((dest) => {
            const displayPrice = typeof dest.price === 'number' ? `$${dest.price}` : dest.price;
            const badgeIcon = dest.badgeIcon || (dest.badge && dest.badge.icon) || 'fas fa-fire';
            const badgeText = dest.badgeText || (dest.badge && dest.badge.text) || '';

            return (
              <div key={dest._id || dest.id || dest.name} className="col-lg-3 col-md-6 reveal visible" style={{ opacity: 1, transform: 'none' }}>
                <div className="destination-card h-100 d-flex flex-column">
                  <div className="card-img-wrap">
                    <img src={dest.image} alt={dest.name} />
                    {badgeText && (
                      <div className="card-badge">
                        <i className={badgeIcon}></i> {badgeText}
                      </div>
                    )}
                    <div className="price-tag">From {displayPrice}</div>
                  </div>
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <div className="card-location"><i className="fas fa-map-marker-alt"></i> {dest.country}</div>
                    <h3 className="card-title">{dest.name}</h3>
                    <p className="card-desc">{dest.description}</p>
                    <div className="card-rating">
                      {renderStars(dest.rating || 5)}
                      <span className="count">({(dest.reviews || 40).toLocaleString()} reviews)</span>
                    </div>
                    <div className="card-footer-custom gap-2 flex-wrap">
                      <Link to="/destinations" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1-5 text-nowrap" style={{ fontSize: '0.8rem' }}>
                        <i className="fas fa-info-circle me-1"></i>Details
                      </Link>
                      <button 
                        type="button"
                        onClick={() => handleBookClick(`/contact?destination=${encodeURIComponent(dest.name)}&price=${encodeURIComponent(displayPrice)}`)}
                        className="btn-outline-primary text-nowrap border-0" 
                        style={{ padding: '6px 16px', fontSize: '0.85rem' }}
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
          <Link to="/destinations" className="btn-accent"><i className="fas fa-map-marked-alt me-2"></i> View All Destinations</Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
