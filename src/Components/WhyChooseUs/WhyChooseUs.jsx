import './WhyChooseUs.css';
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
        <div className="section-header center">
          <span className="section-label"><i className="fas fa-award me-2"></i>Why Us</span>
          <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>Why Thousands Of Travelers <span>Choose Us</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>We deliver exceptional travel experiences backed by years of expertise and dedication</p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6 reveal visible" style={{ opacity: 1, transform: 'none' }}>
              <div className="feature-card">
                <div className="feature-icon"><i className={feature.icon}></i></div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
