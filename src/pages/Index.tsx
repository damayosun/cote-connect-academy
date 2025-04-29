
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PopularSubjects from '@/components/PopularSubjects';
import FeaturedTutors from '@/components/FeaturedTutors';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <PopularSubjects />
        <FeaturedTutors />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
