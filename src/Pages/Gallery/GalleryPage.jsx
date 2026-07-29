import './GalleryPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithCache } from '../../services/apiCache';

const initialGalleryFallback = [
  { title: 'Maldives Crystal Waters', category: 'beaches', categoryLabel: 'Beaches', image: '/images/pkg-maldives.jpg' },
  { title: 'Swiss Alps Peak', category: 'mountains', categoryLabel: 'Mountains', image: '/images/pkg-swiss.jpg' },
  { title: 'Paris at Night', category: 'cities', categoryLabel: 'Cities', image: '/images/dest-paris.jpg' },
  { title: 'African Safari', category: 'wildlife', categoryLabel: 'Wildlife', image: '/images/pkg-kenya.jpg' },
  { title: 'Luxury Resort Pool', category: 'hotels', categoryLabel: 'Hotels', image: '/images/gal-resort-pool.jpg' },
  { title: 'Alpine Lake Reflection', category: 'mountains', categoryLabel: 'Mountains', image: '/images/dest-switzerland.jpg' },
  { title: 'Dubai Skyline', category: 'cities', categoryLabel: 'Cities', image: '/images/dest-dubai.jpg' },
  { title: 'Bali Rice Terraces', category: 'beaches', categoryLabel: 'Beaches', image: '/images/dest-bali.jpg' },
  { title: 'Private Villa Pool', category: 'hotels', categoryLabel: 'Hotels', image: '/images/pkg-bali-romance.jpg' },
  { title: 'Tokyo Streets', category: 'cities', categoryLabel: 'Cities', image: '/images/dest-japan.jpg' }
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState(initialGalleryFallback);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      const data = await fetchWithCache('/gallery/public', initialGalleryFallback);
      if (data && data.length > 0) {
        setGalleryItems(data);
      }
      setIsLoading(false);
    };
    loadGallery();
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const currentIndex = filteredItems.findIndex(i => (i._id || i.id || i.title) === (lightboxImage?._id || lightboxImage?.id || lightboxImage?.title));

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (filteredItems.length === 0) return;
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxImage(filteredItems[prevIndex]);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (filteredItems.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxImage(filteredItems[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImage) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentIndex, filteredItems]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'beaches', label: 'Beaches' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'cities', label: 'Cities' },
    { id: 'wildlife', label: 'Wildlife' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'adventure', label: 'Adventure' }
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-main.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Gallery hero"
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Gallery</span>
              </div>
              <h1 className="page-hero-title">
                Travel Moments <span style={{ color: '#0EA5E9' }}>Gallery</span>
              </h1>
              <p className="page-hero-subtitle">
                A visual journey through the world's most beautiful destinations captured by our travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-5" aria-label="Photo gallery">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">
              <i className="fas fa-camera me-2"></i>Gallery
            </span>
            <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Captured <span>Moments</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Stunning travel photography from destinations around the world
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" role="tablist" aria-label="Gallery categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                role="tab"
                aria-selected={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Items */}
          <div className="row g-3" id="galleryGrid">
            {filteredItems.map(item => (
              <div key={item.id} className="col-lg-3 col-md-4 col-6 reveal visible" style={{ opacity: 1, transform: 'none' }} data-category={item.category}>
                <div className="gallery-item" onClick={() => setLightboxImage(item)}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="gallery-zoom">
                      <i className="fas fa-search-plus"></i>
                    </div>
                    <div className="gallery-info">
                      <h6>{item.title}</h6>
                      <span>{item.categoryLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED LIGHTBOX MODAL WITH NAVIGATION & FULL INFO */}
      {lightboxImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setLightboxImage(null)}
        >
          {/* Close button */}
          <button
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: 'white',
              fontSize: '1.6rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10000
            }}
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* PREVIOUS BUTTON (LEFT) */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '54px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10000
            }}
            title="Previous Image (Left Arrow)"
          >
            <i className="fas fa-chevron-left fs-4"></i>
          </button>

          {/* NEXT BUTTON (RIGHT) */}
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '54px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10000
            }}
            title="Next Image (Right Arrow)"
          >
            <i className="fas fa-chevron-right fs-4"></i>
          </button>

          {/* LIGHTBOX MAIN CONTENT */}
          <div
            className="d-flex flex-column align-items-center"
            style={{
              position: 'relative',
              maxWidth: '85vw',
              maxHeight: '90vh',
              cursor: 'default'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                borderRadius: '12px',
                objectFit: 'contain',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
            <div
              className="mt-3 text-center text-white"
              style={{ maxWidth: '600px' }}
            >
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <span className="badge bg-primary px-3 py-1-5 rounded-pill text-capitalize" style={{ background: '#0EA5E9' }}>
                  {lightboxImage.categoryLabel || lightboxImage.category}
                </span>
                {lightboxImage.location && (
                  <span className="badge bg-secondary bg-opacity-50 px-3 py-1-5 rounded-pill">
                    <i className="fas fa-map-marker-alt me-1"></i>{lightboxImage.location}
                  </span>
                )}
                <span className="small text-white-50 ms-2">
                  {currentIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h4 className="fw-bold font-playfair text-white mb-1" style={{ fontSize: '1.4rem' }}>{lightboxImage.title}</h4>
              {lightboxImage.description && (
                <p className="small text-white-50 mb-0">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Your Journey <span style={{ color: '#0EA5E9' }}>Could Be Next</span>
            </h2>
            <p className="reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Inspired by what you've seen? Let us craft the perfect trip and add your memories to our gallery.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal visible" style={{ opacity: 1, transform: 'none' }}>
              <Link to="/packages" className="btn-primary-custom">
                <i className="fas fa-suitcase-rolling me-2"></i>Explore Packages
              </Link>
              <Link to="/contact" className="btn-secondary-custom">
                <i className="fas fa-paper-plane me-2"></i>Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
