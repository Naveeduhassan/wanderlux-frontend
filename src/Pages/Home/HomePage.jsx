import './HomePage.css';
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';
import Destinations from '../../Components/Destinations/Destinations';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
import Packages from '../../Components/Packages/Packages';
import Stats from '../../Components/Stats/Stats';
import Testimonials from '../../Components/Testimonials/Testimonials';
import CTA from '../../Components/CTA/CTA';
import Newsletter from '../../Components/Newsletter/Newsletter';
import PageTransition from '../../Components/PageTransition/PageTransition';

const HomePage = () => {
  return (
    <PageTransition>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <About />
        <Destinations />
        <WhyChooseUs />
        <Packages />
        <Stats />
        <Testimonials />
        <CTA />
        <Newsletter />
      </main>
    </PageTransition>
  );
};

export default HomePage;
