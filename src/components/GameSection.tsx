import React, { useEffect, useRef } from 'react';
import { Gamepad } from 'lucide-react';
import PacmanGame from '../game/PacmanGame';

const GameSection = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<PacmanGame | null>(null);

  useEffect(() => {
    if (!gameContainerRef.current) return;

    const container = gameContainerRef.current;
    const game = new PacmanGame(container);
    gameInstanceRef.current = game;

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <section id="game" className="py-24 bg-gray-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Gamepad className="h-6 w-6 text-cyan-400 mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">Game Zone</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Qubic vs. XMR Blocks
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            Control Qubic and eat as many XMR blocks as possible. 
            Can you beat the high score and become a mining champion?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-30"></div>
            <div className="relative bg-black rounded-lg p-4 md:p-6 border border-cyan-500/30">
              <div ref={gameContainerRef} className="aspect-video bg-gray-900 rounded-md overflow-hidden"></div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Play', 'Pause', 'Restart', 'Controls'].map((button, index) => (
                  <button 
                    key={index}
                    className={`py-2 px-4 rounded-md ${
                      index === 0 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } font-medium transition-colors duration-200`}
                    onClick={() => {
                      if (!gameInstanceRef.current) return;
                      
                      if (index === 0) gameInstanceRef.current.start();
                      if (index === 1) gameInstanceRef.current.pause();
                      if (index === 2) gameInstanceRef.current.restart();
                      if (index === 3) alert('Use arrow keys to move Qubic and eat XMR blocks!');
                    }}
                  >
                    {button}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
                <div>Use arrow keys to move</div>
                <div>High Score: <span className="text-cyan-400">0</span></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-400">
            <p>
              Game represents Qubic's mining process in a fun, interactive way.
              Each XMR block eaten symbolizes a successful mining operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;