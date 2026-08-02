import './PackagesPage.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchWithCache } from '../../services/apiCache';
import toast from 'react-hot-toast';
import PageTransition from '../../Components/PageTransition/PageTransition';

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

const initialPackagesFallback = [
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

const PackagesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [packages, setPackages] = useState(initialPackagesFallback);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPkgModal, setSelectedPkgModal] = useState(null);

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
    const loadPackages = async () => {
      const data = await fetchWithCache('/packages/public', initialPackagesFallback);
      if (data && data.length > 0) {
        setPackages(data);
      }
      setIsLoading(false);
    };
    loadPackages();
  }, []);

  const categories = [
    { id: 'all', label: 'All Packages', icon: 'fas fa-th-large' },
    { id: 'honeymoon', label: 'Honeymoon & Romantic', icon: 'fas fa-heart' },
    { id: 'family', label: 'Family Vacation', icon: 'fas fa-users' },
    { id: 'adventure', label: 'Adventure & Trekking', icon: 'fas fa-hiking' },
    { id: 'luxury', label: 'Luxury & Spa', icon: 'fas fa-crown' },
  ];

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(p => p.category === selectedCategory || (p.badgeText || '').toLowerCase().includes(selectedCategory));

  return (
    <PageTransition>
      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-packages.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Packages hero">
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Packages</span>
              </div>
              <h1 className="page-hero-title">Curated Travel <span style={{ color: '#0EA5E9' }}>Packages</span></h1>
              <p className="page-hero-subtitle">All-inclusive tour itineraries designed for honeymooners, families, adventurers, and luxury travelers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & PACKAGES SECTION */}
      <section className="py-5 bg-light" id="packages" aria-label="Packages catalog">
        <div className="container">
          <div className="section-header center mb-4">
            <span className="section-label"><i className="fas fa-suitcase me-2"></i>Best Deals</span>
            <h2 className="section-title">Choose Your <span>Ideal Package</span></h2>
            <div className="section-divider"></div>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn rounded-pill px-4 py-2 small fw-semibold transition-all ${selectedCategory === cat.id ? 'btn-primary text-white shadow-sm' : 'btn-outline-secondary bg-white'}`}
                style={selectedCategory === cat.id ? { background: 'linear-gradient(135deg, #0EA5E9, #2563EB)', border: 'none' } : { color: '#475569' }}
              >
                <i className={`${cat.icon} me-1.5`}></i> {cat.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
              <p className="text-muted mt-3">Loading packages...</p>
            </div>
          ) : (
            <motion.div 
              className="row g-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {filteredPackages.map((pkg) => {
                const displayTitle = pkg.name || pkg.title;
                const displayLocation = pkg.destination || pkg.location;
                const displayDays = pkg.duration || pkg.days;
                const displayPrice = typeof pkg.price === 'number' ? `$${pkg.price}` : pkg.price;
                const displayPriceLabel = pkg.priceType || pkg.priceLabel || 'Per person';

                return (
                  <div key={pkg._id || pkg.id || displayTitle} className="col-lg-4 col-md-6">
                    <div className="package-card h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden border-0 bg-white">
                      <div className="pkg-img position-relative" style={{ height: '230px' }}>
                        <img src={pkg.image} alt={displayTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {pkg.badgeText && (
                          <div className="pkg-badge position-absolute top-0 start-0 m-3 px-3 py-1 bg-primary text-white rounded-pill small fw-semibold">
                            {pkg.badgeText}
                          </div>
                        )}
                      </div>
                      <div className="pkg-body p-4 d-flex flex-column flex-grow-1">
                        <div className="pkg-meta d-flex align-items-center gap-3 text-muted small mb-2">
                          <span><i className="fas fa-clock text-primary me-1"></i> {displayDays}</span>
                          <span><i className="fas fa-map-marker-alt text-primary me-1"></i> {displayLocation}</span>
                          <span><i className="fas fa-star text-warning me-1"></i> {pkg.rating || '4.9'}</span>
                        </div>

                        <h4 className="pkg-title h5 fw-bold font-playfair mb-2" style={{ color: '#0F172A' }}>{displayTitle}</h4>
                        <p className="pkg-desc text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>{pkg.description}</p>

                        <div className="pkg-footer d-flex align-items-center justify-content-between pt-3 border-top gap-2 flex-wrap">
                          <div className="pkg-price">
                            <span className="small text-muted d-block">{displayPriceLabel}</span>
                            <strong className="fs-4 text-primary" style={{ color: '#0EA5E9' }}>{displayPrice}</strong>
                          </div>
                          <div className="d-flex gap-2">
                            <button 
                              type="button" 
                              onClick={() => setSelectedPkgModal(pkg)}
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1-5 text-nowrap small fw-semibold"
                            >
                              <i className="fas fa-info-circle me-1"></i> Details
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleBookClick(`/contact?package=${encodeURIComponent(displayTitle)}&destination=${encodeURIComponent(displayLocation)}&price=${encodeURIComponent(displayPrice)}`)}
                              className="btn btn-sm btn-primary-custom rounded-pill px-3 py-1-5 text-white text-nowrap small fw-semibold border-0"
                              style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ENHANCED PACKAGE DETAILS MODAL */}
      {selectedPkgModal && (
        <div 
          className="position-fixed inset-0 d-flex align-items-center justify-content-center p-3" 
          style={{ 
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 10000, 
            background: 'rgba(15, 23, 42, 0.75)', 
            backdropFilter: 'blur(8px)' 
          }}
          onClick={() => setSelectedPkgModal(null)}
        >
          <div 
            className="card border-0 shadow-2xl rounded-4 overflow-hidden w-100 modal-custom-scrollbar" 
            style={{ maxWidth: '680px', maxHeight: '88vh', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HERO BANNER */}
            <div className="position-relative" style={{ height: '260px' }}>
              <img 
                src={selectedPkgModal.image} 
                alt={selectedPkgModal.name || selectedPkgModal.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)' }} />
              
              <button 
                onClick={() => setSelectedPkgModal(null)}
                className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center shadow"
                style={{ width: '38px', height: '38px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <i className="fas fa-times text-white"></i>
              </button>

              <div className="position-absolute bottom-0 start-0 p-4 text-white">
                {(selectedPkgModal.badgeText || (selectedPkgModal.badge && selectedPkgModal.badge.text)) && (
                  <span className="badge bg-info text-dark px-3 py-1.5 rounded-pill mb-2 fw-semibold">
                    {selectedPkgModal.badgeText || selectedPkgModal.badge.text}
                  </span>
                )}
                <h2 className="mb-1 fw-bold font-playfair text-white fs-2">{selectedPkgModal.name || selectedPkgModal.title}</h2>
                <small className="text-white-50"><i className="fas fa-map-marker-alt me-1"></i> {selectedPkgModal.destination || selectedPkgModal.location}</small>
              </div>
            </div>

            {/* CONTENT BODY */}
            <div className="p-4">
              {/* RATING & PRICE BAR */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex text-warning fs-5">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="fw-bold text-dark fs-5 ms-1">{selectedPkgModal.rating || '5.0'}</span>
                  <span className="text-muted small">({(selectedPkgModal.reviews || 85).toLocaleString()} Verified Bookings)</span>
                </div>
                <div className="text-end">
                  <span className="text-muted small d-block">Package Price</span>
                  <span className="fs-3 fw-bold text-primary" style={{ color: '#0EA5E9' }}>
                    {typeof selectedPkgModal.price === 'number' ? `$${selectedPkgModal.price}` : selectedPkgModal.price}
                  </span>
                  <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>/ {selectedPkgModal.priceType || 'per person'}</small>
                </div>
              </div>

              {/* SPECIFICATION BADGES GRID */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-clock text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Duration</span>
                    <strong className="text-dark small">{selectedPkgModal.duration || selectedPkgModal.days}</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-map-marked-alt text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Destination</span>
                    <strong className="text-dark small">{selectedPkgModal.location || selectedPkgModal.destination}</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-utensils text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Meals</span>
                    <strong className="text-dark small">Daily Breakfast</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-concierge-bell text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Support</span>
                    <strong className="text-dark small">24/7 Concierge</strong>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION BOX */}
              <div className="mb-4 p-3 rounded-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h5 className="fw-bold font-playfair text-dark mb-2 d-flex align-items-center gap-2">
                  <i className="fas fa-suitcase text-info" style={{ fontSize: '1rem' }}></i> Package Description
                </h5>
                <p className="text-secondary leading-relaxed mb-0" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                  {selectedPkgModal.description}
                </p>
              </div>

              {/* INCLUDED FEATURES */}
              {selectedPkgModal.features && selectedPkgModal.features.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold font-playfair text-dark mb-3">Included Features &amp; Amenities</h6>
                  <div className="row g-2">
                    {selectedPkgModal.features.map((feat, idx) => {
                      const featText = typeof feat === 'string' ? feat : feat.text;
                      const featIcon = typeof feat === 'object' ? feat.icon : 'fas fa-check-circle';
                      return (
                        <div key={idx} className="col-sm-6">
                          <div className="p-2.5 rounded-3 bg-light border d-flex align-items-center gap-2">
                            <i className={`${featIcon} text-primary fs-6`} style={{ color: '#0EA5E9' }}></i>
                            <span className="small text-dark fw-semibold">{featText}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="d-flex gap-3 justify-content-end pt-3 border-top">
                <button type="button" onClick={() => setSelectedPkgModal(null)} className="btn btn-outline-secondary px-4 rounded-pill">Close</button>
                <button 
                  type="button"
                  onClick={() => {
                    const target = `/contact?package=${encodeURIComponent(selectedPkgModal.name || selectedPkgModal.title)}&destination=${encodeURIComponent(selectedPkgModal.location || selectedPkgModal.destination)}&price=${encodeURIComponent(typeof selectedPkgModal.price === 'number' ? `$${selectedPkgModal.price}` : selectedPkgModal.price)}`;
                    handleBookClick(target);
                  }} 
                  className="btn btn-primary-custom px-4 rounded-pill text-white border-0 d-flex align-items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)' }}
                >
                  <i className="fas fa-paper-plane"></i> Book Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default PackagesPage;
