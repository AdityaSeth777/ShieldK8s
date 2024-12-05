import React from 'react';

interface TimeRangeSelectorProps {
  value: '1h' | '12h' | '24h';
  onChange: (value: '1h' | '12h' | '24h') => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex space-x-2">
      {(['1h', '12h', '24h'] as const).map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-3 py-1 rounded ${
            value === range
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;