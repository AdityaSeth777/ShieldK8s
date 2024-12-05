import React, { useState } from 'react';
import Header from './components/layout/Header';
import AlertPanel from './components/AlertPanel';
import MetricsChart from './components/MetricsChart';
import NetworkMap from './components/NetworkMap';
import AlertFilter from './components/AlertFilter';
import SimulatedDataBanner from './components/SimulatedDataBanner';
import { useMetrics } from './hooks/useMetrics';
import { useAlerts } from './hooks/useAlerts';
import { useNetworkConnections } from './hooks/useNetworkConnections';
import { TimeRange } from './types';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const cpuMetrics = useMetrics();
  const memoryMetrics = useMetrics();
  const networkMetrics = useMetrics();
  const { alerts, filter, setFilter, refresh: refreshAlerts } = useAlerts();
  const { connections, refresh: refreshConnections } = useNetworkConnections();

  const handleTimeRangeChange = (range: TimeRange) => {
    cpuMetrics.setTimeRange(range);
    memoryMetrics.setTimeRange(range);
    networkMetrics.setTimeRange(range);
  };

  const handleRefresh = () => {
    cpuMetrics.refresh();
    memoryMetrics.refresh();
    networkMetrics.refresh();
    refreshAlerts();
    refreshConnections();
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-100 bg-cyber-grid bg-[size:50px_50px]">
      <Header
        timeRange={cpuMetrics.timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        onRefresh={handleRefresh}
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SimulatedDataBanner />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricsChart
            data={cpuMetrics.data}
            title="CPU Usage"
            color="cyber-blue"
          />
          <MetricsChart
            data={memoryMetrics.data}
            title="Memory Usage"
            color="cyber-green"
          />
          <MetricsChart
            data={networkMetrics.data}
            title="Network Traffic"
            color="cyber-purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="mb-4">
              <AlertFilter value={filter} onChange={setFilter} />
            </div>
            <AlertPanel alerts={alerts} />
          </div>
          <NetworkMap connections={connections} />
        </div>
      </main>
    </div>
  );
}

export default App;