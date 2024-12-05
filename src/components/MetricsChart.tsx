import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { MetricData } from '../types';

interface MetricsChartProps {
  data: MetricData[];
  title: string;
  color: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ data, title, color }) => {
  return (
    <div className="bg-cyber-white/40 rounded-lg border border-cyber-white/20 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">{title}</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--tw-colors-${color})`} stopOpacity={0.3} />
                <stop offset="95%" stopColor={`var(--tw-colors-${color})`} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(time) => format(new Date(time), 'HH:mm')}
              stroke="#4a5568"
            />
            <YAxis stroke="#4a5568" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid rgba(0, 246, 255, 0.2)',
                borderRadius: '0.375rem',
              }}
              labelFormatter={(label) => format(new Date(label), 'HH:mm:ss')}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={`var(--tw-colors-${color})`}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;