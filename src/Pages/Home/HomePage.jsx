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

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Destinations />
      <WhyChooseUs />
      <Packages />
      <Stats />
      <Testimonials />
      <CTA />
      <Newsletter />
    </>
  );
};

export default HomePage;
