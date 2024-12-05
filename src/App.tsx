import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import AlertPanel from './components/AlertPanel';
import MetricsChart from './components/MetricsChart';
import NetworkMap from './components/NetworkMap';
import TimeRangeSelector from './components/TimeRangeSelector';
import AlertFilter from './components/AlertFilter';
import { useMetrics } from './hooks/useMetrics';
import { useAlerts } from './hooks/useAlerts';
import { useNetworkConnections } from './hooks/useNetworkConnections';

function App() {
  const cpuMetrics = useMetrics();
  const memoryMetrics = useMetrics();
  const networkMetrics = useMetrics();
  const { alerts, filter, setFilter, isLoading: alertsLoading, refresh: refreshAlerts } = useAlerts();
  const { connections, refresh: refreshConnections } = useNetworkConnections();

  const handleRefresh = () => {
    cpuMetrics.refresh();
    memoryMetrics.refresh();
    networkMetrics.refresh();
    refreshAlerts();
    refreshConnections();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Security Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <TimeRangeSelector
                value={cpuMetrics.timeRange}
                onChange={(range) => {
                  cpuMetrics.setTimeRange(range);
                  memoryMetrics.setTimeRange(range);
                  networkMetrics.setTimeRange(range);
                }}
              />
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricsChart
            data={cpuMetrics.data}
            title="CPU Usage"
            color="bg-blue-400"
          />
          <MetricsChart
            data={memoryMetrics.data}
            title="Memory Usage"
            color="bg-green-400"
          />
          <MetricsChart
            data={networkMetrics.data}
            title="Network Traffic"
            color="bg-purple-400"
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