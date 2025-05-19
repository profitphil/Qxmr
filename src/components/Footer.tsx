import React from 'react';
import { Cpu, Twitter, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-sm pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Cpu className="h-8 w-8 text-cyan-400 mr-2" />
              <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                QUBIC
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Pioneering the future of blockchain technology with quantum-resistant mining solutions. 
              Epoch 161 marks the beginning of a new era in cryptocurrency mining.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Mail, ExternalLink].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Team', 'Tokenomics', 'Roadmap', 'FAQ'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Community</h3>
            <ul className="space-y-2">
              {['Discord', 'Telegram', 'Twitter', 'Medium', 'GitHub'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 QUBIC. All rights reserved. QXMR Token Celebration.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Contact'].map((item, index) => (
                <a key={index} href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;