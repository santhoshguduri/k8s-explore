import React from 'react';
import TopNavigation from '../../components/common/TopNavigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import WhyChooseUs from './WhyChooseUs';
import ScaleExperience from './ScaleExperience';
import GrowSustainably from './GrowSustainably';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Offering from './Offering';

function Home() {
  return (
    <>
      <TopNavigation />
      <HeroSection />
      <WhyChooseUs />
      <ScaleExperience />
      <GrowSustainably />
      <FeaturesSection />
      <Testimonials />
      <Offering/>
      <Footer />
    </>
  );
}

export default Home;
