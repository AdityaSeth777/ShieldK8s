import React from 'react';
import { AlertSeverity } from '../types';

interface AlertFilterProps {
  value: AlertSeverity;
  onChange: (value: AlertSeverity) => void;
}

const AlertFilter: React.FC<AlertFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AlertSeverity)}
        className="w-full px-4 py-2 bg-cyber-black/40 border border-cyber-blue/20 rounded-lg text-gray-100 appearance-none cursor-pointer focus:outline-none focus:border-cyber-blue/50"
      >
        <option value="all">All Severities</option>
        <option value="critical">Critical Only</option>
        <option value="high">High & Above</option>
        <option value="medium">Medium & Above</option>
        <option value="low">Low & Above</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default AlertFilter;