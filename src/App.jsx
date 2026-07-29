import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import BackToTop from './Components/BackToTop/BackToTop';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

// Lazy loading route components for code splitting & performance optimization
const HomePage = lazy(() => import('./Pages/Home/HomePage'));
const AboutPage = lazy(() => import('./Pages/About/AboutPage'));
const DestinationsPage = lazy(() => import('./Pages/Destinations/DestinationsPage'));
const PackagesPage = lazy(() => import('./Pages/Packages/PackagesPage'));
const GalleryPage = lazy(() => import('./Pages/Gallery/GalleryPage'));
const TestimonialsPage = lazy(() => import('./Pages/Testimonials/TestimonialsPage'));
const BlogPage = lazy(() => import('./Pages/Blog/BlogPage'));
const FAQPage = lazy(() => import('./Pages/FAQ/FAQPage'));
const ContactPage = lazy(() => import('./Pages/Contact/ContactPage'));
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));

// Page loading fallback component
function PageLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-slate-900">
      <div className="text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3 mb-0 small">Loading WanderLux...</p>
      </div>
    </div>
  );
}

// Helper component to handle smooth hash scrolling across pages
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

// Helper component to initialize and re-bind scroll reveals and parallax with requestAnimationFrame throttling
function ScrollRevealHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroBg = document.querySelector('.hero-bg');
          if (heroBg) {
            heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    reveals.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      reveals.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#0F172A',
            color: '#FFFFFF',
            fontSize: '0.9rem',
            padding: '12px 18px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          },
        }}
      />
      <ScrollToHashElement />
      <ScrollRevealHandler />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* Fallback Legacy HTML Routes */}
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/destinations.html" element={<DestinationsPage />} />
          <Route path="/packages.html" element={<PackagesPage />} />
          <Route path="/gallery.html" element={<GalleryPage />} />
          <Route path="/testimonials.html" element={<TestimonialsPage />} />
          <Route path="/blog.html" element={<BlogPage />} />
          <Route path="/faq.html" element={<FAQPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="/login.html" element={<LoginPage />} />
          <Route 
            path="/admin/dashboard.html" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
