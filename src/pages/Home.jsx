import React from 'react';
import TopNavigation from '../components/common/TopNavigation';
import HeroSection from '../components/common/HeroSection';
import FeaturesSection from '../components/common/FeaturesSection';
import WhyChooseUs from '../components/common/WhyChooseUs';
import ScaleExperience from '../components/common/ScaleExperience';
import GrowSustainably from '../components/common/GrowSustainably';
import Testimonials from '../components/common/Testimonials';
import Footer from '../components/common/Footer';
import Offering from '../components/common/Offering';

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
