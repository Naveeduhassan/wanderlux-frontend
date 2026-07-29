import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="py-5 bg-alt" id="about" aria-label="About preview">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 reveal-left visible" style={{ opacity: 1, transform: 'none' }}>
            <div className="story-img-wrap position-relative">
              <img src="/images/about-story.jpg" alt="Travel planning" className="rounded-custom" />
              <div className="story-img-badge">
                <div className="badge-number">15+</div>
                <div className="badge-text">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 reveal-right visible" style={{ opacity: 1, transform: 'none' }}>
            <span className="section-label"><i className="fas fa-heart me-2"></i>About Us</span>
            <h2 className="section-title">Your Trusted <span>Travel Partner</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle text-start mb-4">
              We are passionate about creating unforgettable travel experiences for individuals, couples, families, and groups. Whether you're looking for a relaxing beach vacation, an adventurous mountain trek, or an exciting city tour, our experienced team is here to help you every step of the way.
            </p>
            <p style={{ color: '#64748B' }}>
              With over 15 years of experience, we've helped more than 25,000 travelers discover the world's most incredible destinations. Our commitment to quality, safety, and customer satisfaction has made us one of the most trusted travel agencies worldwide.
            </p>
            <ul className="list-unstyled mt-4" style={{ color: '#334155' }}>
              <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Personalized itinerary planning</li>
              <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Expert local guides and support</li>
              <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Best price guarantee</li>
            </ul>
            <Link to="/contact" className="btn-primary-custom mt-3"><i className="fas fa-arrow-right me-2"></i> Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
