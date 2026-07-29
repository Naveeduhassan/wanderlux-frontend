import './LoginPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { validateEmail } from '../../utils/validation';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, User, UserPlus, 
  LogIn, Laptop, RefreshCw, Star, CheckCircle2, Sparkles, X, Globe
} from 'lucide-react';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectPath = searchParams.get('redirect') || '/';

  // Mode states: 'login' | 'register' | 'admin'
  const [mode, setMode] = useState('login');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminDevice, setIsAdminDevice] = useState(false);

  // Quick Google Sim Modal state
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [quickGoogleEmail, setQuickGoogleEmail] = useState('traveler@gmail.com');

  // Check Passport Google OAuth token redirect from URL params on mount
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const userParam = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      toast.error('Google authentication failed. Please try again.');
    } else if (tokenParam && userParam) {
      try {
        const decodedUser = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('token', tokenParam);
        localStorage.setItem('user', JSON.stringify(decodedUser));
        toast.success(`Welcome back, ${decodedUser.name}! Signed in via Google.`);
        window.dispatchEvent(new Event('storage'));
        navigate(redirectPath);
      } catch (err) {
        console.error('OAuth callback parsing error:', err);
      }
    }

    // Check device admin status
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isFlaggedDevice = localStorage.getItem('wanderlux_admin_device') === 'true';
    if (isLocalhost || isFlaggedDevice) {
      setIsAdminDevice(true);
    }
  }, [searchParams, navigate, redirectPath]);

  // Auto-fill admin credentials
  const autoFillAdmin = () => {
    setMode('admin');
    setEmail('admin@wanderlux.com');
    setPassword('adminpassword');
    toast.success('Admin credentials loaded');
  };

  // Submit Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Handle Admin role
      if (user.role === 'admin') {
        localStorage.setItem('wanderlux_admin_device', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Welcome back, ${user.name}! Admin dashboard ready.`);
        window.dispatchEvent(new Event('storage'));
        navigate('/admin/dashboard');
        return;
      }

      // If non-admin attempted admin mode
      if (mode === 'admin' && user.role !== 'admin') {
        toast.error('⛔ Access Denied: Administrator permissions required.');
        setIsLoading(false);
        return;
      }

      // Regular User Login
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}! You are now signed in.`);
      window.dispatchEvent(new Event('storage'));
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      const msg = error.response?.data?.message || 'Login failed. Invalid email or password.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit User Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields (Name, Email, Password)');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Account created successfully! Welcome to WanderLux, ${user.name}.`);
      window.dispatchEvent(new Event('storage'));
      navigate(redirectPath);
    } catch (error) {
      console.error('Registration error:', error);
      const msg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Passport Google OAuth Initiation
  const handlePassportGoogleLogin = () => {
    const backendUrl = api.defaults.baseURL || 'https://wanderlux-backend.onrender.com';
    window.location.href = `${backendUrl}/auth/google`;
  };

  // Quick Google Auth Submit
  const handleQuickGoogleSimSubmit = async (e) => {
    e.preventDefault();
    if (!quickGoogleEmail || !validateEmail(quickGoogleEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setShowQuickModal(false);
    try {
      const response = await api.post('/auth/google-auth', {
        email: quickGoogleEmail,
        name: quickGoogleEmail.split('@')[0],
        googleId: `google_${Date.now()}`
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Signed in as ${user.email} via Google`);
      window.dispatchEvent(new Event('storage'));
      navigate(redirectPath);
    } catch (err) {
      toast.error('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Ambient background glows */}
      <div className="auth-ambient-glow-1"></div>
      <div className="auth-ambient-glow-2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="auth-main-container"
      >
        {/* LEFT HERO SHOWCASE BANNER (Visible on lg screens) */}
        <div className="auth-hero-banner d-none d-lg-flex">
          <div className="auth-hero-overlay"></div>

          <div className="auth-hero-content">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-4">
              <div 
                className="d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(14, 165, 233, 0.4)'
                }}
              >
                <Globe size={22} className="text-white" />
              </div>
              <span className="fs-3 fw-bold text-white font-playfair">
                Wander<span style={{ color: '#38BDF8' }}>Lux</span>
              </span>
            </Link>

            <div className="auth-badge-glass">
              <Star size={15} fill="#F59E0B" color="#F59E0B" />
              <span>4.9/5 Rating &bull; Trusted by 50,000+ Travelers</span>
            </div>

            <h1 className="auth-hero-title">
              Your Gateway to Extraordinary Journeys
            </h1>

            <p className="text-white-50 leading-relaxed mb-4" style={{ fontSize: '0.95rem' }}>
              Unlock exclusive luxury travel packages, personalized itineraries, and 24/7 concierge support across 150+ worldwide destinations.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={14} />
                </div>
                <span>Best Price Guarantee & Transparent Pricing</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={14} />
                </div>
                <span>Free Flexible Cancellation & Instant Booking</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={14} />
                </div>
                <span>24/7 Dedicated Travel Specialist Assistance</span>
              </div>
            </div>
          </div>

          <div className="auth-hero-content pt-4 border-top border-white border-opacity-10 d-flex align-items-center justify-content-between">
            <span className="small text-white-50">&copy; {new Date().getFullYear()} WanderLux Travel Inc.</span>
            <div className="d-flex gap-3">
              <Link to="/about" className="small text-white-50 text-decoration-none hover-white">About</Link>
              <Link to="/contact" className="small text-white-50 text-decoration-none hover-white">Support</Link>
            </div>
          </div>
        </div>

        {/* RIGHT AUTH FORM SECTION */}
        <div className="auth-form-section">
          {/* Mobile Header Logo */}
          <div className="d-lg-none text-center mb-4">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-2">
              <div 
                className="d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', 
                  borderRadius: '10px' 
                }}
              >
                <Globe size={20} className="text-white" />
              </div>
              <span className="fs-3 fw-bold" style={{ color: '#0F172A', fontFamily: "'Playfair Display', serif" }}>
                Wander<span style={{ color: '#0EA5E9' }}>Lux</span>
              </span>
            </Link>
          </div>

          <div className="mb-4">
            <h2 className="fw-bold mb-1" style={{ color: '#0F172A', fontSize: '1.5rem' }}>
              {mode === 'admin' ? 'Administrator Login' : mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="small mb-0" style={{ color: '#64748B' }}>
              {mode === 'admin' 
                ? 'Sign in to access system dashboard and bookings management' 
                : mode === 'register' 
                  ? 'Join WanderLux to unlock exclusive deals and personalized trips' 
                  : 'Enter your credentials to manage bookings & preferences'}
            </p>
          </div>

          {/* MODE SELECTOR TABS */}
          <div className="auth-tabs-nav">
            <button
              type="button"
              onClick={() => { setMode('login'); setEmail(''); setPassword(''); }}
              className={`auth-tab-btn ${mode === 'login' ? 'active-user' : ''}`}
            >
              <LogIn size={15} /> Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setEmail(''); setPassword(''); }}
              className={`auth-tab-btn ${mode === 'register' ? 'active-register' : ''}`}
            >
              <UserPlus size={15} /> Register
            </button>
            <button
              type="button"
              onClick={autoFillAdmin}
              className={`auth-tab-btn ${mode === 'admin' ? 'active-admin' : ''}`}
            >
              <ShieldCheck size={15} /> Admin
            </button>
          </div>

          {/* ADMIN DEVICE DETECTED ALERT BANNER */}
          {mode === 'admin' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-3 mb-4 d-flex align-items-center justify-content-between"
              style={{ background: '#FEF2F2', border: '1px solid #FCA5A5' }}
            >
              <div className="d-flex align-items-center gap-2">
                <Laptop size={18} style={{ color: '#EF4444' }} />
                <span className="small fw-bold" style={{ color: '#991B1B', fontSize: '0.82rem' }}>Admin Device Ready</span>
              </div>
              <button
                type="button"
                onClick={autoFillAdmin}
                className="btn btn-sm text-white px-2-5 py-1 rounded-2 border-0 d-flex align-items-center gap-1 fw-semibold shadow-sm"
                style={{ background: '#EF4444', fontSize: '0.78rem' }}
              >
                <RefreshCw size={12} /> Load Credentials
              </button>
            </motion.div>
          )}

          {/* GOOGLE SIGN IN BUTTON (For User & Register Modes) */}
          {mode !== 'admin' && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handlePassportGoogleLogin}
                className="auth-google-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              <div className="text-center mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowQuickModal(true)} 
                  className="btn btn-link p-0 small text-decoration-none fw-medium"
                  style={{ fontSize: '0.78rem', color: '#64748B' }}
                >
                  <Sparkles size={13} className="me-1 text-primary" />
                  Quick Google Test Sign-In
                </button>
              </div>

              <div className="d-flex align-items-center gap-3 my-3">
                <hr className="flex-fill my-0" style={{ borderColor: '#E2E8F0' }} />
                <span className="small fw-bold" style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.5px' }}>OR</span>
                <hr className="flex-fill my-0" style={{ borderColor: '#E2E8F0' }} />
              </div>
            </div>
          )}

          {/* USER REGISTER FORM */}
          {mode === 'register' ? (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold mb-1.5" style={{ color: '#334155', fontSize: '0.85rem' }}>Full Name</label>
                <div className="auth-input-group">
                  <input
                    type="text"
                    required
                    className="auth-input-field"
                    placeholder="Ahmed Hassan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="auth-input-icon">
                    <User size={18} />
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold mb-1.5" style={{ color: '#334155', fontSize: '0.85rem' }}>Email Address</label>
                <div className="auth-input-group">
                  <input
                    type="email"
                    required
                    className="auth-input-field"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="auth-input-icon">
                    <Mail size={18} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold mb-1.5" style={{ color: '#334155', fontSize: '0.85rem' }}>Create Password</label>
                <div className="auth-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="auth-input-field pe-5"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="auth-input-icon">
                    <Lock size={18} />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn auth-submit-btn-register"
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <>
                    Create Account & Continue <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* USER OR ADMIN LOGIN FORM */
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold mb-1.5" style={{ color: '#334155', fontSize: '0.85rem' }}>
                  {mode === 'admin' ? 'Admin Email Address' : 'Email Address'}
                </label>
                <div className="auth-input-group">
                  <input
                    type="email"
                    required
                    className="auth-input-field"
                    placeholder={mode === 'admin' ? 'admin@wanderlux.com' : 'you@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="auth-input-icon">
                    <Mail size={18} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold mb-1.5" style={{ color: '#334155', fontSize: '0.85rem' }}>Password</label>
                <div className="auth-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="auth-input-field pe-5"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="auth-input-icon">
                    <Lock size={18} />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`auth-submit-btn ${mode === 'admin' ? 'auth-submit-btn-admin' : 'auth-submit-btn-user'}`}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <>
                    {mode === 'admin' ? 'Sign In as Administrator' : 'Sign In'} <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <Link to="/" className="small text-decoration-none fw-semibold" style={{ color: '#64748B' }}>
              &larr; Return to WanderLux Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* QUICK GOOGLE TEST AUTH MODAL */}
      <AnimatePresence>
        {showQuickModal && (
          <div className="auth-quick-modal-backdrop" onClick={() => setShowQuickModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="auth-quick-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-2" 
                    style={{ width: '32px', height: '32px', background: '#F0F9FF', color: '#0EA5E9' }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <h5 className="fw-bold mb-0 text-dark">Quick Google Sign-In</h5>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuickModal(false)}
                  className="btn btn-sm border-0 text-muted p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="small text-muted mb-3">
                Simulate instant Google OAuth sign-in with any test email address.
              </p>

              <form onSubmit={handleQuickGoogleSimSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold small text-slate-700">Google Email Address</label>
                  <div className="auth-input-group">
                    <input
                      type="email"
                      required
                      className="auth-input-field"
                      placeholder="traveler@gmail.com"
                      value={quickGoogleEmail}
                      onChange={(e) => setQuickGoogleEmail(e.target.value)}
                    />
                    <span className="auth-input-icon">
                      <Mail size={18} />
                    </span>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuickModal(false)}
                    className="btn btn-light rounded-3 flex-fill fw-semibold py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 flex-fill fw-bold py-2 text-white"
                    style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)' }}
                  >
                    Sign In Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoginPage;
