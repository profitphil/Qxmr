import React from 'react';
import { Timer, Cpu, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Timer className="h-8 w-8 text-cyan-400" />,
      title: "Epoch 161",
      description: "The historic moment when Qubic officially began mining XMR, marking a significant milestone in blockchain innovation."
    },
    {
      icon: <Cpu className="h-8 w-8 text-cyan-400" />,
      title: "Quantum-Resistant Mining",
      description: "Utilizing cutting-edge technology to create a robust, future-proof mining solution resistant to quantum attacks."
    },
    {
      icon: <Award className="h-8 w-8 text-cyan-400" />,
      title: "Revolutionary Achievement",
      description: "The culmination of years of research and development, propelling Qubic to the forefront of cryptocurrency mining."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Historic Mining Achievement
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            A groundbreaking moment in Qubic's journey as we officially begin mining XMR, revolutionizing 
            blockchain technology with our quantum-resistant approach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">The Birth of QXMR Token</h3>
              <p className="text-gray-300 mb-6">
                In celebration of this historic achievement, the Qubic team is proud to introduce the QXMR token. 
                This groundbreaking token symbolizes the fusion between Qubic's innovative technology and the 
                established Monero ecosystem.
              </p>
              <p className="text-gray-300">
                QXMR serves as both a commemorative asset and a functional utility token within the Qubic ecosystem, 
                offering holders various benefits and participation opportunities in this revolutionary mining venture.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-800/80 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">QXMR Token Launch</h4>
                <ul className="space-y-3">
                  {[
                    "Total Supply: 161 Billion QXMR",
                    "Fair Distribution Model",
                    "Community-Focused Allocation",
                    "Commemorating Epoch 161",
                    "Powering the Qubic Ecosystem"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="mr-3 h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-xs">✓</div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;