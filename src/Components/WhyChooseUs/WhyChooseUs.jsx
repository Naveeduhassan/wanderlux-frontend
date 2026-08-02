import './WhyChooseUs.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const WhyChooseUs = () => {
  const features = [
    {
      icon: 'fas fa-tag',
      title: 'Affordable Prices',
      description: 'Best price guarantee on all packages. We negotiate directly with hotels, airlines, and local operators to give you the best value.',
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Experienced Tour Guides',
      description: 'Our certified, multilingual guides bring destinations to life with deep local knowledge, passion, and professionalism.',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock to assist you before, during, and after your journey.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure Online Booking',
      description: 'Book with complete confidence. Our SSL-encrypted platform ensures your personal and payment data stays protected.',
    },
    {
      icon: 'fas fa-route',
      title: 'Personalized Tour Plans',
      description: 'Every traveler is unique. We craft custom itineraries tailored to your interests, budget, and travel style.',
    },
    {
      icon: 'fas fa-medal',
      title: 'Trusted By Thousands',
      description: 'With 25,000+ happy customers and a 4.9/5 star rating, we are proud to be one of the most trusted travel companies.',
    },
  ];

  return (
    <section className="bg-alt py-5" aria-label="Why choose us">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label"><i className="fas fa-award me-2"></i>Why Us</span>
          <h2 className="section-title">Why Thousands Of Travelers <span>Choose Us</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">We deliver exceptional travel experiences backed by years of expertise and dedication</p>
        </motion.div>

        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="col-lg-4 col-md-6">
              <motion.div 
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.12)' }}
                transition={{ duration: 0.3 }}
                className="feature-card h-100"
              >
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="feature-icon"
                >
                  <i className={feature.icon}></i>
                </motion.div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
