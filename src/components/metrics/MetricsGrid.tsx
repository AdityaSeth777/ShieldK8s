import React from 'react';
import MetricsChart from '../MetricsChart';
import { MetricData } from '../../types';

interface MetricsGridProps {
  cpuMetrics: MetricData[];
  memoryMetrics: MetricData[];
  networkMetrics: MetricData[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({
  cpuMetrics,
  memoryMetrics,
  networkMetrics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricsChart
        data={cpuMetrics}
        title="CPU Usage"
        color="cyber-blue"
      />
      <MetricsChart
        data={memoryMetrics}
        title="Memory Usage"
        color="cyber-green"
      />
      <MetricsChart
        data={networkMetrics}
        title="Network Traffic"
        color="cyber-purple"
      />
    </div>
  );
};

export default MetricsGrid;