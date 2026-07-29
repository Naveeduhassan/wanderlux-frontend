import './FAQPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [openFaqId, setOpenFaqId] = useState(1); // Q1 is open by default

  const leftFaqs = [
    {
      id: 1,
      question: 'How do I book a tour with WanderLux?',
      icon: 'fas fa-bookmark',
      answer: 'Booking with WanderLux is simple. Browse our packages or destinations, choose what interests you, then either fill in our online contact form or call us directly at +92 300 123 4567. One of our travel consultants will reach out within 24 hours to confirm details, customize your itinerary, and guide you through the secure payment process.'
    },
    {
      id: 2,
      question: 'Can I cancel my booking and get a refund?',
      icon: 'fas fa-times-circle',
      answer: "Yes, cancellations are accepted. If you cancel more than 60 days before departure, you'll receive a full refund minus a small processing fee. Cancellations between 30–60 days receive a 50% refund. Cancellations within 30 days of departure are non-refundable, but we can often offer travel credits for future bookings. Always review your specific package terms."
    },
    {
      id: 3,
      question: 'What is your refund policy?',
      icon: 'fas fa-dollar-sign',
      answer: 'Our refund policy varies depending on the package type and the time of cancellation. Standard packages follow a tiered refund schedule (60+ days: full refund; 30–60 days: 50%; under 30 days: no refund). Luxury and custom packages may have different terms. Refunds are processed within 7–14 business days back to your original payment method.'
    },
    {
      id: 4,
      question: 'Does WanderLux include flights in packages?',
      icon: 'fas fa-plane',
      answer: 'Many of our packages include international flights, clearly marked as "Flights Included" on the package detail. For packages that don\'t include flights, we can arrange them at competitive rates and add them to your booking. We partner with major airlines to secure the best fares and timing for your itinerary.'
    },
    {
      id: 5,
      question: 'Is travel insurance included?',
      icon: 'fas fa-shield-alt',
      answer: 'Travel insurance is not automatically included but is strongly recommended and can be added to any booking. We partner with leading insurers to offer comprehensive coverage including trip cancellation, medical emergencies, lost luggage, and flight delays. Premiums start from as little as $3/day. Ask your consultant for a personalized quote.'
    },
    {
      id: 6,
      question: 'Do I need a visa? Can you help?',
      icon: 'fas fa-passport',
      answer: 'Visa requirements depend on your nationality and the destination. Our team will advise you on exactly which visas are needed for your trip and provide detailed application guidance. For many popular destinations, we can assist with visa processing as part of our premium service. Always check requirements at least 8 weeks before travel.'
    },
    {
      id: 7,
      question: 'Can I create a custom tour package?',
      icon: 'fas fa-route',
      answer: 'Absolutely! Custom tours are one of our specialties. Simply tell us your destination preferences, travel dates, budget, group size, and interests – and our expert consultants will design a fully bespoke itinerary from scratch. Custom packages can combine multiple destinations and are priced based on your specific requirements.'
    },
    {
      id: 8,
      question: 'What payment methods do you accept?',
      icon: 'fas fa-credit-card',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, bank wire transfers, and select buy-now-pay-later options. All payments are processed through our SSL-encrypted secure gateway. A 25% deposit is required to confirm your booking, with the remaining balance due 45 days before departure.'
    }
  ];

  const rightFaqs = [
    {
      id: 9,
      question: 'Are packages suitable for children?',
      icon: 'fas fa-child',
      answer: 'Yes! Many of our packages are family-friendly and designed with children in mind. We offer dedicated family packages with age-appropriate activities, family accommodation, and flexible pacing. Children under 12 typically receive discounts of 20–30%. Please mention ages of children when booking so we can tailor the itinerary accordingly.'
    },
    {
      id: 10,
      question: 'Do you offer group discounts?',
      icon: 'fas fa-users',
      answer: 'Yes, we love group travel! Groups of 8 or more receive a minimum 10% discount. Groups of 15+ receive 15% off, and larger groups of 25+ can negotiate even greater savings. We also offer complimentary spaces for group leaders on qualifying group bookings. Contact us directly for a group quote.'
    },
    {
      id: 11,
      question: 'Is 24/7 support available during travel?',
      icon: 'fas fa-headset',
      answer: 'Absolutely. All WanderLux travelers have access to our dedicated 24/7 emergency support line during their trip. You\'ll also have direct contact with your personal travel coordinator. Whether it\'s a missed flight, a hotel issue, or a medical concern, our team is always just one call away to resolve any situation quickly.'
    },
    {
      id: 12,
      question: 'Can I change my travel dates after booking?',
      icon: 'fas fa-calendar-alt',
      answer: 'Date changes are possible subject to availability and may incur a modification fee starting at $50 per person. Changes requested more than 60 days before departure are usually accommodated free of charge. Changes within 30 days of departure depend entirely on availability and may involve fare differences for flights and accommodation.'
    },
    {
      id: 13,
      question: 'What documents do I need for travel?',
      icon: 'fas fa-file-alt',
      answer: 'At minimum, you\'ll need a valid passport (with at least 6 months validity beyond your return date). Depending on the destination, you may also need a visa, travel insurance certificate, vaccination records, and a return flight booking. Your WanderLux consultant will provide a complete personalized document checklist before departure.'
    },
    {
      id: 14,
      question: 'How far in advance should I book?',
      icon: 'fas fa-clock',
      answer: 'We recommend booking at least 3–6 months in advance for peak season travel (June–August and December–January). Popular destinations like the Maldives, Santorini, and the Swiss Alps sell out fast during high season. Last-minute bookings (within 4 weeks) are possible for some destinations and may offer flash discounts.'
    },
    {
      id: 15,
      question: 'Are meals included in tour packages?',
      icon: 'fas fa-utensils',
      answer: 'Meal inclusions vary by package and are always clearly stated in the package details. Options range from breakfast only, to half-board (breakfast + dinner), to full-board (all meals), to all-inclusive. Luxury and honeymoon packages often include romantic dinners and special dining experiences at no extra cost. Dietary requirements are always accommodated.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const renderFaqItem = (faq) => {
    const isOpen = openFaqId === faq.id;
    return (
      <div
        key={faq.id}
        className="accordion-item"
        style={{
          border: 'none',
          borderRadius: '12px',
          marginBottom: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          background: 'white'
        }}
      >
        <h3 className="accordion-header">
          <button
            className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={() => toggleFaq(faq.id)}
            style={{
              fontWeight: 600,
              background: 'white',
              color: '#0F172A',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className={`${faq.icon} me-3`} style={{ color: '#0EA5E9', width: '20px' }}></i>
            {faq.question}
          </button>
        </h3>
        <div
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          style={{ transition: 'all 0.3s ease-out' }}
        >
          <div className="accordion-body" style={{ color: '#64748B', lineHeight: '1.9', paddingTop: 0 }}>
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-faq.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="FAQ hero"
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>FAQ</span>
              </div>
              <h1 className="page-hero-title">
                Frequently Asked <span style={{ color: '#0EA5E9' }}>Questions</span>
              </h1>
              <p className="page-hero-subtitle">
                Everything you need to know about booking, cancellations, travel requirements, and our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-5" aria-label="Frequently asked questions">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">
              <i className="fas fa-question-circle me-2"></i>FAQ
            </span>
            <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Got <span>Questions?</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>
              We've answered the most common questions to help you plan with confidence
            </p>
          </div>
          <div className="row g-4">
            {/* Left Column: FAQ 1–8 */}
            <div className="col-lg-6 reveal-left visible" style={{ opacity: 1, transform: 'none' }}>
              <div className="faq-accordion accordion">
                {leftFaqs.map(renderFaqItem)}
              </div>
            </div>

            {/* Right Column: FAQ 9–15 */}
            <div className="col-lg-6 reveal-right visible" style={{ opacity: 1, transform: 'none' }}>
              <div className="accordion">
                {rightFaqs.map(renderFaqItem)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Still Have <span style={{ color: '#0EA5E9' }}>Questions?</span>
            </h2>
            <p className="reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Our friendly travel consultants are available to help you plan every detail of your perfect trip.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal visible" style={{ opacity: 1, transform: 'none' }}>
              <Link to="/contact" className="btn-primary-custom">
                <i className="fas fa-envelope me-2"></i>Contact Our Team
              </Link>
              <Link to="/packages" className="btn-secondary-custom">
                <i className="fas fa-suitcase me-2"></i>View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
