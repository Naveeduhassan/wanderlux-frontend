import './Stats.css';
import { useState, useEffect, useRef } from 'react';

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
              // Ease out cubic
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
        <div className="text-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)' }}>Travel In Numbers</span>
          <h2 className="section-title mt-2" style={{ color: 'white' }}>Our Achievements <span>Speak For Themselves</span></h2>
        </div>
        <div className="row g-4" style={{ position: 'relative', zIndex: 1 }}>
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-6">
              <div className="stat-item reveal visible" style={{ opacity: 1, transform: 'none' }}>
                <div className="stat-icon"><i className={stat.icon}></i></div>
                <Counter target={stat.target} suffix={stat.suffix} />
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
