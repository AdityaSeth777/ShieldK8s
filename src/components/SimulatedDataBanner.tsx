import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SimulatedDataBanner: React.FC = () => {
  return (
    <div className="bg-yellow-900/20 border border-yellow-600/30 text-yellow-200 px-4 py-2 rounded-lg mb-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <p className="text-sm">
          Currently displaying simulated data. Configure API endpoints and environment variables to connect to live data.
        </p>
      </div>
    </div>
  );
};

export default SimulatedDataBanner;