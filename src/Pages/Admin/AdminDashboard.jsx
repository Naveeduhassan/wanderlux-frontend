import './AdminDashboard.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Search,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  Calendar,
  X,
  Eye,
  Home,
  Camera,
  AlertTriangle
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [destModal, setDestModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [pkgModal, setPkgModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [bookingModal, setBookingModal] = useState({ isOpen: false, data: null });
  const [galModal, setGalModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'OK',
    confirmBtnClass: 'btn-primary-custom',
    iconType: 'create',
    onConfirm: null
  });

  const showConfirm = (title, message, onConfirm, confirmText = 'OK', confirmBtnClass = 'btn-primary-custom', iconType = 'create') => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      confirmBtnClass,
      iconType,
      onConfirm
    });
  };

  // Form states
  const [destForm, setDestForm] = useState({
    name: '', location: '', country: '', image: '', description: '', price: '', duration: '', reviews: 0, rating: 5, badgeIcon: '', badgeText: ''
  });
  
  const [pkgForm, setPkgForm] = useState({
    name: '', destination: '', category: 'luxury', price: '', priceType: 'Per person', duration: '', rating: 5, image: '', description: '', badgeText: '', badgeClassName: '', features: [{ icon: 'fas fa-hotel', text: '' }]
  });

  const [galForm, setGalForm] = useState({
    title: '', category: 'beaches', categoryLabel: 'Beaches', image: '', location: '', description: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ICON_PRESETS = [
    { label: '🏨 5-Star Hotel / Resort', value: 'fas fa-hotel' },
    { label: '✈️ Flights & Transfers', value: 'fas fa-plane' },
    { label: '🍽️ All Meals & Dining', value: 'fas fa-utensils' },
    { label: '🚌 Deluxe Bus / Transport', value: 'fas fa-bus' },
    { label: '👨‍💼 Personal Tour Guide', value: 'fas fa-user-tie' },
    { label: '📶 Free High-Speed Wi-Fi', value: 'fas fa-wifi' },
    { label: '🎟️ Sightseeing Tickets', value: 'fas fa-ticket-alt' },
    { label: '⛰️ Mountain Outdoor Adventure', value: 'fas fa-hiking' },
    { label: '📸 Professional Photography', value: 'fas fa-camera' },
    { label: '🛡️ Full Travel Insurance', value: 'fas fa-shield-alt' },
    { label: '🍹 Welcome Refreshments', value: 'fas fa-cocktail' },
    { label: '🏊 Pool & Spa Access', value: 'fas fa-swimming-pool' },
    { label: '🚢 Cruise & Boat Ride', value: 'fas fa-ship' }
  ];

  const BADGE_PRESETS = [
    { label: 'None (No Badge)', text: '', icon: '' },
    { label: '🔥 Hot Deal', text: 'Hot Deal', icon: 'fas fa-fire' },
    { label: '⭐ Best Seller', text: 'Best Seller', icon: 'fas fa-star' },
    { label: '🏆 Popular Choice', text: 'Popular', icon: 'fas fa-trophy' },
    { label: '🏷️ Special Offer', text: 'Special Offer', icon: 'fas fa-tag' },
    { label: '💎 Luxury Package', text: 'Luxury', icon: 'fas fa-gem' }
  ];

  const handleImageUpload = async (file, targetForm) => {
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('image', file);

    const toastId = toast.loading('Uploading image from PC...');
    try {
      const res = await api.post('/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Image uploaded successfully!', { id: toastId });
      if (targetForm === 'dest') {
        setDestForm(prev => ({ ...prev, image: res.data.imageUrl }));
      } else if (targetForm === 'pkg') {
        setPkgForm(prev => ({ ...prev, image: res.data.imageUrl }));
      } else if (targetForm === 'gal') {
        setGalForm(prev => ({ ...prev, image: res.data.imageUrl }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image. Please try again.', { id: toastId });
    }
  };

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      toast.error('Access denied. Administrators only.');
      navigate('/login');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        api.get('/destinations/public'),
        api.get('/packages/public'),
        api.get('/bookings'),
        api.get('/gallery/public')
      ]);

      if (results[0].status === 'fulfilled' && results[0].value.data) {
        setDestinations(results[0].value.data);
      }
      if (results[1].status === 'fulfilled' && results[1].value.data) {
        setPackages(results[1].value.data);
      }
      if (results[2].status === 'fulfilled' && results[2].value.data) {
        setBookings(results[2].value.data);
      }
      if (results[3].status === 'fulfilled' && results[3].value.data) {
        setGallery(results[3].value.data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  // ==========================================
  // Destination CRUD Operations
  // ==========================================
  const openDestModal = (mode, data = null) => {
    if (mode === 'edit' && data) {
      setDestForm({
        name: data.name || '',
        location: data.location || '',
        country: data.country || '',
        image: data.image || '',
        description: data.description || '',
        price: data.price || '',
        duration: data.duration || '',
        reviews: data.reviews || 0,
        rating: data.rating || 5,
        badgeIcon: data.badge?.icon || '',
        badgeText: data.badge?.text || ''
      });
      setDestModal({ isOpen: true, mode: 'edit', data });
    } else {
      setDestForm({
        name: '', location: '', country: '', image: '', description: '', price: '', duration: '', reviews: 0, rating: 5, badgeIcon: '', badgeText: ''
      });
      setDestModal({ isOpen: true, mode: 'create', data: null });
    }
  };

  const executeSubmitDestForm = async () => {
    if (!destForm.name.trim() || !destForm.location.trim() || !destForm.country.trim()) {
      toast.error('Name, location, and country are required');
      return;
    }

    const payload = {
      name: destForm.name.trim(),
      location: destForm.location.trim(),
      country: destForm.country.trim(),
      image: destForm.image.trim(),
      description: destForm.description.trim(),
      price: Number(destForm.price) || 0,
      duration: destForm.duration.trim(),
      reviews: Number(destForm.reviews) || 0,
      rating: Number(destForm.rating) || 5,
      badge: destForm.badgeIcon || destForm.badgeText ? { icon: destForm.badgeIcon, text: destForm.badgeText } : null
    };

    try {
      if (destModal.mode === 'create') {
        const res = await api.post('/destinations', payload);
        setDestinations([res.data, ...destinations]);
        toast.success('Destination created successfully');
      } else {
        const res = await api.put(`/destinations/${destModal.data._id}`, payload);
        setDestinations(destinations.map(d => d._id === res.data._id ? res.data : d));
        toast.success('Destination updated successfully');
      }
      setDestModal({ isOpen: false, mode: 'create', data: null });
    } catch (error) {
      const msg = error.response?.data?.message || 'Operation failed';
      toast.error(msg);
    }
  };

  const submitDestForm = (e) => {
    e.preventDefault();
    const isCreate = destModal.mode === 'create';
    showConfirm(
      isCreate ? 'Add New Destination' : 'Update Destination',
      isCreate ? `Are you sure you want to add "${destForm.name || 'this destination'}" to the catalog?` : `Are you sure you want to save changes to "${destForm.name}"?`,
      executeSubmitDestForm,
      isCreate ? 'OK, Create' : 'OK, Update',
      'btn-primary-custom',
      isCreate ? 'create' : 'update'
    );
  };

  const deleteDest = (id) => {
    const target = destinations.find(d => d._id === id);
    const itemName = target ? target.name : 'this destination';

    showConfirm(
      'Delete Destination',
      `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      async () => {
        try {
          await api.delete(`/destinations/${id}`);
          setDestinations(destinations.filter(d => d._id !== id));
          toast.success('Destination deleted successfully');
        } catch (error) {
          toast.error('Failed to delete destination');
        }
      },
      'OK, Delete',
      'btn-danger',
      'delete'
    );
  };

  // ==========================================
  // Package CRUD Operations
  // ==========================================
  const openPkgModal = (mode, data = null) => {
    if (mode === 'edit' && data) {
      setPkgForm({
        name: data.name || '',
        destination: data.destination || '',
        category: data.category || 'luxury',
        price: data.price || '',
        priceType: data.priceType || 'Per person',
        duration: data.duration || '',
        rating: data.rating || 5,
        image: data.image || '',
        description: data.description || '',
        badgeText: data.badge?.text || '',
        badgeClassName: data.badge?.className || '',
        features: data.features || [{ icon: 'fas fa-hotel', text: '' }]
      });
      setPkgModal({ isOpen: true, mode: 'edit', data });
    } else {
      setPkgForm({
        name: '', destination: '', category: 'luxury', price: '', priceType: 'Per person', duration: '', rating: 5, image: '', description: '', badgeText: '', badgeClassName: '', features: [{ icon: 'fas fa-hotel', text: '' }]
      });
      setPkgModal({ isOpen: true, mode: 'create', data: null });
    }
  };

  const addFeatureInput = () => {
    setPkgForm({ ...pkgForm, features: [...pkgForm.features, { icon: 'fas fa-hotel', text: '' }] });
  };

  const removeFeatureInput = (index) => {
    const updated = pkgForm.features.filter((_, i) => i !== index);
    setPkgForm({ ...pkgForm, features: updated });
  };

  const handleFeatureChange = (index, key, val) => {
    const updated = pkgForm.features.map((feat, i) => i === index ? { ...feat, [key]: val } : feat);
    setPkgForm({ ...pkgForm, features: updated });
  };

  const executeSubmitPkgForm = async () => {
    if (!pkgForm.name.trim() || !pkgForm.destination.trim()) {
      toast.error('Package name and destination are required');
      return;
    }

    const payload = {
      name: pkgForm.name.trim(),
      destination: pkgForm.destination.trim(),
      category: pkgForm.category,
      price: Number(pkgForm.price) || 0,
      priceType: pkgForm.priceType,
      duration: pkgForm.duration.trim(),
      rating: Number(pkgForm.rating) || 5,
      image: pkgForm.image.trim(),
      description: pkgForm.description.trim(),
      badge: pkgForm.badgeText ? { text: pkgForm.badgeText, className: pkgForm.badgeClassName } : null,
      features: pkgForm.features.filter(f => f.text.trim() !== '')
    };

    try {
      if (pkgModal.mode === 'create') {
        const res = await api.post('/packages', payload);
        setPackages([res.data, ...packages]);
        toast.success('Package created successfully');
      } else {
        const res = await api.put(`/packages/${pkgModal.data._id}`, payload);
        setPackages(packages.map(p => p._id === res.data._id ? res.data : p));
        toast.success('Package updated successfully');
      }
      setPkgModal({ isOpen: false, mode: 'create', data: null });
    } catch (error) {
      const msg = error.response?.data?.message || 'Operation failed';
      toast.error(msg);
    }
  };

  const submitPkgForm = (e) => {
    e.preventDefault();
    const isCreate = pkgModal.mode === 'create';
    showConfirm(
      isCreate ? 'Add Travel Package' : 'Update Travel Package',
      isCreate ? `Are you sure you want to create "${pkgForm.name || 'this package'}"?` : `Are you sure you want to save changes to "${pkgForm.name}"?`,
      executeSubmitPkgForm,
      isCreate ? 'OK, Create' : 'OK, Update',
      'btn-primary-custom',
      isCreate ? 'create' : 'update'
    );
  };

  const deletePkg = (id) => {
    const target = packages.find(p => p._id === id);
    const itemName = target ? target.name : 'this package';

    showConfirm(
      'Delete Travel Package',
      `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      async () => {
        try {
          await api.delete(`/packages/${id}`);
          setPackages(packages.filter(p => p._id !== id));
          toast.success('Package deleted successfully');
        } catch (error) {
          toast.error('Failed to delete package');
        }
      },
      'OK, Delete',
      'btn-danger',
      'delete'
    );
  };

  // ==========================================
  // Booking Control Operations
  // ==========================================
  const updateBookingStatus = (id, status) => {
    const target = bookings.find(b => b._id === id);
    const customerName = target ? target.customerName : 'customer';

    showConfirm(
      'Update Booking Status',
      `Are you sure you want to mark ${customerName}'s booking as "${status}"?`,
      async () => {
        try {
          const res = await api.put(`/bookings/${id}`, { status });
          setBookings(bookings.map(b => b._id === res.data._id ? res.data : b));
          toast.success(`Booking marked as ${status}`);
        } catch (error) {
          toast.error('Failed to update booking status');
        }
      },
      'OK, Update',
      'btn-primary-custom',
      'update'
    );
  };

  const deleteBooking = (id) => {
    const target = bookings.find(b => b._id === id);
    const customerName = target ? target.customerName : 'this record';

    showConfirm(
      'Delete Booking Record',
      `Are you sure you want to delete the booking record for ${customerName}?`,
      async () => {
        try {
          await api.delete(`/bookings/${id}`);
          setBookings(bookings.filter(b => b._id !== id));
          toast.success('Booking record deleted');
        } catch (error) {
          toast.error('Failed to delete booking');
        }
      },
      'OK, Delete',
      'btn-danger',
      'delete'
    );
  };

  // ==========================================
  // Gallery CRUD Operations
  // ==========================================
  const openGalModal = (mode, data = null) => {
    if (mode === 'edit' && data) {
      setGalForm({
        title: data.title || '',
        category: data.category || 'beaches',
        categoryLabel: data.categoryLabel || 'Beaches',
        image: data.image || '',
        location: data.location || '',
        description: data.description || ''
      });
      setGalModal({ isOpen: true, mode: 'edit', data });
    } else {
      setGalForm({
        title: '', category: 'beaches', categoryLabel: 'Beaches', image: '', location: '', description: ''
      });
      setGalModal({ isOpen: true, mode: 'create', data: null });
    }
  };

  const executeSubmitGalForm = async () => {
    if (!galForm.title.trim()) {
      toast.error('Photo title is required');
      return;
    }

    const catMap = {
      beaches: 'Beaches',
      mountains: 'Mountains',
      cities: 'Cities',
      wildlife: 'Wildlife',
      hotels: 'Hotels',
      adventure: 'Adventure'
    };

    const payload = {
      title: galForm.title.trim(),
      category: galForm.category,
      categoryLabel: catMap[galForm.category] || 'Beaches',
      image: galForm.image.trim(),
      location: galForm.location.trim(),
      description: galForm.description.trim()
    };

    try {
      if (galModal.mode === 'create') {
        const res = await api.post('/gallery', payload);
        setGallery([res.data, ...gallery]);
        toast.success('Gallery photo added successfully');
      } else {
        const res = await api.put(`/gallery/${galModal.data._id}`, payload);
        setGallery(gallery.map(g => g._id === res.data._id ? res.data : g));
        toast.success('Gallery photo updated successfully');
      }
      setGalModal({ isOpen: false, mode: 'create', data: null });
    } catch (error) {
      const msg = error.response?.data?.message || 'Operation failed';
      toast.error(msg);
    }
  };

  const submitGalForm = (e) => {
    e.preventDefault();
    const isCreate = galModal.mode === 'create';
    showConfirm(
      isCreate ? 'Add Photo to Gallery' : 'Update Gallery Photo',
      isCreate ? `Are you sure you want to add "${galForm.title || 'this photo'}" to the gallery?` : `Are you sure you want to save changes to "${galForm.title}"?`,
      executeSubmitGalForm,
      isCreate ? 'OK, Add' : 'OK, Update',
      'btn-primary-custom',
      isCreate ? 'create' : 'update'
    );
  };

  const deleteGal = (id) => {
    const target = gallery.find(g => g._id === id);
    const itemName = target ? target.title : 'this photo';

    showConfirm(
      'Delete Gallery Photo',
      `Are you sure you want to delete "${itemName}" from the gallery?`,
      async () => {
        try {
          await api.delete(`/gallery/${id}`);
          setGallery(gallery.filter(g => g._id !== id));
          toast.success('Gallery photo deleted successfully');
        } catch (error) {
          toast.error('Failed to delete gallery photo');
        }
      },
      'OK, Delete',
      'btn-danger',
      'delete'
    );
  };

  // Filter listings based on search bar input
  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    b.packageName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.customerEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGallery = gallery.filter(g =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <span className="text-muted">Loading Control Panel...</span>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ paddingTop: '90px', background: '#F8FAFC' }}>
      
      {/* MAIN CONTAINER */}
      <div className="container-fluid flex-grow-1 px-4 py-4">
        <div className="row g-4">
          
          {/* SIDEBAR TABS */}
          <div className="col-lg-3 col-md-4">
            <div 
              className="card border-0 shadow-sm rounded-4 overflow-hidden"
              style={{ 
                background: '#FFFFFF', 
                border: '1px solid #E2E8F0' 
              }}
            >
              <div 
                className="card-body p-4 text-white d-flex align-items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)' 
                  }}
                >
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold font-playfair">WanderLux Admin</h6>
                  <span className="small text-white-50" style={{ fontSize: '0.75rem' }}>{user.email}</span>
                </div>
              </div>
              
              <div className="list-group list-group-flush p-2 bg-transparent">
                <button 
                  onClick={() => { setActiveTab('overview'); setSearchTerm(''); }}
                  className={`list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 mb-1 fw-semibold transition-all ${activeTab === 'overview' ? 'text-white shadow-sm' : 'text-secondary bg-transparent'}`}
                  style={activeTab === 'overview' ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' } : {}}
                >
                  <LayoutDashboard size={18} /> Overview
                </button>
                <button 
                  onClick={() => { setActiveTab('destinations'); setSearchTerm(''); }}
                  className={`list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 mb-1 fw-semibold transition-all ${activeTab === 'destinations' ? 'text-white shadow-sm' : 'text-secondary bg-transparent'}`}
                  style={activeTab === 'destinations' ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' } : {}}
                >
                  <MapPin size={18} /> Destinations
                </button>
                <button 
                  onClick={() => { setActiveTab('packages'); setSearchTerm(''); }}
                  className={`list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 mb-1 fw-semibold transition-all ${activeTab === 'packages' ? 'text-white shadow-sm' : 'text-secondary bg-transparent'}`}
                  style={activeTab === 'packages' ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' } : {}}
                >
                  <Briefcase size={18} /> Packages
                </button>
                <button 
                  onClick={() => { setActiveTab('bookings'); setSearchTerm(''); }}
                  className={`list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 mb-1 fw-semibold transition-all ${activeTab === 'bookings' ? 'text-white shadow-sm' : 'text-secondary bg-transparent'}`}
                  style={activeTab === 'bookings' ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' } : {}}
                >
                  <BookOpen size={18} /> Bookings
                </button>
                <button 
                  onClick={() => { setActiveTab('gallery'); setSearchTerm(''); }}
                  className={`list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 mb-1 fw-semibold transition-all ${activeTab === 'gallery' ? 'text-white shadow-sm' : 'text-secondary bg-transparent'}`}
                  style={activeTab === 'gallery' ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' } : {}}
                >
                  <Camera size={18} /> Photo Gallery
                </button>
                <Link 
                  to="/"
                  className="list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 text-secondary fw-semibold bg-transparent mt-3"
                >
                  <Home size={18} /> Exit Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center gap-3 py-3 text-danger fw-semibold bg-transparent"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* MAIN WORKSPACE */}
          <div className="col-lg-9 col-md-8">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h2 className="mb-0 fw-bold font-playfair text-capitalize" style={{ color: '#0F172A' }}>Dashboard Overview</h2>
                <p className="text-muted mb-0 small">Welcome back, admin. Enforcing strict database controls.</p>
              </div>
            </div>

            {/* OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
                
                {/* STATS 1: DESTINATIONS */}
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className="col-md-3 col-sm-6">
                  <div 
                    className="card border-0 shadow-lg text-white rounded-4 p-3" 
                    style={{ 
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
                      boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Destinations</span>
                        <h2 className="mb-0 fw-bold font-playfair mt-1 text-white">{destinations.length}</h2>
                      </div>
                      <div className="shadow-sm d-flex align-items-center justify-content-center rounded-4" style={{ width: '48px', height: '48px', background: '#FFFFFF', color: '#0EA5E9' }}>
                        <MapPin size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* STATS 2: PACKAGES */}
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className="col-md-3 col-sm-6">
                  <div 
                    className="card border-0 shadow-lg text-white rounded-4 p-3" 
                    style={{ 
                      background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                      boxShadow: '0 10px 25px -5px rgba(13, 148, 136, 0.4)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Packages</span>
                        <h2 className="mb-0 fw-bold font-playfair mt-1 text-white">{packages.length}</h2>
                      </div>
                      <div className="shadow-sm d-flex align-items-center justify-content-center rounded-4" style={{ width: '48px', height: '48px', background: '#FFFFFF', color: '#0D9488' }}>
                        <Briefcase size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* STATS 3: TOTAL BOOKINGS */}
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className="col-md-3 col-sm-6">
                  <div 
                    className="card border-0 shadow-lg text-white rounded-4 p-3" 
                    style={{ 
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Total Bookings</span>
                        <h2 className="mb-0 fw-bold font-playfair mt-1 text-white">{bookings.length}</h2>
                      </div>
                      <div className="shadow-sm d-flex align-items-center justify-content-center rounded-4" style={{ width: '48px', height: '48px', background: '#FFFFFF', color: '#D97706' }}>
                        <BookOpen size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* STATS 4: PHOTO GALLERY */}
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className="col-md-3 col-sm-6">
                  <div 
                    className="card border-0 shadow-lg text-white rounded-4 p-3" 
                    style={{ 
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                      boxShadow: '0 10px 25px -5px rgba(109, 40, 217, 0.4)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Photo Gallery</span>
                        <h2 className="mb-0 fw-bold font-playfair mt-1 text-white">{gallery.length}</h2>
                      </div>
                      <div className="shadow-sm d-flex align-items-center justify-content-center rounded-4" style={{ width: '48px', height: '48px', background: '#FFFFFF', color: '#6D28D9' }}>
                        <Camera size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RECENT BOOKINGS LIST */}
                <div className="col-12 mt-4">
                  <div 
                    className="card border-0 shadow-lg rounded-4 overflow-hidden"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.85)', 
                      backdropFilter: 'blur(15px)', 
                      border: '1px solid rgba(255, 255, 255, 0.4)' 
                    }}
                  >
                    <div className="card-body p-4">
                      <h5 className="fw-bold font-playfair mb-3 text-dark">Recent Bookings</h5>
                      <div className="table-responsive">
                        <table className="table align-middle table-hover mb-0">
                          <thead className="table-light text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                            <tr>
                              <th>Customer</th>
                              <th>Package</th>
                              <th>Travel Date</th>
                              <th>Guests</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.slice(0, 5).map((b) => (
                              <tr key={b._id}>
                                <td>
                                  <div className="fw-bold text-dark">{b.customerName || b.user?.name || 'Guest User'}</div>
                                  <span className="small text-muted d-block">{b.customerEmail || b.user?.email || 'N/A'}</span>
                                  {b.customerPhone && (
                                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>
                                      <i className="fas fa-phone-alt me-1 text-primary" style={{ fontSize: '0.7rem' }}></i>{b.customerPhone}
                                    </span>
                                  )}
                                </td>
                                <td className="fw-semibold text-dark">{b.packageName}</td>
                                <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                                <td>{b.numberOfPeople}</td>
                                <td>
                                  <span className={`badge px-3 py-2 rounded-pill text-capitalize ${b.status === 'confirmed' ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20' : b.status === 'cancelled' ? 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20' : 'bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20'}`}>
                                    {b.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            {bookings.length === 0 && (
                              <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">No bookings registered yet.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* GALLERY PANEL */}
            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(15px)' }}>
                <div className="card-body p-4">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                      <h4 className="fw-bold font-playfair mb-0 text-dark">Photo Gallery Management</h4>
                      <p className="text-muted small mb-0">Manage photo gallery items displayed on the gallery page.</p>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="position-relative" style={{ width: '250px' }}>
                        <Search size={16} className="position-absolute translate-middle-y start-0 ms-3 text-muted" style={{ top: '50%' }} />
                        <input type="text" className="form-control ps-5 rounded-pill bg-white border-0 shadow-sm" placeholder="Search gallery..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      </div>
                      <button onClick={() => openGalModal('create')} className="btn btn-primary-custom px-4 rounded-pill d-flex align-items-center gap-2">
                        <Plus size={16} /> Add Photo
                      </button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                      <thead className="table-light text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        <tr>
                          <th>Photo</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Location</th>
                          <th className="text-end">Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGallery.map((g) => (
                          <tr key={g._id}>
                            <td>
                              <img src={g.image} alt={g.title} className="rounded-3 border shadow-sm" style={{ width: '60px', height: '42px', objectFit: 'cover' }} />
                            </td>
                            <td>
                              <div className="fw-bold text-dark">{g.title}</div>
                            </td>
                            <td>
                              <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-20 px-3 py-2 rounded-pill text-capitalize">
                                {g.categoryLabel || g.category}
                              </span>
                            </td>
                            <td>{g.location || 'N/A'}</td>
                            <td className="text-end">
                              <div className="d-flex align-items-center justify-content-end gap-2">
                                <button onClick={() => openGalModal('edit', g)} className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center p-0 rounded-circle" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Edit Photo"><Edit size={14} /></button>
                                <button onClick={() => deleteGal(g._id)} className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center p-0 rounded-circle" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Delete Photo"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredGallery.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">No gallery photos found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* DESTINATION FORM MODAL */}
      <AnimatePresence>
        {destModal.isOpen && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
            onClick={() => setDestModal({ ...destModal, isOpen: false })}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden" 
              style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-4 text-white d-flex align-items-center justify-content-between"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <h5 className="mb-0 fw-bold font-playfair">{destModal.mode === 'create' ? 'Create Destination' : 'Edit Destination'}</h5>
                <button onClick={() => setDestModal({ ...destModal, isOpen: false })} className="text-white hover-white-50 border-0 bg-transparent"><X size={20} /></button>
              </div>
              <form onSubmit={submitDestForm} className="p-4 overflow-y-auto flex-grow-1">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Destination Name</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Sydney" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Duration</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. 5 Days" value={destForm.duration} onChange={(e) => setDestForm({ ...destForm, duration: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Location Name</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Opera House" value={destForm.location} onChange={(e) => setDestForm({ ...destForm, location: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Country</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Australia" value={destForm.country} onChange={(e) => setDestForm({ ...destForm, country: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Starting Price ($)</label>
                    <input type="number" required min="0" className="form-control rounded-3" placeholder="950" value={destForm.price} onChange={(e) => setDestForm({ ...destForm, price: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Rating</label>
                    <select className="form-select rounded-3" value={destForm.rating} onChange={(e) => setDestForm({ ...destForm, rating: Number(e.target.value) })}>
                      <option value="5">⭐⭐⭐⭐⭐ 5.0 (Top Rated)</option>
                      <option value="4.8">⭐⭐⭐⭐.8 4.8 (Excellent)</option>
                      <option value="4.5">⭐⭐⭐⭐.5 4.5 (Very Good)</option>
                      <option value="4.0">⭐⭐⭐⭐.0 4.0 (Good)</option>
                      <option value="3.5">⭐⭐⭐.5 3.5 (Average)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Total Reviews</label>
                    <input type="number" min="0" required className="form-control rounded-3" placeholder="42" value={destForm.reviews} onChange={(e) => setDestForm({ ...destForm, reviews: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Badge / Tag (Optional)</label>
                    <select 
                      className="form-select rounded-3" 
                      value={destForm.badgeText}
                      onChange={(e) => {
                        const selected = BADGE_PRESETS.find(b => b.text === e.target.value);
                        setDestForm({ ...destForm, badgeText: selected ? selected.text : e.target.value, badgeIcon: selected ? selected.icon : '' });
                      }}
                    >
                      {BADGE_PRESETS.map((b, i) => (
                        <option key={i} value={b.text}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* IMAGE FILE UPLOAD FROM PC */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Destination Image (Upload File from PC or Enter URL)</label>
                    <div className="d-flex gap-2 align-items-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="form-control rounded-3" 
                        onChange={(e) => handleImageUpload(e.target.files[0], 'dest')} 
                      />
                      {destForm.image && (
                        <img src={destForm.image} alt="Preview" className="rounded-3 shadow-sm border" style={{ width: '60px', height: '42px', objectFit: 'cover' }} />
                      )}
                    </div>
                    <input type="text" required className="form-control rounded-3 mt-2" placeholder="Image URL / Path (auto-filled on file upload)" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Description</label>
                    <textarea required rows="3" className="form-control rounded-3" placeholder="Explore gorgeous shorelines, vibrant architecture..." value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button type="button" onClick={() => setDestModal({ ...destModal, isOpen: false })} className="btn btn-outline-secondary px-4 rounded-pill">Cancel</button>
                  <button type="submit" className="btn btn-primary-custom px-4 rounded-pill">Save Destination</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PACKAGE FORM MODAL */}
      <AnimatePresence>
        {pkgModal.isOpen && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
            onClick={() => setPkgModal({ ...pkgModal, isOpen: false })}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden" 
              style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-4 text-white d-flex align-items-center justify-content-between"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <h5 className="mb-0 fw-bold font-playfair">{pkgModal.mode === 'create' ? 'Create Package' : 'Edit Package'}</h5>
                <button onClick={() => setPkgModal({ ...pkgModal, isOpen: false })} className="text-white hover-white-50 border-0 bg-transparent"><X size={20} /></button>
              </div>
              <form onSubmit={submitPkgForm} className="p-4 overflow-y-auto flex-grow-1">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Package Name</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Sydney Explorer Tour" value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Destination Location</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Sydney, Australia" value={pkgForm.destination} onChange={(e) => setPkgForm({ ...pkgForm, destination: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Category</label>
                    <select className="form-select rounded-3 text-capitalize" value={pkgForm.category} onChange={(e) => setPkgForm({ ...pkgForm, category: e.target.value })}>
                      <option value="luxury">Luxury</option>
                      <option value="adventure">Adventure</option>
                      <option value="honeymoon">Honeymoon</option>
                      <option value="family">Family</option>
                      <option value="wildlife">Wildlife</option>
                      <option value="beach">Beach</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Duration</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. 6 Days" value={pkgForm.duration} onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">Price ($)</label>
                    <input type="number" required min="0" className="form-control rounded-3" placeholder="1899" value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">Price Type</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Per person" value={pkgForm.priceType} onChange={(e) => setPkgForm({ ...pkgForm, priceType: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">Rating</label>
                    <select className="form-select rounded-3" value={pkgForm.rating} onChange={(e) => setPkgForm({ ...pkgForm, rating: Number(e.target.value) })}>
                      <option value="5">⭐⭐⭐⭐⭐ 5.0 (Top Rated)</option>
                      <option value="4.9">⭐⭐⭐⭐.9 4.9 (Outstanding)</option>
                      <option value="4.8">⭐⭐⭐⭐.8 4.8 (Excellent)</option>
                      <option value="4.5">⭐⭐⭐⭐.5 4.5 (Very Good)</option>
                      <option value="4.0">⭐⭐⭐⭐.0 4.0 (Good)</option>
                    </select>
                  </div>
                  
                  {/* IMAGE UPLOAD FROM PC */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Package Image (Upload from PC or URL)</label>
                    <div className="d-flex gap-2 align-items-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="form-control rounded-3" 
                        onChange={(e) => handleImageUpload(e.target.files[0], 'pkg')} 
                      />
                      {pkgForm.image && (
                        <img src={pkgForm.image} alt="Preview" className="rounded-3 shadow-sm border" style={{ width: '60px', height: '42px', objectFit: 'cover' }} />
                      )}
                    </div>
                    <input type="text" required className="form-control rounded-3 mt-2" placeholder="Image URL / Path (auto-filled on upload)" value={pkgForm.image} onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Badge / Tag (Optional)</label>
                    <select 
                      className="form-select rounded-3" 
                      value={pkgForm.badgeText}
                      onChange={(e) => {
                        const selected = BADGE_PRESETS.find(b => b.text === e.target.value);
                        setPkgForm({ ...pkgForm, badgeText: selected ? selected.text : e.target.value });
                      }}
                    >
                      {BADGE_PRESETS.map((b, i) => (
                        <option key={i} value={b.text}>{b.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Description</label>
                    <textarea required rows="2" className="form-control rounded-3" placeholder="Experience stunning views of the bay with luxury stays..." value={pkgForm.description} onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })}></textarea>
                  </div>
                  
                  {/* DYNAMIC FEATURE LIST BUILDER WITH FRIENDLY ICON SELECTOR */}
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="form-label small fw-semibold text-muted mb-0">Package Features & Amenities</label>
                      <button type="button" onClick={addFeatureInput} className="btn btn-sm btn-outline-primary py-1 px-3 rounded-pill"><Plus size={12} className="me-1" /> Add Feature</button>
                    </div>
                    {pkgForm.features.map((feat, index) => (
                      <div key={index} className="d-flex align-items-center gap-2 mb-2">
                        {/* FRIENDLY ICON DROPDOWN SELECTOR */}
                        <select 
                          className="form-select rounded-3" 
                          style={{ width: '230px' }} 
                          value={feat.icon || 'fas fa-hotel'} 
                          onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        >
                          {ICON_PRESETS.map((iconOpt, i) => (
                            <option key={i} value={iconOpt.value}>{iconOpt.label}</option>
                          ))}
                        </select>
                        <input type="text" required className="form-control rounded-3" placeholder="Feature Description (e.g. 5-Star Resort Stay)" value={feat.text} onChange={(e) => handleFeatureChange(index, 'text', e.target.value)} />
                        {pkgForm.features.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeFeatureInput(index)} 
                            className="btn btn-outline-danger flex-shrink-0 d-inline-flex align-items-center justify-content-center p-0 rounded-circle"
                            style={{ width: '38px', height: '38px', minWidth: '38px' }}
                            title="Remove Feature"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button type="button" onClick={() => setPkgModal({ ...pkgModal, isOpen: false })} className="btn btn-outline-secondary px-4 rounded-pill">Cancel</button>
                  <button type="submit" className="btn btn-primary-custom px-4 rounded-pill">Save Package</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOOKING DETAILS MODAL */}
      <AnimatePresence>
        {bookingModal.isOpen && bookingModal.data && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
            onClick={() => setBookingModal({ isOpen: false, data: null })}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden" 
              style={{ width: '100%', maxWidth: '550px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-4 text-white d-flex align-items-center justify-content-between"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <h5 className="mb-0 fw-bold font-playfair">Booking Details</h5>
                <button onClick={() => setBookingModal({ isOpen: false, data: null })} className="text-white hover-white-50 border-0 bg-transparent"><X size={20} /></button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow-1">
                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase text-muted small mb-2" style={{ letterSpacing: '0.05em' }}>Customer Information</h6>
                  <div className="p-3 bg-light rounded-3">
                    <div className="mb-2"><strong>Name:</strong> {bookingModal.data.customerName || bookingModal.data.user?.name || 'Guest User'}</div>
                    <div className="mb-2"><strong>Email:</strong> {bookingModal.data.customerEmail || bookingModal.data.user?.email || 'N/A'}</div>
                    {bookingModal.data.customerPhone && <div className="mb-0"><strong>Phone:</strong> {bookingModal.data.customerPhone}</div>}
                  </div>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase text-muted small mb-2" style={{ letterSpacing: '0.05em' }}>Booking Information</h6>
                  <div className="p-3 bg-light rounded-3">
                    <div className="mb-2"><strong>Package Name:</strong> {bookingModal.data.packageName}</div>
                    <div className="mb-2"><strong>Destination:</strong> {bookingModal.data.destinationName}</div>
                    <div className="mb-2"><strong>Travel Date:</strong> {new Date(bookingModal.data.travelDate).toLocaleDateString()}</div>
                    <div className="mb-2"><strong>Guests Count:</strong> {bookingModal.data.numberOfPeople}</div>
                    <div className="mb-0"><strong>Status:</strong> <span className="text-capitalize">{bookingModal.data.status}</span></div>
                  </div>
                </div>
                {bookingModal.data.message && (
                  <div className="mb-2">
                    <h6 className="fw-bold text-uppercase text-muted small mb-2" style={{ letterSpacing: '0.05em' }}>Message / Notes</h6>
                    <div className="p-3 bg-light rounded-3 text-secondary" style={{ whiteSpace: 'pre-wrap', fontStyle: 'italic', fontSize: '0.9rem' }}>
                      "{bookingModal.data.message}"
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-top d-flex gap-2 justify-content-end bg-light">
                <button onClick={() => setBookingModal({ isOpen: false, data: null })} className="btn btn-outline-secondary px-4 rounded-pill">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL TAB CONTENT OVERLAYS FOR DESTINATIONS, PACKAGES, BOOKINGS */}
      <AnimatePresence>
        {['destinations', 'packages', 'bookings'].includes(activeTab) && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1030, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', cursor: 'pointer', padding: '20px' }}
            onClick={() => { setActiveTab('overview'); setSearchTerm(''); }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden" 
              style={{ width: '100%', maxWidth: '1200px', height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="p-4 text-white d-flex align-items-center justify-content-between"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <div>
                  <h5 className="mb-0 fw-bold font-playfair text-capitalize">{activeTab} Management</h5>
                  <span className="small text-white-50" style={{ fontSize: '0.75rem' }}>Modify and view database records directly.</span>
                </div>
                <button onClick={() => { setActiveTab('overview'); setSearchTerm(''); }} className="text-white hover-white-50 border-0 bg-transparent"><X size={24} /></button>
              </div>

              {/* Sub-header controls */}
              <div className="p-4 bg-light border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="position-relative">
                  <span className="position-absolute translate-middle-y start-0 ps-3 text-muted" style={{ top: '50%' }}>
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    className="form-control ps-5 rounded-pill border-0 shadow-sm"
                    style={{ width: '280px', background: 'white' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2">
                  {activeTab === 'destinations' && (
                    <button onClick={() => openDestModal('create')} className="btn btn-primary-custom py-2 rounded-pill px-4">
                      <Plus size={16} className="me-1" /> Add Destination
                    </button>
                  )}
                  {activeTab === 'packages' && (
                    <button onClick={() => openPkgModal('create')} className="btn btn-primary-custom py-2 rounded-pill px-4">
                      <Plus size={16} className="me-1" /> Add Package
                    </button>
                  )}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-4 overflow-y-auto flex-grow-1">
                {activeTab === 'destinations' && (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                      <thead className="table-light text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        <tr>
                          <th>Image</th>
                          <th>Destination</th>
                          <th>Location / Country</th>
                          <th>Price</th>
                          <th>Duration</th>
                          <th>Rating (Reviews)</th>
                          <th className="text-end px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDestinations.map((d) => (
                          <tr key={d._id}>
                            <td>
                              <img src={d.image} alt={d.name} className="rounded-3 shadow-sm" style={{ width: '65px', height: '45px', objectFit: 'cover' }} />
                            </td>
                            <td>
                              <div className="fw-bold text-dark">{d.name}</div>
                              {d.badge?.text && <span className="badge bg-primary bg-opacity-10 text-primary small py-1 px-2 rounded-2 mt-1 border border-primary border-opacity-15">{d.badge.text}</span>}
                            </td>
                            <td>{d.location}, {d.country}</td>
                            <td className="fw-bold text-dark">${d.price}</td>
                            <td>{d.duration}</td>
                            <td>⭐ {d.rating} <span className="small text-muted">({d.reviews})</span></td>
                            <td className="text-end px-4">
                              <div className="d-flex gap-2 justify-content-end">
                                <button onClick={() => openDestModal('edit', d)} className="btn btn-sm btn-light border text-primary d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Edit Destination"><Edit size={14} /></button>
                                <button onClick={() => deleteDest(d._id)} className="btn btn-sm btn-light border text-danger d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Delete Destination"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredDestinations.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">No matching destinations found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                      <thead className="table-light text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        <tr>
                          <th>Image</th>
                          <th>Package Name</th>
                          <th>Destination</th>
                          <th>Category</th>
                          <th>Price (Type)</th>
                          <th>Duration</th>
                          <th>Features Count</th>
                          <th className="text-end px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPackages.map((p) => (
                          <tr key={p._id}>
                            <td>
                              <img src={p.image} alt={p.name} className="rounded-3 shadow-sm" style={{ width: '65px', height: '45px', objectFit: 'cover' }} />
                            </td>
                            <td>
                              <div className="fw-bold text-dark">{p.name}</div>
                              {p.badge?.text && <span className="badge bg-secondary bg-opacity-10 text-secondary small py-1 px-2 rounded-2 mt-1 border border-secondary border-opacity-15">{p.badge.text}</span>}
                            </td>
                            <td>{p.destination}</td>
                            <td className="text-capitalize"><span className="badge bg-white text-dark border rounded-2 px-2.5 py-1">{p.category}</span></td>
                            <td>
                              <div className="fw-bold text-dark">${p.price}</div>
                              <span className="small text-muted">{p.priceType}</span>
                            </td>
                            <td>{p.duration}</td>
                            <td><span className="small fw-semibold">{p.features?.length || 0} features</span></td>
                            <td className="text-end px-4">
                              <div className="d-flex gap-2 justify-content-end">
                                <button onClick={() => openPkgModal('edit', p)} className="btn btn-sm btn-light border text-primary d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Edit Package"><Edit size={14} /></button>
                                <button onClick={() => deletePkg(p._id)} className="btn btn-sm btn-light border text-danger d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Delete Package"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredPackages.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center py-4 text-muted">No matching packages found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                      <thead className="table-light text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        <tr>
                          <th>Customer Info</th>
                          <th>Package Detail</th>
                          <th>Travel Date</th>
                          <th>Guests</th>
                          <th>Status</th>
                          <th className="text-end px-4">Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => (
                          <tr key={b._id}>
                            <td>
                              <div className="fw-bold text-dark">{b.customerName || b.user?.name || 'Guest User'}</div>
                              <span className="small text-muted d-block">{b.customerEmail || b.user?.email || 'N/A'}</span>
                              {b.customerPhone && <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}><i className="fas fa-phone-alt me-1" style={{ fontSize: '0.7rem' }}></i>{b.customerPhone}</span>}
                            </td>
                            <td>
                              <div className="fw-semibold text-dark">{b.packageName}</div>
                              <span className="small text-muted">{b.destinationName}</span>
                            </td>
                            <td>{new Date(b.travelDate).toLocaleDateString()}</td>
                            <td>{b.numberOfPeople}</td>
                            <td>
                              <span className={`badge px-3 py-2 rounded-pill text-capitalize ${b.status === 'confirmed' ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20' : b.status === 'cancelled' ? 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20' : 'bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20'}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="text-end px-4">
                              <div className="d-flex gap-2 justify-content-end">
                                <button onClick={() => setBookingModal({ isOpen: true, data: b })} className="btn btn-sm btn-light border text-primary d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="View Details"><Eye size={14} /></button>
                                {b.status !== 'confirmed' && (
                                  <button onClick={() => updateBookingStatus(b._id, 'confirmed')} className="btn btn-sm btn-light border text-success d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Confirm Booking"><CheckCircle size={14} /></button>
                                )}
                                {b.status !== 'cancelled' && (
                                  <button onClick={() => updateBookingStatus(b._id, 'cancelled')} className="btn btn-sm btn-light border text-warning d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Cancel Booking"><XCircle size={14} /></button>
                                )}
                                <button onClick={() => deleteBooking(b._id)} className="btn btn-sm btn-light border text-danger d-inline-flex align-items-center justify-content-center p-0 rounded-circle shadow-sm" style={{ width: '34px', height: '34px', minWidth: '34px' }} title="Delete Record"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredBookings.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">No matching bookings found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY FORM MODAL */}
      <AnimatePresence>
        {galModal.isOpen && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
            onClick={() => setGalModal({ ...galModal, isOpen: false })}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden" 
              style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-4 text-white d-flex align-items-center justify-content-between"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
              >
                <h5 className="mb-0 fw-bold font-playfair">{galModal.mode === 'create' ? 'Add Photo to Gallery' : 'Edit Gallery Photo'}</h5>
                <button onClick={() => setGalModal({ ...galModal, isOpen: false })} className="text-white hover-white-50 border-0 bg-transparent"><X size={20} /></button>
              </div>
              <form onSubmit={submitGalForm} className="p-4 overflow-y-auto flex-grow-1">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Photo Title</label>
                    <input type="text" required className="form-control rounded-3" placeholder="e.g. Maldives Sunset" value={galForm.title} onChange={(e) => setGalForm({ ...galForm, title: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Category</label>
                    <select className="form-select rounded-3 text-capitalize" value={galForm.category} onChange={(e) => setGalForm({ ...galForm, category: e.target.value })}>
                      <option value="beaches">Beaches</option>
                      <option value="mountains">Mountains</option>
                      <option value="cities">Cities</option>
                      <option value="wildlife">Wildlife</option>
                      <option value="hotels">Hotels</option>
                      <option value="adventure">Adventure</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Location (Optional)</label>
                    <input type="text" className="form-control rounded-3" placeholder="e.g. Maldives" value={galForm.location} onChange={(e) => setGalForm({ ...galForm, location: e.target.value })} />
                  </div>
                  
                  {/* IMAGE UPLOAD FROM PC */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Photo File (Upload from PC or URL)</label>
                    <div className="d-flex gap-2 align-items-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="form-control rounded-3" 
                        onChange={(e) => handleImageUpload(e.target.files[0], 'gal')} 
                      />
                      {galForm.image && (
                        <img src={galForm.image} alt="Preview" className="rounded-3 shadow-sm border" style={{ width: '60px', height: '42px', objectFit: 'cover' }} />
                      )}
                    </div>
                    <input type="text" required className="form-control rounded-3 mt-2" placeholder="Image URL / Path (auto-filled on upload)" value={galForm.image} onChange={(e) => setGalForm({ ...galForm, image: e.target.value })} />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Description (Optional)</label>
                    <textarea rows="2" className="form-control rounded-3" placeholder="Stunning sunset captured on the island..." value={galForm.description} onChange={(e) => setGalForm({ ...galForm, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button type="button" onClick={() => setGalModal({ ...galModal, isOpen: false })} className="btn btn-outline-secondary px-4 rounded-pill">Cancel</button>
                  <button type="submit" className="btn btn-primary-custom px-4 rounded-pill">Save Photo</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div 
            className="modal-backdrop-custom d-flex align-items-center justify-content-center" 
            style={{ position: 'fixed', inset: 0, zIndex: 1080, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
            onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white rounded-4 shadow-2xl overflow-hidden p-4 text-center" 
              style={{ width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 p-3"
                style={{ 
                  background: confirmModal.iconType === 'delete' ? 'rgba(239, 68, 68, 0.12)' : confirmModal.iconType === 'update' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(14, 165, 233, 0.12)',
                  color: confirmModal.iconType === 'delete' ? '#EF4444' : confirmModal.iconType === 'update' ? '#10B981' : '#0EA5E9'
                }}
              >
                {confirmModal.iconType === 'delete' && <AlertTriangle size={32} />}
                {confirmModal.iconType === 'create' && <Plus size={32} />}
                {confirmModal.iconType === 'update' && <Edit size={32} />}
              </div>
              <h5 className="fw-bold text-dark font-playfair mb-2">{confirmModal.title}</h5>
              <p className="text-secondary small mb-4">{confirmModal.message}</p>
              <div className="d-flex gap-2 justify-content-center">
                <button 
                  type="button" 
                  onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} 
                  className="btn btn-light border px-4 rounded-pill fw-semibold text-secondary"
                  style={{ minWidth: '110px' }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={async () => {
                    const action = confirmModal.onConfirm;
                    setConfirmModal({ ...confirmModal, isOpen: false });
                    if (action) await action();
                  }} 
                  className={`btn ${confirmModal.confirmBtnClass} px-4 rounded-pill fw-semibold text-white shadow-sm`}
                  style={{ minWidth: '110px' }}
                >
                  {confirmModal.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default AdminDashboard;
