import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Cpu className="h-8 w-8 text-cyan-400 mr-2" />
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              QUBIC
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['about', 'team', 'tokenomics', 'mission', 'launch'].map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className="text-sm uppercase tracking-widest hover:text-cyan-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;