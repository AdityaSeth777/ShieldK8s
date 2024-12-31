import React from 'react';
import { Shield } from 'lucide-react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-cyber-black z-50 flex items-center justify-center">
      <div className="relative">
        <Shield className="w-16 h-16 text-cyber-blue animate-pulse" />
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-t-2 border-cyber-blue opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-cyber-blue rotate-45 opacity-40"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-cyber-blue rotate-90 opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;