import React, { useEffect, useRef } from 'react';
import { Zap, ChevronsDown } from 'lucide-react';
import ParticleNetwork from '../utils/ParticleNetwork';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const network = new ParticleNetwork(canvas);
      return () => network.destroy();
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-6 py-2 border border-cyan-500/30 rounded-full bg-cyan-900/10 backdrop-blur-sm">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-cyan-400 mr-2" />
              <span className="text-sm font-medium">Historic Achievement: XMR Mining Begins</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
              Qubic Successfully Mines
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              First XMR in Epoch 161
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
            A revolutionary milestone in the Qubic ecosystem marks the beginning of a new era 
            in quantum-resistant mining technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#about"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-white font-medium"
            >
              Learn More
            </a>
            <a 
              href="#tokenomics"
              className="px-8 py-3 rounded-lg bg-transparent border border-cyan-500 hover:bg-cyan-900/20 transition-all duration-300 text-white font-medium"
            >
              QXMR Tokenomics
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a href="#about" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            <ChevronsDown className="h-8 w-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;