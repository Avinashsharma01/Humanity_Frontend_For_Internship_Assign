import React from 'react';
import {
  HeroSection,
  TrustedBySection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer,
  Header
} from './components';

const LandingPage = () => {
  return (
    <div className="bg-white">
    <Header />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;