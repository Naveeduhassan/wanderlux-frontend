import './Packages.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const initialPackages = [
  {
    _id: '1',
    name: 'Maldives Paradise Escape',
    destination: 'Maldives',
    category: 'honeymoon',
    price: 1899,
    priceType: 'per person',
    duration: '6 Days / 5 Nights',
    rating: 5,
    image: '/images/pkg-maldives.jpg',
    badgeText: 'Honeymoon Special',
    description: 'Overwater villa stay with private pool, all-inclusive dining, sunset dolphin cruise, and complimentary spa treatment.',
    features: [
      { icon: 'fas fa-hotel', text: '5-Star Overwater Resort' },
      { icon: 'fas fa-utensils', text: 'All-Inclusive Meals & Drinks' },
      { icon: 'fas fa-plane', text: 'Seaplane Transfers Included' },
      { icon: 'fas fa-spa', text: 'Couples Spa Treatment' }
    ]
  },
  {
    _id: '2',
    name: 'Swiss Alps Scenic Odyssey',
    destination: 'Switzerland',
    category: 'adventure',
    price: 2499,
    priceType: 'per person',
    duration: '8 Days / 7 Nights',
    rating: 5,
    image: '/images/pkg-swiss.jpg',
    badgeText: 'Best Seller',
    description: 'Scenic train journeys on Glacier Express, Jungfraujoch top of Europe excursion, alpine hiking, and luxury mountain lodges.',
    features: [
      { icon: 'fas fa-train', text: 'Glacier Express First Class' },
      { icon: 'fas fa-hotel', text: '4-Star Alpine Hotels' },
      { icon: 'fas fa-ticket-alt', text: 'All Mountain Passes Included' },
      { icon: 'fas fa-user-guide', text: 'Professional Mountain Guide' }
    ]
  },
  {
    _id: '3',
    name: 'Romantic Bali & Tropical Villas',
    destination: 'Bali, Indonesia',
    category: 'romantic',
    price: 1399,
    priceType: 'per person',
    duration: '7 Days / 6 Nights',
    rating: 5,
    image: '/images/pkg-bali-romance.jpg',
    badgeText: 'Top Rated',
    description: 'Private pool villa in Ubud, floating breakfast, beach club VIP passes in Seminyak, and sacred temple tours.',
    features: [
      { icon: 'fas fa-home', text: 'Private Pool Villa Stay' },
      { icon: 'fas fa-coffee', text: 'Daily Floating Breakfast' },
      { icon: 'fas fa-car', text: 'Private Chauffeur & Car' },
      { icon: 'fas fa-umbrella-beach', text: 'VIP Beach Club Access' }
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(initialPackages);

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
        console.error('Error fetching packages background sync:', err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="py-5" id="packages" aria-label="Tour packages preview">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label"><i className="fas fa-suitcase me-2"></i>Packages</span>
          <h2 className="section-title">Our Best <span>Selling Packages</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Carefully curated travel packages for every type of traveler</p>
        </motion.div>

        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {packages.map((pkg) => {
            const displayTitle = pkg.name || pkg.title;
            const displayLocation = pkg.destination || pkg.location;
            const displayDays = pkg.duration || pkg.days;
            const displayPrice = typeof pkg.price === 'number' ? `$${pkg.price}` : pkg.price;
            const displayPriceLabel = pkg.priceType || pkg.priceLabel || 'Per person';

            return (
              <motion.div 
                key={pkg._id || pkg.id || displayTitle} 
                variants={cardVariants} 
                className="col-lg-4 col-md-6"
              >
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)' }}
                  transition={{ duration: 0.3 }}
                  className="package-card h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden border-0 bg-white"
                >
                  <div className="pkg-img position-relative" style={{ height: '220px', overflow: 'hidden' }}>
                    <motion.img 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={pkg.image} 
                      alt={displayTitle} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {(pkg.badgeText || (pkg.badge && pkg.badge.text)) && (
                      <div className="pkg-badge position-absolute top-0 start-0 m-3 px-3 py-1 bg-primary text-white rounded-pill small fw-semibold shadow-sm">
                        {pkg.badgeText || pkg.badge.text}
                      </div>
                    )}
                  </div>
                  <div className="pkg-body p-4 d-flex flex-column flex-grow-1">
                    <div className="pkg-meta d-flex align-items-center justify-content-between text-muted small mb-2">
                      <span><i className="fas fa-map-marker-alt text-primary me-1"></i> {displayLocation}</span>
                      <span><i className="fas fa-clock text-primary me-1"></i> {displayDays}</span>
                    </div>
                    <h3 className="pkg-title h5 fw-bold font-playfair mb-2 text-dark">{displayTitle}</h3>
                    <p className="pkg-desc text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>{pkg.description}</p>
                    
                    <div className="pkg-footer d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                      <div className="pkg-price">
                        <span className="price-val fs-4 fw-bold text-primary">{displayPrice}</span>
                        <span className="price-unit text-muted small ms-1">/ {displayPriceLabel}</span>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        type="button" 
                        onClick={() => handleBookClick(`/contact?package=${encodeURIComponent(displayTitle)}&price=${encodeURIComponent(displayPrice)}`)}
                        className="btn btn-primary-custom rounded-pill px-3 py-2 text-white small fw-semibold border-0"
                        style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}
                      >
                        Book Package
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

export default Packages;
