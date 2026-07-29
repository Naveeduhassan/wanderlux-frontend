import './Testimonials.css';
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ayesha Khan',
      location: 'Lahore, Pakistan',
      image: '/images/reviewer-ayesha.jpg',
      text: '"Maldives honeymoon bilkul perfect thi! WanderLux ne har cheez itni carefully plan ki — overwater villa se lekar beach dinner tak. Lahore se itni achi service milna waqai unexpected tha. Zindagi bhar yaad rahega yeh trip!"',
    },
    {
      name: 'Usman Ahmed',
      location: 'Karachi, Pakistan',
      image: '/images/reviewer-usman.jpg',
      text: '"Japan tour ne saari expectations paar kar deen. Guide bohat knowledgeable tha, hotels kamaal ke they. WanderLux ki team ne Karachi se book karte waqt bhi poori help ki. Highly recommend karta hun!"',
    },
    {
      name: 'Fatima Malik',
      location: 'Islamabad, Pakistan',
      image: '/images/reviewer-fatima.jpg',
      text: '"Akele Bali jana thoda daunting lag raha tha lekin WanderLux ne itna safe feel karaya. 24/7 support se kabhi akela feel nahi hua. Islamabad se travel karna bilkul easy tha. Bohat shukrguzar hun!"',
    },
  ];

  return (
    <section className="py-5 bg-alt" id="testimonials" aria-label="Testimonials">
      <div className="container">
        <div className="section-header center">
          <span className="section-label"><i className="fas fa-quote-right me-2"></i>Reviews</span>
          <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>What Our Travelers <span>Say</span></h2>
          <div className="section-divider"></div>
          <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>Real stories from real travelers who experienced the WanderLux difference</p>
        </div>
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4 col-md-6 reveal visible" style={{ opacity: 1, transform: 'none' }}>
              <div className="testimonial-card">
                <div className="quote-icon">“</div>
                <div className="star-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="review-text">{testimonial.text}</p>
                <div className="reviewer">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="reviewer-info">
                    <h5>{testimonial.name}</h5>
                    <span><i className="fas fa-map-marker-alt"></i> {testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a href="#contact" className="btn-outline-primary"><i className="fas fa-comments me-2"></i> Read All Reviews</a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
