import React from 'react';
import { Shield, RefreshCw, Settings } from 'lucide-react';
import TimeRangeSelector from '../TimeRangeSelector';
import { TimeRange } from '../../types';

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefresh: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  onRefresh,
  onSettingsClick,
}) => {
  return (
    <nav className="bg-cyber-black/80 border-b border-cyber-blue/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-cyber-blue animate-pulse-slow" />
            <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              Security Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} />
            <button
              onClick={onRefresh}
              className="p-2 rounded-full hover:bg-cyber-blue/10 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-cyber-blue" />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-full hover:bg-cyber-blue/10 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-cyber-blue" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;