import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Stats from '../components/home/Stats';
import ImageCarousel from '../components/home/ImageCarousel';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <Header />
      <main className="pt-16">
        <Hero />
        <div className="container mx-auto px-6 py-20">
          <ImageCarousel />
        </div>
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;