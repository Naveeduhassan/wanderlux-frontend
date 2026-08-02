import './BlogPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../Components/PageTransition/PageTransition';

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
      title: 'Essential Packing Hacks for Travelers',
      category: 'Guides',
      image: '/images/blog-packing.jpg',
      author: 'Elena Rostova',
      date: 'Mar 12, 2026',
      readTime: '5 min read',
      excerpt: "Packing efficiently can mean the difference between a stress-free trip and a chaotic journey. Whether you're embarking on a weekend getaway or a month-long expedition across multiple continents, our comprehensive packing hacks will help you pack smarter, lighter, and more organized than ever before."
    },
    {
      id: 4,
      title: 'How To Plan The Perfect Honeymoon',
      category: 'Planning',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&auto=format&fit=crop&q=80',
      author: 'Ahmed Khan',
      date: 'Apr 20, 2026',
      readTime: '5 min read',
      excerpt: "Your honeymoon should be the trip of a lifetime – a romantic celebration of your new journey together. From choosing the perfect destination to balancing relaxation with adventure, our ultimate honeymoon planning guide walks you through every step of crafting a stress-free, unforgettable romantic escape."
    },
    {
      id: 5,
      title: 'Solo Travel: Tips for First-Timers',
      category: 'Tips',
      image: '/images/blog-solo.jpg',
      author: 'Sara Khan',
      date: 'May 5, 2026',
      readTime: '5 min read',
      excerpt: "Embarking on your first solo trip can feel equal parts thrilling and intimidating. Stepping out of your comfort zone to explore the world on your own terms is one of the most empowering experiences a traveler can have. Here's everything you need to know to stay safe, make friends, and thrive as a solo traveler."
    },
    {
      id: 6,
      title: 'Sustainable Tourism: Travel Responsibly',
      category: 'Eco Travel',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80',
      author: 'Hamza Siddiqui',
      date: 'Jun 18, 2026',
      readTime: '5 min read',
      excerpt: "As global travel expands, so does our collective responsibility to protect the destinations we visit. Responsible travel isn't about giving up adventures – it's about making conscious choices that support local communities, preserve fragile ecosystems, and ensure future generations can enjoy the beauty of our planet."
    }
  ];

  return (
    <PageTransition>
      {/* PAGE HERO */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/images/hero-main.jpg')",
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
            <h2 className="section-title">
              Travel Stories &amp; <span>Expert Guides</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Stay inspired with tips, guides, and insights from our travel experts
            </p>
          </div>

          <motion.div 
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {blogs.map((post) => (
              <motion.div key={post.id} variants={itemVariants} className="col-lg-4 col-md-6">
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="blog-card h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden border-0 bg-white position-relative"
                >
                  <div className="blog-img-wrap position-relative" style={{ height: '220px', overflow: 'hidden' }}>
                    <motion.img 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={post.image} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div className="blog-category position-absolute top-0 start-0 m-3 px-3 py-1 bg-primary text-white rounded-pill small fw-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="blog-body p-4 d-flex flex-column flex-grow-1">
                    <div className="blog-meta d-flex align-items-center gap-3 text-muted small mb-2">
                      <span><i className="fas fa-calendar-alt text-primary me-1"></i> {post.date}</span>
                      <span><i className="fas fa-user text-primary me-1"></i> {post.author}</span>
                    </div>
                    <h3 className="blog-title h5 fw-bold font-playfair mb-2 text-dark">{post.title}</h3>
                    <p className="blog-excerpt text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>{post.excerpt}</p>
                    
                    <div className="pt-3 border-top mt-auto d-flex align-items-center justify-content-between">
                      <span className="text-muted small"><i className="fas fa-clock me-1"></i> {post.readTime}</span>
                      <span className="blog-read-more text-primary fw-semibold small">
                        Read Article <i className="fas fa-arrow-right ms-1"></i>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-5 bg-alt" aria-label="Blog newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="section-label mb-2">
                <i className="fas fa-envelope me-2"></i>Stay Updated
              </span>
              <h2 className="section-title mb-3">
                Get Travel Inspiration <br />
                <span>Delivered To Your Inbox</span>
              </h2>
              <p className="text-secondary mb-4" style={{ lineHeight: 1.8 }}>
                Subscribe to our newsletter for exclusive travel guides, destination highlights, secret travel hacks, and early-bird package discounts.
              </p>
              <form className="d-flex flex-column flex-sm-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  className="form-control rounded-pill px-4 py-3 border-0 shadow-sm"
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                />
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit" 
                  className="btn-primary-custom" 
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <i className="fas fa-paper-plane me-2"></i>Subscribe Now
                </motion.button>
              </form>
              <p className="mt-3" style={{ color: '#64748B', fontSize: '0.88rem' }}>
                <i className="fas fa-lock me-1"></i>No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BlogPage;
