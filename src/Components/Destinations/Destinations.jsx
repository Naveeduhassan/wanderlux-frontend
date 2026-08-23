import './Destinations.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const initialDestinations = [
  {
    _id: '1',
    name: 'Paris',
    location: 'France',
    country: 'France',
    image: '/images/dest-paris.jpg',
    badge: { icon: 'fas fa-fire', text: 'Hot Deal' },
    price: 899,
    description: 'Experience the city of love with iconic landmarks, world-class cuisine, and romantic ambiance.',
    reviews: 1245,
    rating: 5,
    duration: '7 Days'
  },
  {
    _id: '2',
    name: 'Dubai',
    location: 'United Arab Emirates',
    country: 'United Arab Emirates',
    image: '/images/dest-dubai.jpg',
    badge: { icon: 'fas fa-gem', text: 'Luxury' },
    price: 1299,
    description: 'Explore modern marvels, luxury shopping, desert safaris, and stunning architecture.',
    reviews: 987,
    rating: 5,
    duration: '5 Days'
  },
  {
    _id: '3',
    name: 'Switzerland',
    location: 'Switzerland',
    country: 'Switzerland',
    image: '/images/dest-switzerland.jpg',
    badge: { icon: 'fas fa-mountain', text: 'Adventure' },
    price: 1599,
    description: 'Majestic Alps, pristine lakes, charming villages, and unforgettable scenic train journeys.',
    reviews: 1543,
    rating: 5,
    duration: '8 Days'
  },
  {
    _id: '4',
    name: 'Istanbul, Turkey',
    location: 'Turkey',
    country: 'Turkey',
    image: '/images/dest-turkey.jpg',
    badge: { icon: 'fas fa-certificate', text: 'Best Value' },
    price: 749,
    description: 'Where East meets West. Rich history, vibrant bazaars, stunning mosques, and Bosphorus cruises.',
    reviews: 823,
    rating: 5,
    duration: '6 Days'
  },
  {
    _id: '5',
    name: 'Bali',
    location: 'Indonesia',
    country: 'Indonesia',
    image: '/images/dest-bali.jpg',
    badge: { icon: 'fas fa-heart', text: 'Popular' },
    price: 999,
    description: 'Tropical paradise with lush rice terraces, sacred temples, vibrant culture, and pristine beaches.',
    reviews: 1102,
    rating: 5,
    duration: '7 Days'
  },
  {
    _id: '6',
    name: 'Santorini',
    location: 'Greece',
    country: 'Greece',
    image: '/images/dest-santorini.jpg',
    badge: { icon: 'fas fa-sun', text: 'Romantic' },
    price: 1199,
    description: 'Iconic whitewashed buildings, blue-domed churches, dramatic caldera views, and stunning sunsets.',
    reviews: 754,
    rating: 5,
    duration: '6 Days'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState(initialDestinations);

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
        console.error('Error fetching destinations background sync:', err);
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
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label"><i className="fas fa-globe-americas me-2"></i>Destinations</span>
          <h2 className="section-title">Top Travel <span>Destinations</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Discover the world's most breathtaking destinations handpicked by travel experts</p>
        </motion.div>

        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {destinations.map((dest) => {
            const displayPrice = typeof dest.price === 'number' ? `$${dest.price}` : dest.price;
            const badgeIcon = dest.badgeIcon || (dest.badge && dest.badge.icon) || 'fas fa-fire';
            const badgeText = dest.badgeText || (dest.badge && dest.badge.text) || '';

            return (
              <motion.div 
                key={dest._id || dest.id || dest.name} 
                variants={cardVariants} 
                className="col-lg-4 col-md-6"
              >
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)' }}
                  transition={{ duration: 0.3 }}
                  className="destination-card h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden border-0" 
                  style={{ background: '#FFFFFF' }}
                >
                  <div className="card-img-wrap position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                    <motion.img 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={dest.image} 
                      alt={dest.name} 
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {badgeText && (
                      <div className="card-badge position-absolute top-0 start-0 m-3 px-3 py-1.5 bg-primary text-white rounded-pill small fw-semibold shadow-sm">
                        <i className={`${badgeIcon} me-1`}></i> {badgeText}
                      </div>
                    )}
                    <div className="price-tag position-absolute bottom-0 end-0 m-3 px-3 py-1 bg-dark bg-opacity-75 text-white rounded-pill fw-bold small">
                      From {displayPrice}
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <div className="card-location text-primary small fw-semibold mb-1">
                      <i className="fas fa-map-marker-alt me-1"></i> {dest.country}
                    </div>
                    <h3 className="card-title h5 fw-bold font-playfair mb-2" style={{ color: '#0F172A' }}>{dest.name}</h3>
                    <p className="card-desc text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>{dest.description}</p>
                    
                    <div className="card-rating d-flex align-items-center justify-content-between mb-3 pt-2 border-top">
                      <div className="d-flex align-items-center gap-1 text-warning small">
                        {renderStars(dest.rating || 5)}
                        <span className="fw-bold text-dark ms-1">{dest.rating || '5.0'}</span>
                      </div>
                      <span className="count text-muted small">({(dest.reviews || 40).toLocaleString()} reviews)</span>
                    </div>

                    <div className="d-flex gap-2">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button" 
                        onClick={() => navigate(`/destinations?search=${encodeURIComponent(dest.name)}`)} 
                        className="btn btn-outline-secondary flex-fill rounded-pill py-2 small fw-semibold d-flex align-items-center justify-content-center gap-1"
                      >
                        <i className="fas fa-info-circle"></i> View Details
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleBookClick(`/contact?destination=${encodeURIComponent(dest.name)}&price=${encodeURIComponent(displayPrice)}`)}
                        className="btn btn-primary-custom flex-fill rounded-pill py-2 text-white small fw-semibold d-flex align-items-center justify-content-center gap-1 border-0"
                        style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}
                      >
                        <i className="fas fa-paper-plane"></i> Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;
