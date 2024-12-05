import React from 'react';
import { MetricData } from '../types';

interface MetricsChartProps {
  data: MetricData[];
  title: string;
  color: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-40 flex items-end space-x-1">
        {data.slice(-12).map((metric, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className={`w-full ${color}`}
              style={{
                height: `${(metric.value / maxValue) * 100}%`,
                transition: 'height 0.3s ease-in-out'
              }}
            />
            <span className="text-xs text-gray-500 mt-1 transform -rotate-45">
              {new Date(metric.timestamp).getHours()}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsChart;