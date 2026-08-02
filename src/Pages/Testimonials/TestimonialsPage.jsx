import './TestimonialsPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../Components/PageTransition/PageTransition';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ayesha Khan',
      location: 'Lahore',
      trip: 'Maldives Honeymoon',
      avatar: '/images/reviewer-ayesha.jpg',
      rating: 5,
      text: '"Maldives honeymoon bilkul perfect thi! WanderLux ne har cheez itni carefully plan ki — overwater villa se lekar beach dinner tak. Humein kuch bhi sochna nahi para. Lahore se itni achi service milna waqai unexpected tha. Zindagi bhar yaad rahega yeh trip!"'
    },
    {
      id: 2,
      name: 'Usman Ahmed',
      location: 'Karachi',
      trip: 'Japan Tour',
      avatar: '/images/reviewer-usman.jpg',
      rating: 5,
      text: '"Japan tour ne saari expectations paar kar deen. Guide bohat knowledgeable tha, hotels kamaal ke they, aur Tokyo se Kyoto ka train journey unforgettable raha. WanderLux ki team ne Karachi se book karte waqt bhi poori help ki. Highly recommend karta hun!"'
    },
    {
      id: 3,
      name: 'Fatima Malik',
      location: 'Islamabad',
      trip: 'Bali Trip',
      avatar: '/images/reviewer-fatima.jpg',
      rating: 5,
      text: '"Akele Bali jana thoda daunting lag raha tha lekin WanderLux ne itna safe aur comfortable feel karaya. Rice terraces, temples, beach — sab kuch perfect tha. Islamabad se travel karna easy tha aur 24/7 support se kabhi akela feel nahi hua. Bohat shukrguzar hun!"'
    },
    {
      id: 4,
      name: 'Tariq Mehmood',
      location: 'Faisalabad',
      trip: 'Dubai Family Trip',
      avatar: '/images/reviewer-tariq.jpg',
      rating: 5,
      text: '"Pura family Dubai gaya — 4 bachy aur hum dono. Desert safari se Burj Khalifa tak, bacchon ko sab bohat pasand aaya. WanderLux ne family package itna thoughtfully design kiya tha ke hum sirf enjoy karte rahe, koi tension nahi thi. Faisalabad se book kiya tha, service ekdum top-notch rahi!"'
    },
    {
      id: 5,
      name: 'Sana Riaz',
      location: 'Multan',
      trip: 'Switzerland Tour',
      avatar: '/images/reviewer-sana.jpg',
      rating: 5,
      text: '"Switzerland ki alps dekh ke aankhein khuli ki khuli reh gayin! WanderLux ne 8 din ka itinerary itna perfectly banaya — scenic trains, glacier hikes, aur cozy alpine hotels. Pehle socha tha itna expensive hoga, lekin package bilkul value for money tha. Multan se aayi thi — definitely dobara aaungi!"'
    },
    {
      id: 6,
      name: 'Hassan Qureshi',
      location: 'Rawalpindi',
      trip: 'Italy Tour',
      avatar: '/images/reviewer-hassan.jpg',
      rating: 4,
      text: '"Italy trip bohat achi rahi. Rome aur Venice dono cover kiye — local guide ne history itne interesting tareeqe se batai. Hotels location perfect thi. Ek din ka minor schedule issue tha lekin team ne turant solve kar diya. Overall Rawalpindi se yeh meri best international trip rahi abhi tak!"'
    },
    {
      id: 7,
      name: 'Zainab Hussain',
      location: 'Lahore',
      trip: 'Greece Trip',
      avatar: '/images/reviewer-zainab.jpg',
      rating: 5,
      text: '"Santorini — sirf naam suna tha, WanderLux ne sapna poora kar diya! Oia ka sunset, caldera view wala accommodation, wine tasting — sab kuch fairy tale jaisa tha. Teesri baar book kiya hai in se aur kabhi disappoint nahi kiya. Lahore ki best travel agency without any doubt!"'
    },
    {
      id: 8,
      name: 'Ali Raza',
      location: 'Karachi',
      trip: 'Kenya Safari',
      avatar: '/images/reviewer-ali.jpg',
      rating: 5,
      text: '"Kenya Safari meri life ki sabse incredible experience thi. Great Migration apni aankhon se dekhna ajeeb sa tha — words mein describe nahi kar sakta. WanderLux ne complex internal flights sab handle kiye. Karachi se itni achi service expect nahi thi honestly — ab poora trust kar leta hun inhe!"'
    },
    {
      id: 9,
      name: 'Nadia Shahid',
      location: 'Islamabad',
      trip: 'Paris Trip',
      avatar: '/images/reviewer-nadia.jpg',
      rating: 5,
      text: '"Paris pehli baar gaye the, language ka darr tha. WanderLux ne bilingual guide arrange kiya — itna helpful tha! Boutique hotel Eiffel Tower ke paas tha, Seine cruise magical rahi, Versailles tour unforgettable. Islamabad se book kiya tha — process bilkul smooth raha. Shukria WanderLux!"'
    },
    {
      id: 10,
      name: 'Bilal Chaudhry',
      location: 'Lahore',
      trip: 'Turkey Tour',
      avatar: '/images/reviewer-bilal.jpg',
      rating: 4,
      text: '"Turkey absolutely enchanting hai — Cappadocia mein hot air balloon mera sabse yaddagaar lamha tha! Cave hotel accommodation bohat unique tha, Istanbul ka Grand Bazaar aur Blue Mosque visits perfectly timed they. Lahore se yeh pehla international trip tha mera, aur WanderLux ki wajah se bohat confident raha!"'
    },
    {
      id: 11,
      name: 'Hina Baig',
      location: 'Sialkot',
      trip: 'Bali Trip',
      avatar: '/images/reviewer-hina.jpg',
      rating: 5,
      text: '"Bali trip poori tarah se perfect rahi. Private pool villa, local cuisine tours, temple visits — balance bilkul sahi tha. WanderLux ke local partners ke saath relations itne strong hain ke quality har jagah top level thi. Sialkot se book kiya tha — is qdr achi service ki ummeed nahi thi, par dil khush ho gaya!"'
    },
    {
      id: 12,
      name: 'Omar Farooq',
      location: 'Peshawar',
      trip: 'Maldives Trip',
      avatar: '/images/reviewer-omar.jpg',
      rating: 5,
      text: '"Maldives mein overwater bungalow, coral reef snorkeling, private beach dinner — yeh sab sirf movies mein hota hai sochta tha! WanderLux ne haqeeqat mein possible kar diya. Airport transfer se le kar wapsi tak sab flawlessly handle hua. Peshawar se travel kiya — ab in ke alawa kisi aur se book nahi karunga!"'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return <div className="stars mb-3">{stars}</div>;
  };

  return (
    <PageTransition>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-about.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Testimonials hero"
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Testimonials</span>
              </div>
              <h1 className="page-hero-title">
                Loved By Thousands Of <span style={{ color: '#0EA5E9' }}>Travelers</span>
              </h1>
              <p className="page-hero-subtitle">
                Real stories from real travelers who trusted WanderLux to create their dream vacations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5" aria-label="Customer reviews">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">
              <i className="fas fa-quote-left me-2"></i>Reviews
            </span>
            <h2 className="section-title">
              What Our <span>Travelers Say</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Genuine feedback from our wonderful community of globetrotters
            </p>
          </div>
          <motion.div 
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {testimonials.map((test) => (
              <motion.div key={test.id} variants={itemVariants} className="col-lg-4 col-md-6">
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="testimonial-card"
                >
                  {renderStars(test.rating)}
                  <p className="review-text">{test.text}</p>
                  <div className="reviewer">
                    <img src={test.avatar} alt={test.name} />
                    <div className="reviewer-info">
                      <h6>{test.name}</h6>
                      <span>{test.location} &bull; {test.trip}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS STATS */}
      <section className="py-5 bg-alt" aria-label="Company achievements">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">
              <i className="fas fa-trophy me-2"></i>Achievements
            </span>
            <h2 className="section-title">
              Our Numbers <span>Speak For Themselves</span>
            </h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="stat-card p-4 bg-white rounded-4 shadow-sm">
                <div className="stat-icon mb-3" style={{ fontSize: '2.5rem', color: '#0EA5E9' }}>
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="stat-number fw-bold" style={{ fontSize: '2rem', color: '#0F172A' }}>25,000+</h3>
                <div className="stat-label text-muted">Happy Travelers</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card p-4 bg-white rounded-4 shadow-sm">
                <div className="stat-icon mb-3" style={{ fontSize: '2.5rem', color: '#0EA5E9' }}>
                  <i className="fas fa-globe-americas"></i>
                </div>
                <h3 className="stat-number fw-bold" style={{ fontSize: '2rem', color: '#0F172A' }}>120+</h3>
                <div className="stat-label text-muted">Destinations Covered</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card p-4 bg-white rounded-4 shadow-sm">
                <div className="stat-icon mb-3" style={{ fontSize: '2.5rem', color: '#0EA5E9' }}>
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="stat-number fw-bold" style={{ fontSize: '2rem', color: '#0F172A' }}>4.9/5</h3>
                <div className="stat-label text-muted">Average Rating</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card p-4 bg-white rounded-4 shadow-sm">
                <div className="stat-icon mb-3" style={{ fontSize: '2.5rem', color: '#0EA5E9' }}>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h3 className="stat-number fw-bold" style={{ fontSize: '2rem', color: '#0F172A' }}>15 Yrs</h3>
                <div className="stat-label text-muted">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2>
              Join Thousands Of <span style={{ color: '#0EA5E9' }}>Happy Travelers</span>
            </h2>
            <p>
              Your next incredible travel story is waiting to be written. Let WanderLux make it unforgettable.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
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
    </PageTransition>
  );
};

export default TestimonialsPage;
