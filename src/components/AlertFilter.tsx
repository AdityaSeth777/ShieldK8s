import React from 'react';

interface AlertFilterProps {
  value: 'all' | 'critical' | 'high' | 'medium' | 'low';
  onChange: (value: 'all' | 'critical' | 'high' | 'medium' | 'low') => void;
}

const AlertFilter: React.FC<AlertFilterProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as any)}
      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="all">All Severities</option>
      <option value="critical">Critical Only</option>
      <option value="high">High & Above</option>
      <option value="medium">Medium & Above</option>
      <option value="low">Low & Above</option>
    </select>
  );
};

export default AlertFilter;