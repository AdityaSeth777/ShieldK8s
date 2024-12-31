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
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="col-span-1 lg:col-span-3 xl:col-span-1">
        <MetricsChart
          data={cpuMetrics}
          title="CPU Usage"
          color="cyber-blue"
        />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-1">
        <MetricsChart
          data={memoryMetrics}
          title="Memory Usage"
          color="cyber-green"
        />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-1">
        <MetricsChart
          data={networkMetrics}
          title="Network Traffic"
          color="cyber-purple"
        />
      </div>
    </div>
  );
};

export default MetricsGrid;