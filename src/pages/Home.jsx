import React from 'react';
import TopNavigation from '../components/common/TopNavigation';
import HeroSection from '../components/common/HeroSection';
import FeaturesSection from '../components/common/FeaturesSection';
import WhyChooseUs from '../components/common/WhyChooseUs';
import ScaleExperience from '../components/common/ScaleExperience';
import GrowSustainably from '../components/common/GrowSustainably';

function Home() {
  return (
    <>
      <TopNavigation />
      <HeroSection />
      <WhyChooseUs />
      <ScaleExperience />
      <GrowSustainably />
    </>
  );
}

export default Home;
