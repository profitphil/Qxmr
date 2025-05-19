import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TokenomicsSection from './components/TokenomicsSection';
import GameSection from './components/GameSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-cyan-900/20 to-purple-900/20"></div>
      </div>
      
      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <AboutSection />
        <TokenomicsSection />
        <GameSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;