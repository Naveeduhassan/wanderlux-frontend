import './ContactPage.css';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { validateEmail, validatePhone, validateTravelersCount, validateTravelDate } from '../../utils/validation';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destParam = searchParams.get('destination') || '';
  const pkgParam = searchParams.get('package') || '';
  const priceParam = searchParams.get('price') || '';
  const dateParam = searchParams.get('date') || '';
  const travelersParam = searchParams.get('travelers') || '1';

  const [packages, setPackages] = useState([]);
  const [unitPrice, setUnitPrice] = useState(Number((priceParam || '0').replace(/[^0-9.]/g, '')));

  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [formData, setFormData] = useState({
    fullName: storedUser?.name || '',
    email: storedUser?.email || '',
    phone: '',
    packageName: pkgParam || 'Custom Tour',
    destination: destParam || pkgParam || '',
    travelDate: dateParam || '',
    travelers: travelersParam || '1',
    message: pkgParam ? `Hi! I would like to book the "${pkgParam}" package.` : ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages/public');
        setPackages(res.data);
      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };
    fetchPackages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePackageChange = (e) => {
    const selectedPkgName = e.target.value;
    if (selectedPkgName === 'Custom Tour') {
      setUnitPrice(0);
      setFormData({
        ...formData,
        packageName: 'Custom Tour',
        destination: '',
        message: ''
      });
    } else {
      const pkg = packages.find(p => p.name === selectedPkgName);
      if (pkg) {
        setUnitPrice(pkg.price);
        setFormData({
          ...formData,
          packageName: pkg.name,
          destination: pkg.destination,
          message: `Hi! I would like to book the "${pkg.name}" package.`
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('🔒 Please sign in or create an account to book your trip.', { id: 'booking-login-required' });
      const currentUrl = '/contact' + (window.location.search ? window.location.search : '');
      navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error('Please enter your Full Name');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid Email Address (e.g. user@domain.com)');
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid Phone Number');
      return;
    }

    if (formData.travelDate && !validateTravelDate(formData.travelDate)) {
      toast.error('Travel date cannot be in the past');
      return;
    }

    if (!validateTravelersCount(formData.travelers)) {
      toast.error('Number of travelers must be between 1 and 50');
      return;
    }

    setIsLoading(true);
    try {
      const numPeople = Number(formData.travelers) || 1;
      const totalPrice = unitPrice * numPeople || 0;

      const payload = {
        customerName: formData.fullName.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        packageName: formData.packageName,
        destinationName: formData.destination || 'Custom Destination',
        travelDate: formData.travelDate || new Date(),
        numberOfPeople: numPeople,
        totalPrice: totalPrice,
        message: formData.message.trim()
      };

      await api.post('/bookings', payload);
      
      toast.success('Your booking request has been submitted successfully!');
      setFormSubmitted(true);
      setUnitPrice(0);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        packageName: 'Custom Tour',
        destination: '',
        travelDate: '',
        travelers: '1',
        message: ''
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      const msg = error.response?.data?.message || 'Failed to submit booking. Please try again.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-destinations.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Contact hero"
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Contact</span>
              </div>
              <h1 className="page-hero-title">
                Get In <span style={{ color: '#0EA5E9' }}>Touch</span>
              </h1>
              <p className="page-hero-subtitle">
                Lahore se lekar poori duniya tak — hamare travel experts aapka dream trip plan karne ke liye tayyar hain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-5" aria-label="Contact information and form">
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* LEFT: Contact Info */}
            <div className="col-lg-5 reveal-left visible" style={{ opacity: 1, transform: 'none' }}>
              <div
                className="contact-info-card"
                style={{
                  background: 'linear-gradient(135deg,#0F172A,#1E293B)',
                  borderRadius: '24px',
                  padding: '48px',
                  color: 'white',
                  height: '100%',
                }}
              >
                <span className="section-label mb-3 d-inline-block">
                  <i className="fas fa-map-marker-alt me-2"></i>Contact Info
                </span>
                <h2 style={{ color: 'white', fontFamily: "'Playfair Display',serif", fontSize: '2rem', marginBottom: '12px' }}>
                  Let's Start Your <span style={{ color: '#0EA5E9' }}>Journey</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', lineHeight: '1.8' }}>
                  Our friendly team of travel experts is available to answer all your questions and help design the
                  perfect trip for you.
                </p>

                <div className="contact-info-item d-flex align-items-start gap-4 mb-4">
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(14,165,233,0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-map-marker-alt" style={{ color: '#0EA5E9', fontSize: '1.1rem' }}></i>
                  </div>
                  <div>
                    <h6 style={{ color: 'white', marginBottom: '4px' }}>Our Office</h6>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.6' }}>
                      54 MM Alam Road, Gulberg III
                      <br />
                      Lahore, Punjab 54000, Pakistan
                    </p>
                  </div>
                </div>

                <div className="contact-info-item d-flex align-items-start gap-4 mb-4">
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(20,184,166,0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-phone-alt" style={{ color: '#14B8A6', fontSize: '1.1rem' }}></i>
                  </div>
                  <div>
                    <h6 style={{ color: 'white', marginBottom: '4px' }}>Phone</h6>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      <a href="tel:+923001234567" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                        +92 300 123 4567
                      </a>
                      <br />
                      <a href="tel:+924235678901" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                        +92 42 3567 8901
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-item d-flex align-items-start gap-4 mb-4">
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(245,158,11,0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-envelope" style={{ color: '#F59E0B', fontSize: '1.1rem' }}></i>
                  </div>
                  <div>
                    <h6 style={{ color: 'white', marginBottom: '4px' }}>Email</h6>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      <a href="mailto:hello@wanderlux.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                        hello@wanderlux.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Booking / Contact Form */}
            <div className="col-lg-7 reveal-right visible" style={{ opacity: 1, transform: 'none' }}>
              <div
                className="contact-form-card"
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '48px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                  border: '1px solid #E2E8F0',
                }}
              >
                {formSubmitted ? (
                  <div className="text-center py-4">
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(20,184,166,0.15)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: '#14B8A6',
                        marginBottom: '20px',
                      }}
                    >
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#0F172A', marginBottom: '12px' }}>
                      Booking Request Received!
                    </h3>
                    <p style={{ color: '#64748B', lineHeight: '1.8', maxWidth: '450px', margin: '0 auto 24px' }}>
                      Thank you for choosing WanderLux. Our Lahore team will review your itinerary and contact you within
                      2 hours via Phone / WhatsApp.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn-primary-custom"
                      style={{ border: 'none' }}
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#0F172A', marginBottom: '8px' }}>
                      Book Your Trip
                    </h3>
                    <p style={{ color: '#64748B', marginBottom: '28px', fontSize: '0.95rem' }}>
                      Fill in the form below and our travel experts will handle everything for you.
                    </p>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-control py-2.5 rounded-3"
                          placeholder="Ahmed Hassan"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control py-2.5 rounded-3"
                          placeholder="ahmed@example.com"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control py-2.5 rounded-3"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Select Tour Package</label>
                        <select
                          name="packageName"
                          value={formData.packageName}
                          onChange={handlePackageChange}
                          className="form-select py-2.5 rounded-3"
                        >
                          <option value="Custom Tour">Custom / Tailor-Made Tour</option>
                          {packages.map((pkg) => (
                            <option key={pkg._id || pkg.name} value={pkg.name}>
                              {pkg.name} (${pkg.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Travel Date</label>
                        <input
                          type="date"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleInputChange}
                          className="form-control py-2.5 rounded-3"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label font-bold small text-slate-700">Number of Travelers</label>
                        <input
                          type="number"
                          name="travelers"
                          min="1"
                          max="50"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          className="form-control py-2.5 rounded-3"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label font-bold small text-slate-700">Special Instructions / Requirements</label>
                        <textarea
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          placeholder="Tell us your preferences (e.g. Halal food, budget, specific places to visit)..."
                        ></textarea>
                      </div>

                      {unitPrice > 0 && (
                        <div className="col-12">
                          <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center border">
                            <span className="fw-semibold text-slate-700">Estimated Total Price:</span>
                            <span className="fs-4 fw-bold text-primary" style={{ color: '#0EA5E9' }}>
                              ${unitPrice * (Number(formData.travelers) || 1)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn-primary-custom w-100 py-3 text-center justify-content-center text-white fw-bold"
                          style={{ border: 'none', borderRadius: '12px' }}
                        >
                          {isLoading ? (
                            <span className="spinner-border spinner-border-sm me-2"></span>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i> Submit Booking Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
