import './Stats.css';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Counter = ({ target, suffix = '', duration = 2200 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            let start = 0;
            const startTime = performance.now();

            const update = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = start + (target - start) * eased;
              
              setCount(Math.floor(current));

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(update);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration]);

  return (
    <div ref={elementRef} className="stat-number">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Stats = () => {
  const stats = [
    {
      icon: 'fas fa-users',
      target: 25000,
      suffix: '+',
      label: 'Happy Travelers',
    },
    {
      icon: 'fas fa-route',
      target: 500,
      suffix: '+',
      label: 'Tours Completed',
    },
    {
      icon: 'fas fa-globe-americas',
      target: 120,
      suffix: '+',
      label: 'Destinations',
    },
    {
      icon: 'fas fa-trophy',
      target: 15,
      suffix: ' Yrs',
      label: 'Years Experience',
    },
  ];

  return (
    <section className="stats-section" aria-label="Travel statistics">
      <div className="container">
        <motion.div 
          className="text-center mb-5" 
          style={{ position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)' }}>Travel In Numbers</span>
          <h2 className="section-title mt-2" style={{ color: 'white' }}>Our Achievements <span>Speak For Themselves</span></h2>
        </motion.div>

        <motion.div 
          className="row g-4" 
          style={{ position: 'relative', zIndex: 1 }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="col-lg-3 col-6">
              <motion.div 
                whileHover={{ y: -6, background: 'rgba(255, 255, 255, 0.14)' }}
                transition={{ duration: 0.3 }}
                className="stat-item"
              >
                <div className="stat-icon"><i className={stat.icon}></i></div>
                <Counter target={stat.target} suffix={stat.suffix} />
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
