import './Navbar.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to close mobile Bootstrap navbar on link click
  const closeMobileNavbar = () => {
    const navMenu = document.getElementById('navMenu');
    if (navMenu && navMenu.classList.contains('show')) {
      try {
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navMenu) || new window.bootstrap.Collapse(navMenu);
          if (bsCollapse) bsCollapse.hide();
        } else {
          navMenu.classList.remove('show');
        }
      } catch (e) {
        navMenu.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    closeMobileNavbar();
  }, [location.pathname]);

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

  const handleLogout = () => {
    closeMobileNavbar();
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

  const showNavbarBackground = scrolled || isAboutActive || isDestinationsActive || isPackagesActive || isGalleryActive || isTestimonialsActive || isBlogActive || isFAQActive || isContactActive || location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <nav className={`navbar navbar-custom navbar-expand-lg ${showNavbarBackground ? 'scrolled' : ''}`} id="mainNavbar" role="navigation" aria-label="Main navigation">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMobileNavbar}>
          <div className="brand-icon" aria-hidden="true"><i className="fas fa-globe-americas"></i></div>
          <span className="brand-text">Wander<span>Lux</span></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className={`nav-link ${isHomeActive ? 'active' : ''}`} to="/" onClick={closeMobileNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isAboutActive ? 'active' : ''}`} to="/about" onClick={closeMobileNavbar}>About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isDestinationsActive ? 'active' : ''}`} to="/destinations" onClick={closeMobileNavbar}>Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isPackagesActive ? 'active' : ''}`} to="/packages" onClick={closeMobileNavbar}>Packages</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isGalleryActive ? 'active' : ''}`} to="/gallery" onClick={closeMobileNavbar}>Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isTestimonialsActive ? 'active' : ''}`} to="/testimonials" onClick={closeMobileNavbar}>Testimonials</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isBlogActive ? 'active' : ''}`} to="/blog" onClick={closeMobileNavbar}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isFAQActive ? 'active' : ''}`} to="/faq" onClick={closeMobileNavbar}>FAQ</Link>
            </li>
            {user ? (
              user.role === 'admin' ? (
                <li className="nav-item ms-lg-2 position-relative">
                  <div className="dropdown">
                    <button
                      className="nav-link text-white text-nowrap d-inline-flex align-items-center gap-1.5 px-3 py-1-5 rounded-pill fw-semibold shadow-sm border-0 dropdown-toggle"
                      type="button"
                      id="adminNavDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <i className="fas fa-user-shield me-1"></i>
                      <span>Dashboard</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2" aria-labelledby="adminNavDropdown" style={{ minWidth: '200px' }}>
                      <li className="px-3 py-2 border-bottom mb-1">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Signed in as Admin</small>
                        <strong className="text-dark small d-block">{user.name}</strong>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2" to="/admin/dashboard" onClick={closeMobileNavbar}>
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
                  </div>
                </li>
              ) : (
                <li className="nav-item ms-lg-2 position-relative">
                  <div className="dropdown">
                    <button
                      className="nav-link text-white text-nowrap d-inline-flex align-items-center gap-1.5 px-3 py-1-5 rounded-pill fw-semibold border-0 dropdown-toggle"
                      type="button"
                      id="userNavDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
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
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2" aria-labelledby="userNavDropdown" style={{ minWidth: '200px' }}>
                      <li className="px-3 py-2 border-bottom mb-1">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Signed in as Customer</small>
                        <strong className="text-dark small d-block">{user.name}</strong>
                        <small className="text-muted d-block text-truncate" style={{ fontSize: '0.75rem' }}>{user.email}</small>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2 small fw-semibold d-flex align-items-center gap-2" to="/contact" onClick={closeMobileNavbar}>
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
                  </div>
                </li>
              )
            ) : (
              <li className="nav-item ms-lg-2">
                <Link
                  className="nav-link text-white text-nowrap d-inline-flex align-items-center justify-content-center px-3 py-1-5 rounded-pill fw-semibold"
                  to="/login"
                  onClick={closeMobileNavbar}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className="fas fa-user-circle me-1.5"></i>
                  <span>Sign In</span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link 
                className={`nav-link nav-book-btn text-nowrap d-inline-flex align-items-center justify-content-center ${isContactActive ? 'active' : ''}`} 
                to="/contact"
                onClick={closeMobileNavbar}
                style={{ whiteSpace: 'nowrap' }}
              >
                <i className="fas fa-paper-plane me-1.5"></i>Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
