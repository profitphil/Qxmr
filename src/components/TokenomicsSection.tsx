import React, { useEffect, useRef } from 'react';
import { ChartPieIcon } from '../utils/CustomIcons';

const TokenomicsSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetWidth;
      }
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Tokenomics data
    const data = [
      { label: 'Airdrop', percentage: 50, color: '#22d3ee' },
      { label: 'Burn', percentage: 16.1, color: '#3b82f6' },
      { label: 'Liquidity', percentage: 16.1, color: '#06b6d4' },
      { label: 'Team', percentage: 10, color: '#0ea5e9' },
      { label: 'Rewards', percentage: 6.8, color: '#0284c7' },
      { label: 'Founder', percentage: 1, color: '#0369a1' }
    ];
    
    // Draw pie chart
    const drawPieChart = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      let startAngle = 0;
      
      data.forEach(segment => {
        const endAngle = startAngle + (segment.percentage / 100) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = segment.color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        startAngle = endAngle;
      });
      
      // Add center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add text in center
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('161B', centerX, centerY - 10);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.fillText('Total Supply', centerX, centerY + 15);
    };
    
    drawPieChart();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  const tokenomicsData = [
    { label: 'Airdrop for Qubicans', percentage: '50%', description: 'Half of all tokens distributed to the Qubic community' },
    { label: 'Burn Allocation', percentage: '16.1%', description: 'Tokens permanently removed from circulation' },
    { label: 'Liquidity Pools', percentage: '16.1%', description: 'Ensuring trading liquidity across various platforms' },
    { label: 'Team Allocation', percentage: '10%', description: 'Reserved for the development and operations team' },
    { label: 'Rewards & Giveaways', percentage: '6.8%', description: 'Community incentives and promotional activities' },
    { label: 'Founder (CFB)', percentage: '1%', description: 'Allocation to our visionary founder' }
  ];

  return (
    <section id="tokenomics" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-blue-900/10 to-black/10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <ChartPieIcon className="h-8 w-8 text-cyan-400 mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">Tokenomics</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              QXMR Token Distribution
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            With a total supply of 161 billion tokens, QXMR has been carefully designed with a 
            community-focused distribution model commemorating our historic Epoch 161 achievement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square relative max-w-md mx-auto">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
          </div>
          
          <div>
            <div className="space-y-6">
              {tokenomicsData.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="sm:w-24 flex-shrink-0">
                    <div className="text-xl font-bold text-white">{item.percentage}</div>
                    <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{item.label}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <p className="text-cyan-400 font-medium mb-1">Historic Token Supply</p>
              <p className="text-gray-300 text-sm">
                The total supply of 161 billion QXMR tokens directly commemorates Epoch 161, 
                when Qubic made history by successfully mining XMR for the first time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;