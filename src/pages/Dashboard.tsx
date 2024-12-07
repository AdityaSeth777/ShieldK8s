import React from 'react';
import MetricsGrid from '../components/metrics/MetricsGrid';
import AlertsSection from '../components/alerts/AlertsSection';
import NetworkMap from '../components/NetworkMap';
import { useMetrics } from '../hooks/useMetrics';
import { useAlerts } from '../hooks/useAlerts';
import { useNetworkConnections } from '../hooks/useNetworkConnections';
import { TimeRange } from '../types';

const Dashboard: React.FC = () => {
  const cpuMetrics = useMetrics();
  const memoryMetrics = useMetrics();
  const networkMetrics = useMetrics();
  const { alerts, filter, setFilter } = useAlerts();
  const { connections } = useNetworkConnections();

  const handleTimeRangeChange = (range: TimeRange) => {
    cpuMetrics.setTimeRange(range);
    memoryMetrics.setTimeRange(range);
    networkMetrics.setTimeRange(range);
  };

  return (
    <div className="space-y-6">
      <MetricsGrid
        cpuMetrics={cpuMetrics.data}
        memoryMetrics={memoryMetrics.data}
        networkMetrics={networkMetrics.data}
        timeRange={cpuMetrics.timeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsSection
          alerts={alerts}
          filter={filter}
          onFilterChange={setFilter}
        />
        <NetworkMap connections={connections} />
      </div>
    </div>
  );
};

export default Dashboard;