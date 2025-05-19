import React from 'react';

export const ChartPieIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v10h10a10 10 0 0 0-10-10Z"/>
    <path d="M12 12v10a10 10 0 0 0 10-10Z"/>
    <path d="M12 12 2 12a10 10 0 0 0 10 10Z"/>
    <path d="M12 12 2 12a10 10 0 0 1 10-10Z"/>
  </svg>
);