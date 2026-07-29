import './BlogPage.css';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Top 10 Places To Visit in 2026',
      category: 'Destinations',
      image: '/images/gal-travel.jpg',
      author: 'Sarah Miles',
      date: 'Jan 15, 2026',
      readTime: '5 min read',
      excerpt: "Looking for your next big adventure? We've scoured the globe to bring you the most extraordinary destinations to add to your bucket list this year. From the dramatic fjords of Norway to the hidden temples of Cambodia, 2026 promises a world of discovery for curious travelers willing to explore beyond the familiar."
    },
    {
      id: 2,
      title: 'The Ultimate Budget Travel Guide',
      category: 'Tips',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
      author: 'James Park',
      date: 'Feb 3, 2026',
      readTime: '5 min read',
      excerpt: "Traveling the world doesn't have to drain your savings. With the right strategies, you can explore stunning destinations, stay in comfortable accommodation, eat delicious local food, and have incredible experiences – all without breaking the bank. Discover our tried-and-tested budget travel secrets that seasoned globetrotters swear by."
    },
    {
      id: 3,
      title: 'Complete Packing Guide for Long Trips',
      category: 'Travel Tips',
      image: '/images/blog-packing.jpg',
      author: 'Emma Walsh',
      date: 'Feb 20, 2026',
      readTime: '5 min read',
      excerpt: "Packing for a long trip is an art form that takes practice to master. Too much and you're weighed down; too little and you'll be shopping in every city. Our comprehensive packing guide walks you through everything from choosing the right luggage to creating a foolproof checklist that ensures you never forget the essentials again."
    },
    {
      id: 4,
      title: 'Best Honeymoon Destinations 2026',
      category: 'Romance',
      image: '/images/dest-maldives.jpg',
      author: 'Maria Costa',
      date: 'Mar 5, 2026',
      readTime: '5 min read',
      excerpt: "Your honeymoon should be the most magical trip of your life, and choosing the right destination sets the tone for your journey together. From the overwater bungalows of the Maldives to the cliffside villages of Santorini, we've curated the most breathtakingly romantic destinations to help you begin your forever in style."
    },
    {
      id: 5,
      title: "The Solo Traveler's Complete Guide",
      category: 'Solo Travel',
      image: '/images/blog-solo.jpg',
      author: 'Alex Kim',
      date: 'Mar 18, 2026',
      readTime: '5 min read',
      excerpt: "Solo travel is one of the most empowering experiences a person can have. It builds confidence, independence, and a profound sense of self-discovery. Whether you're a first-time solo adventurer or a seasoned independent explorer, this guide covers safety, social strategies, budgeting, and the best solo-friendly destinations for every personality."
    },
    {
      id: 6,
      title: 'Family Vacation Ideas That Everyone Loves',
      category: 'Family',
      image: '/images/dest-bali.jpg',
      author: 'David Santos',
      date: 'Apr 2, 2026',
      readTime: '5 min read',
      excerpt: "Planning a family vacation that genuinely excites everyone from toddlers to grandparents is a true challenge. The key is finding destinations that offer a rich mix of activities, educational experiences, and downtime. We've handpicked our favorite family-friendly destinations and activities that create lifelong memories for all ages."
    },
    {
      id: 7,
      title: 'Adventure Travel: Pushing Your Limits',
      category: 'Adventure',
      image: '/images/pkg-swiss.jpg',
      author: 'Tom Reed',
      date: 'Apr 15, 2026',
      readTime: '5 min read',
      excerpt: "Adventure travel isn't just about the physical thrill – it's about confronting your fears, discovering hidden strengths, and experiencing the world in a raw and unfiltered way. From trekking through the Himalayas to white-water rafting the Amazon, we explore the world's most exhilarating adventures for thrill-seekers of every level."
    },
    {
      id: 8,
      title: 'Best Time to Visit Europe: Month by Month',
      category: 'Europe',
      image: '/images/dest-paris.jpg',
      author: 'Sophie Laurent',
      date: 'May 1, 2026',
      readTime: '5 min read',
      excerpt: "Europe is a year-round destination but knowing the best time to visit each country can make an enormous difference to your experience. From the tulip fields of Holland in spring to the Christmas markets of Germany in winter, each month brings its own unique magic. Our month-by-month guide helps you plan the perfect European getaway."
    }
  ];

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! We will keep you updated with the latest travel stories.');
    e.target.reset();
  };

  return (
    <>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-packages.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Blog hero"
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 py-5">
              <div className="breadcrumb-nav mb-3">
                <Link to="/">Home</Link>
                <i className="fas fa-chevron-right"></i>
                <span>Blog</span>
              </div>
              <h1 className="page-hero-title">
                Travel Tips &amp; <span style={{ color: '#0EA5E9' }}>Inspiration</span>
              </h1>
              <p className="page-hero-subtitle">
                Expert travel guides, tips, and stories to fuel your wanderlust and help you travel smarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG POSTS */}
      <section className="py-5" aria-label="Blog articles">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">
              <i className="fas fa-pen-nib me-2"></i>Latest Posts
            </span>
            <h2 className="section-title reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Travel Stories &amp; <span>Expert Guides</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal visible" style={{ opacity: 1, transform: 'none' }}>
              Stay inspired with tips, guides, and insights from our travel experts
            </p>
          </div>
          <div className="row g-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 reveal visible" style={{ opacity: 1, transform: 'none' }}>
                <article className="blog-card">
                  <div className="blog-img">
                    <img src={blog.image} alt={blog.title} loading="lazy" />
                    <div className="blog-category">{blog.category}</div>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span><i className="fas fa-user me-1"></i>{blog.author}</span>
                      <span><i className="fas fa-calendar me-1"></i>{blog.date}</span>
                      <span><i className="fas fa-clock me-1"></i>{blog.readTime}</span>
                    </div>
                    <h4 className="blog-title">{blog.title}</h4>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <a href="#" className="blog-read-more" onClick={(e) => { e.preventDefault(); alert(`Reading full article: ${blog.title}`); }}>
                      Read More <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-5 bg-alt" aria-label="Newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center reveal visible" style={{ opacity: 1, transform: 'none' }}>
              <span className="section-label">
                <i className="fas fa-envelope me-2"></i>Newsletter
              </span>
              <h2 className="section-title">
                Never Miss A <span>Travel Story</span>
              </h2>
              <div className="section-divider"></div>
              <p className="section-subtitle mb-5">
                Subscribe to our newsletter and get the latest travel tips, exclusive deals, and destination guides
                delivered straight to your inbox every week.
              </p>
              <form
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center"
                onSubmit={handleSubscribeSubmit}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  style={{
                    maxWidth: '400px',
                    borderRadius: '50px',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    border: '2px solid rgba(14,165,233,0.3)',
                  }}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn-primary-custom" style={{ whiteSpace: 'nowrap' }}>
                  <i className="fas fa-paper-plane me-2"></i>Subscribe Now
                </button>
              </form>
              <p className="mt-3" style={{ color: '#64748B', fontSize: '0.88rem' }}>
                <i className="fas fa-lock me-1"></i>No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
