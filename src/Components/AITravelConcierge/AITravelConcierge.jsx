import './AITravelConcierge.css';
import { useState } from 'react';
import { Sparkles, X, Send, Compass, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AITravelConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [destination, setDestination] = useState('Maldives');
  const [duration, setDuration] = useState('5');
  const [budget, setBudget] = useState('3000');
  const [travelStyle, setTravelStyle] = useState('Luxury & Relaxation');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleGenerateItinerary = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/api/ai/concierge', {
        destination,
        duration: Number(duration),
        budget: Number(budget),
        travelStyle
      });
      setResult(res.data);
      toast.success(`✨ AI Itinerary generated for ${destination}!`);
    } catch (err) {
      toast.error('Could not generate AI itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookSuggestedPackage = () => {
    if (result) {
      setIsOpen(false);
      navigate(`/contact?destination=${encodeURIComponent(result.destination)}&package=${encodeURIComponent(result.suggestedPackage)}&price=$${result.estimatedPricePerPerson}&travelers=2`);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="ai-concierge-fab"
        aria-label="Toggle AI Travel Concierge Assistant"
      >
        <Sparkles size={20} className="animate-spin-slow" />
        <span>AI Concierge</span>
      </button>

      {/* Floating Concierge Dialog Window */}
      {isOpen && (
        <div className="ai-concierge-modal-card shadow-2xl">
          {/* Header */}
          <div className="ai-concierge-header">
            <div className="d-flex align-items-center gap-2">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '32px', height: '32px', background: 'rgba(14, 165, 233, 0.2)', color: '#38BDF8' }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem' }}>AI Travel Concierge</h6>
                <small className="text-info d-block" style={{ fontSize: '0.72rem' }}>Instant Luxury Itinerary Planner</small>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="btn btn-sm text-slate-400 border-0 p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="ai-concierge-body">
            {!result ? (
              <form onSubmit={handleGenerateItinerary}>
                <p className="small text-slate-300 mb-3" style={{ fontSize: '0.82rem' }}>
                  Tell us your dream trip preferences, and our AI will curate a personalized day-by-day luxury itinerary!
                </p>

                <div className="mb-3">
                  <label className="form-label text-slate-300 fw-semibold small d-flex align-items-center gap-1">
                    <Compass size={14} className="text-info" /> Destination
                  </label>
                  <select 
                    className="form-select bg-slate-800 text-white border-slate-700 form-select-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="Maldives">Maldives Islands</option>
                    <option value="Switzerland">Swiss Alps, Switzerland</option>
                    <option value="Paris">Paris & French Riviera</option>
                    <option value="Dubai">Dubai & Desert Safari</option>
                    <option value="Bali">Bali, Indonesia</option>
                    <option value="Tokyo">Tokyo & Kyoto, Japan</option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label text-slate-300 fw-semibold small d-flex align-items-center gap-1">
                      <Calendar size={14} className="text-info" /> Duration (Days)
                    </label>
                    <input 
                      type="number"
                      min="1"
                      max="14"
                      className="form-control bg-slate-800 text-white border-slate-700 form-control-sm"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-slate-300 fw-semibold small d-flex align-items-center gap-1">
                      <DollarSign size={14} className="text-info" /> Budget ($)
                    </label>
                    <input 
                      type="number"
                      step="500"
                      min="1000"
                      className="form-control bg-slate-800 text-white border-slate-700 form-control-sm"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-slate-300 fw-semibold small">Travel Style</label>
                  <select 
                    className="form-select bg-slate-800 text-white border-slate-700 form-select-sm"
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                  >
                    <option value="Luxury & Relaxation">Luxury & Overwater Resort</option>
                    <option value="Alpine Adventure & Ski">Alpine Adventure & Scenic Trains</option>
                    <option value="Honeymoon & Romantic Escapes">Honeymoon & Fine Dining</option>
                    <option value="Cultural Heritage & Cuisine">Cultural Heritage & Local Cuisine</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-100 py-2 rounded-3 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)' }}
                >
                  {loading ? (
                    <span>Generating Itinerary...</span>
                  ) : (
                    <>
                      <Send size={16} /> Generate AI Itinerary
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="badge bg-primary text-white" style={{ fontSize: '0.75rem' }}>{result.suggestedPackage}</span>
                  <button 
                    type="button" 
                    onClick={() => setResult(null)}
                    className="btn btn-sm text-info p-0 text-decoration-none"
                    style={{ fontSize: '0.78rem' }}
                  >
                    &larr; Plan Another Trip
                  </button>
                </div>

                <p className="small text-slate-300 mb-3" style={{ fontSize: '0.8rem' }}>
                  {result.aiRecommendation}
                </p>

                <h6 className="fw-bold text-white mb-2" style={{ fontSize: '0.85rem' }}>Curated Itinerary:</h6>
                {result.itinerary.map((item) => (
                  <div key={item.day} className="ai-itinerary-day-card">
                    <strong className="text-info d-block small">{item.title}</strong>
                    <span className="text-slate-300 small d-block" style={{ fontSize: '0.78rem' }}>{item.details}</span>
                  </div>
                ))}

                <button 
                  type="button"
                  onClick={handleBookSuggestedPackage}
                  className="btn btn-success w-100 mt-2 py-2 rounded-3 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                >
                  <span>Book This AI Package (${result.estimatedPricePerPerson}/person)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AITravelConcierge;
