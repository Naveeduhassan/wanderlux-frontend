import './DestinationsPage.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchWithCache } from '../../services/apiCache';
import toast from 'react-hot-toast';

const initialDestinationsFallback = [
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

const DestinationsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search') || '';
  const dateQuery = searchParams.get('date') || '';
  const travelersQuery = searchParams.get('travelers') || '1';

  const [destinations, setDestinations] = useState(initialDestinationsFallback);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestModal, setSelectedDestModal] = useState(null);

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
    const loadDestinations = async () => {
      const data = await fetchWithCache('/destinations/public', initialDestinationsFallback);
      if (data && data.length > 0) {
        setDestinations(data);
      }
      setIsLoading(false);
    };
    loadDestinations();
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
    return <div className="stars d-inline-flex gap-1">{stars}</div>;
  };

  // Filter destinations based on search query
  const filteredDestinations = searchQuery
    ? destinations.filter((dest) => {
        const q = searchQuery.toLowerCase();
        return (
          dest.name?.toLowerCase().includes(q) ||
          dest.country?.toLowerCase().includes(q) ||
          dest.description?.toLowerCase().includes(q)
        );
      })
    : destinations;

  const clearSearchFilter = () => {
    setSearchParams({});
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-destinations.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Destinations hero">
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Destinations</span>
              </div>
              <h1 className="page-hero-title">Explore Global <span style={{ color: '#0EA5E9' }}>Destinations</span></h1>
              <p className="page-hero-subtitle">Handpicked tropical paradises, historic capitals, and spectacular natural wonders waiting for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL DESTINATIONS GRID */}
      <section className="py-5 bg-light" id="destinations" aria-label="Destinations catalog">
        <div className="container">
          <div className="section-header center mb-4">
            <span className="section-label"><i className="fas fa-compass me-2"></i>Handpicked Destinations</span>
            <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Unforgettable Places To Visit'}
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Click on any destination to view comprehensive tour details, itineraries, and booking information.
            </p>
          </div>

          {/* ACTIVE SEARCH FILTER BANNER */}
          {(searchQuery || dateQuery || travelersQuery !== '1') && (
            <div className="alert bg-white border shadow-sm rounded-4 p-3 mb-5 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-2">
                <div className="badge bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                  <i className="fas fa-search text-white"></i>
                </div>
                <div>
                  <strong className="text-dark">Active Route Search Filter:</strong>
                  <span className="text-muted ms-2 small">
                    {searchQuery && <span>Destination: <strong>"{searchQuery}"</strong> </span>}
                    {dateQuery && <span className="ms-2">Date: <strong>{dateQuery}</strong> </span>}
                    {travelersQuery && <span className="ms-2">Travelers: <strong>{travelersQuery}</strong></span>}
                  </span>
                </div>
              </div>
              <button 
                onClick={clearSearchFilter}
                className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-semibold d-flex align-items-center gap-1"
              >
                <i className="fas fa-times-circle"></i> Clear Filter &amp; View All
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
              <p className="text-muted mt-3">Loading destinations...</p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
              <i className="fas fa-search-location text-muted display-4 mb-3" style={{ opacity: 0.5 }}></i>
              <h4 className="fw-bold text-dark font-playfair mb-2">No Matching Destinations Found</h4>
              <p className="text-muted max-w-md mx-auto mb-4">We couldn't find any destination matching "{searchQuery}". Try searching another keyword or view all destinations.</p>
              <button onClick={clearSearchFilter} className="btn btn-primary-custom px-4 rounded-pill border-0 text-white">
                View All Destinations
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredDestinations.map((dest) => {
                const displayPrice = typeof dest.price === 'number' ? `$${dest.price}` : dest.price;
                const badgeIcon = dest.badgeIcon || (dest.badge && dest.badge.icon) || 'fas fa-fire';
                const badgeText = dest.badgeText || (dest.badge && dest.badge.text) || '';

                const bookTarget = `/contact?destination=${encodeURIComponent(dest.name)}&price=${encodeURIComponent(displayPrice)}` + 
                  (dateQuery ? `&date=${encodeURIComponent(dateQuery)}` : '') + 
                  (travelersQuery ? `&travelers=${encodeURIComponent(travelersQuery)}` : '');

                return (
                  <div key={dest._id || dest.id || dest.name} className="col-lg-4 col-md-6 reveal visible" style={{ opacity: 1, transform: 'none' }}>
                    <div className="destination-card h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden border-0" style={{ background: '#FFFFFF' }}>
                      <div className="card-img-wrap position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                        <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                          <button 
                            type="button" 
                            onClick={() => setSelectedDestModal(dest)} 
                            className="btn btn-outline-secondary flex-fill rounded-pill py-2 small fw-semibold d-flex align-items-center justify-content-center gap-1"
                          >
                            <i className="fas fa-info-circle"></i> View Details
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleBookClick(bookTarget)}
                            className="btn btn-primary-custom flex-fill rounded-pill py-2 text-white small fw-semibold d-flex align-items-center justify-content-center gap-1 border-0"
                            style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}
                          >
                            <i className="fas fa-paper-plane"></i> Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ENHANCED DETAILS MODAL */}
      {selectedDestModal && (
        <div 
          className="position-fixed inset-0 d-flex align-items-center justify-content-center p-3" 
          style={{ 
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 10000, 
            background: 'rgba(15, 23, 42, 0.75)', 
            backdropFilter: 'blur(8px)' 
          }}
          onClick={() => setSelectedDestModal(null)}
        >
          <div 
            className="card border-0 shadow-2xl rounded-4 overflow-hidden w-100 modal-custom-scrollbar" 
            style={{ maxWidth: '680px', maxHeight: '88vh', background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HERO BANNER */}
            <div className="position-relative" style={{ height: '280px' }}>
              <img 
                src={selectedDestModal.image} 
                alt={selectedDestModal.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)' }} />
              
              <button 
                onClick={() => setSelectedDestModal(null)}
                className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center shadow"
                style={{ width: '38px', height: '38px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <i className="fas fa-times text-white"></i>
              </button>

              <div className="position-absolute bottom-0 start-0 p-4 text-white">
                <span className="badge bg-info text-dark px-3 py-1.5 rounded-pill mb-2 fw-semibold">
                  <i className="fas fa-map-marker-alt me-1"></i> {selectedDestModal.country}
                </span>
                <h2 className="mb-1 fw-bold font-playfair text-white fs-2">{selectedDestModal.name}</h2>
                <small className="text-white-50"><i className="fas fa-globe me-1"></i> {selectedDestModal.location || selectedDestModal.country}</small>
              </div>
            </div>

            {/* CONTENT BODY */}
            <div className="p-4">
              {/* RATING & PRICE BAR */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex text-warning fs-5">
                    {renderStars(selectedDestModal.rating || 5)}
                  </div>
                  <span className="fw-bold text-dark fs-5 ms-1">{selectedDestModal.rating || '5.0'}</span>
                  <span className="text-muted small">({(selectedDestModal.reviews || 40).toLocaleString()} Verified Reviews)</span>
                </div>
                <div className="text-end">
                  <span className="text-muted small d-block">Starting From</span>
                  <span className="fs-3 fw-bold text-primary" style={{ color: '#0EA5E9' }}>
                    {typeof selectedDestModal.price === 'number' ? `$${selectedDestModal.price}` : selectedDestModal.price}
                  </span>
                </div>
              </div>

              {/* SPECIFICATION BADGES GRID */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-clock text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Duration</span>
                    <strong className="text-dark small">{selectedDestModal.duration || '5 Days / 4 Nights'}</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-flag text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Country</span>
                    <strong className="text-dark small">{selectedDestModal.country}</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-user-check text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Guided Tour</span>
                    <strong className="text-dark small">Included</strong>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center bg-light border">
                    <i className="fas fa-shield-alt text-primary fs-4 mb-1" style={{ color: '#0EA5E9' }}></i>
                    <span className="d-block small text-muted">Safety</span>
                    <strong className="text-dark small">Verified</strong>
                  </div>
                </div>
              </div>

              {/* OVERVIEW & DESCRIPTION */}
              <div className="mb-4 p-3 rounded-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <h5 className="fw-bold font-playfair text-dark mb-2 d-flex align-items-center gap-2">
                  <i className="fas fa-quote-left text-info" style={{ fontSize: '1rem' }}></i> Overview &amp; Experience
                </h5>
                <p className="text-secondary leading-relaxed mb-0" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                  {selectedDestModal.description}
                </p>
              </div>

              {/* INCLUDED AMENITIES */}
              <div className="mb-4">
                <h6 className="fw-bold font-playfair text-dark mb-2">Tour Highlights &amp; Inclusions</h6>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill"><i className="fas fa-hotel text-primary me-1.5"></i> 4/5-Star Hotel Accommodations</span>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill"><i className="fas fa-utensils text-primary me-1.5"></i> Daily Breakfast Included</span>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill"><i className="fas fa-bus text-primary me-1.5"></i> Airport Transfers &amp; Sightseeing</span>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill"><i className="fas fa-headset text-primary me-1.5"></i> 24/7 Dedicated Support</span>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="d-flex gap-3 justify-content-end pt-3 border-top">
                <button type="button" onClick={() => setSelectedDestModal(null)} className="btn btn-outline-secondary px-4 rounded-pill">Close</button>
                <button 
                  type="button"
                  onClick={() => {
                    const target = `/contact?destination=${encodeURIComponent(selectedDestModal.name)}&price=${encodeURIComponent(typeof selectedDestModal.price === 'number' ? `$${selectedDestModal.price}` : selectedDestModal.price)}` +
                      (dateQuery ? `&date=${encodeURIComponent(dateQuery)}` : '') + 
                      (travelersQuery ? `&travelers=${encodeURIComponent(travelersQuery)}` : '');
                    handleBookClick(target);
                  }} 
                  className="btn btn-primary-custom px-4 rounded-pill text-white border-0 d-flex align-items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)' }}
                >
                  <i className="fas fa-paper-plane"></i> Book Destination
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationsPage;
