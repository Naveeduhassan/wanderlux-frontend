import './Navbar.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const exploreRef = useRef(null);
  const userRef = useRef(null);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsExploreOpen(false);
    setIsUserOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setIsExploreOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = async () => {
    setIsUserOpen(false);
    setIsMobileOpen(false);
    try {
      await api.post('/auth/logout').catch(() => null);
    } catch (e) {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const isHomeActive = location.pathname === '/' || location.pathname === '/index.html';
  const isAboutActive = location.pathname === '/about' || location.pathname === '/about.html';
  const isDestinationsActive = location.pathname === '/destinations' || location.pathname === '/destinations.html';
  const isPackagesActive = location.pathname === '/packages' || location.pathname === '/packages.html';
  const isGalleryActive = location.pathname === '/gallery' || location.pathname === '/gallery.html';
  const isTestimonialsActive = location.pathname === '/testimonials' || location.pathname === '/testimonials.html';
  const isBlogActive = location.pathname === '/blog' || location.pathname === '/blog.html';
  const isFAQActive = location.pathname === '/faq' || location.pathname === '/faq.html';
  const isContactActive = location.pathname === '/contact' || location.pathname === '/contact.html';

  const isMoreActive = isAboutActive || isTestimonialsActive || isBlogActive || isFAQActive;
  const showNavbarBackground = scrolled || isAboutActive || isDestinationsActive || isPackagesActive || isGalleryActive || isTestimonialsActive || isBlogActive || isFAQActive || isContactActive || location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      <a href="#main-content" className="visually-hidden-focusable btn btn-sm btn-primary position-absolute top-0 start-0 z-5 m-2 text-white fw-bold">
        Skip to main content
      </a>
      <nav className={`navbar navbar-custom navbar-expand-lg ${showNavbarBackground ? 'scrolled' : ''}`} id="mainNavbar" role="navigation" aria-label="Main navigation">
        <div className="container">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/" onClick={() => setIsMobileOpen(false)} aria-label="WanderLux Travel Agency Home">
          <div className="brand-icon" aria-hidden="true"><i className="fas fa-globe-americas"></i></div>
          <span className="brand-text">Wander<span>Lux</span></span>
        </Link>

        {/* Mobile Navbar Toggler */}
        <button 
          className="navbar-toggler border-0 shadow-none text-white p-2" 
          type="button" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu (Controlled by React State) */}
        <div className={`collapse navbar-collapse ${isMobileOpen ? 'show' : ''}`} id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {/* Primary Links */}
            <li className="nav-item">
              <Link className={`nav-link ${isHomeActive ? 'active' : ''}`} to="/" onClick={() => setIsMobileOpen(false)}>
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isDestinationsActive ? 'active' : ''}`} to="/destinations" onClick={() => setIsMobileOpen(false)}>
                {t('destinations')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isPackagesActive ? 'active' : ''}`} to="/packages" onClick={() => setIsMobileOpen(false)}>
                {t('packages')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isGalleryActive ? 'active' : ''}`} to="/gallery" onClick={() => setIsMobileOpen(false)}>
                {t('gallery')}
              </Link>
            </li>

            {/* Organized "Explore" Dropdown Menu */}
            <li className="nav-item position-relative" ref={exploreRef}>
              <button
                type="button"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className={`nav-link bg-transparent border-0 d-inline-flex align-items-center gap-1 ${isMoreActive ? 'active' : ''}`}
              >
                <span>Explore</span>
                <i className={`fas fa-chevron-down ms-1 style-chevron ${isExploreOpen ? 'rotate-180' : ''}`} style={{ fontSize: '0.7rem' }}></i>
              </button>

              {isExploreOpen && (
                <ul className="dropdown-menu show shadow-lg border-0 rounded-3 p-2 position-absolute" style={{ minWidth: '180px', top: '100%', marginTop: '6px', zIndex: 10000 }}>
                  <li>
                    <Link className={`dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2 ${isAboutActive ? 'active' : ''}`} to="/about" onClick={() => setIsExploreOpen(false)}>
                      <i className="fas fa-info-circle text-info"></i> {t('about')}
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2 ${isTestimonialsActive ? 'active' : ''}`} to="/testimonials" onClick={() => setIsExploreOpen(false)}>
                      <i className="fas fa-star text-warning"></i> {t('testimonials')}
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2 ${isBlogActive ? 'active' : ''}`} to="/blog" onClick={() => setIsExploreOpen(false)}>
                      <i className="fas fa-newspaper text-primary"></i> {t('blog')}
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2 ${isFAQActive ? 'active' : ''}`} to="/faq" onClick={() => setIsExploreOpen(false)}>
                      <i className="fas fa-question-circle text-success"></i> {t('faq')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Language, Currency & Theme Controls */}
            <li className="nav-item ms-lg-2 me-lg-1 my-2 my-lg-0 d-flex align-items-center">
              <LanguageSelector />
            </li>

            {/* User Account / Admin Menu */}
            {user ? (
              user.role === 'admin' ? (
                <li className="nav-item ms-lg-2 position-relative" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserOpen(!isUserOpen)}
                    className="nav-link text-white text-nowrap d-inline-flex align-items-center gap-1.5 px-3 py-1-5 rounded-pill fw-semibold shadow-sm border-0"
                    style={{
                      background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <i className="fas fa-user-shield me-1"></i>
                    <span>Dashboard</span>
                  </button>

                  {isUserOpen && (
                    <ul className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-3 p-2 position-absolute" style={{ minWidth: '200px', right: 0, top: '100%', marginTop: '6px', zIndex: 10000 }}>
                      <li className="px-3 py-2 border-bottom mb-1">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Signed in as Admin</small>
                        <strong className="text-dark small d-block">{user.name}</strong>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2" to="/admin/dashboard" onClick={() => setIsUserOpen(false)}>
                          <i className="fas fa-chart-line text-primary"></i> Admin Dashboard
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-1" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item rounded-2 py-2 small fw-semibold text-danger d-flex align-items-center gap-2">
                          <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className="nav-item ms-lg-2 position-relative" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserOpen(!isUserOpen)}
                    className="nav-link text-white text-nowrap d-inline-flex align-items-center gap-1.5 px-3 py-1-5 rounded-pill fw-semibold border-0"
                    style={{
                      background: 'rgba(14, 165, 233, 0.2)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <i className="fas fa-user-circle text-info me-1"></i>
                    <span>Hi, {user.name?.split(' ')[0] || 'Traveler'}</span>
                  </button>

                  {isUserOpen && (
                    <ul className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-3 p-2 position-absolute" style={{ minWidth: '200px', right: 0, top: '100%', marginTop: '6px', zIndex: 10000 }}>
                      <li className="px-3 py-2 border-bottom mb-1">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Signed in as Customer</small>
                        <strong className="text-dark small d-block">{user.name}</strong>
                        <small className="text-muted d-block text-truncate" style={{ fontSize: '0.75rem' }}>{user.email}</small>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2" to="/contact" onClick={() => setIsUserOpen(false)}>
                          <i className="fas fa-suitcase-rolling text-primary"></i> My Bookings
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-1" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item rounded-2 py-2 small fw-semibold text-danger d-flex align-items-center gap-2">
                          <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )
            ) : (
              <li className="nav-item ms-lg-2">
                <Link
                  className="nav-link text-white text-nowrap d-inline-flex align-items-center justify-content-center px-3 py-1-5 rounded-pill fw-semibold"
                  to="/login"
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className="fas fa-user-circle me-1.5"></i>
                  <span>{t('signIn')}</span>
                </Link>
              </li>
            )}

            {/* CTA Book Now Button */}
            <li className="nav-item ms-lg-1">
              <Link 
                className={`nav-link nav-book-btn text-nowrap d-inline-flex align-items-center justify-content-center ${isContactActive ? 'active' : ''}`} 
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                style={{ whiteSpace: 'nowrap' }}
              >
                <i className="fas fa-paper-plane me-1.5"></i>{t('bookNow')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
