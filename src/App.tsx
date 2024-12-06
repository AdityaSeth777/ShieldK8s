import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import DashboardLayout from './components/layout/DashboardLayout';
import MetricsGrid from './components/metrics/MetricsGrid';
import AlertsSection from './components/alerts/AlertsSection';
import NetworkMap from './components/NetworkMap';
import SimulatedDataBanner from './components/SimulatedDataBanner';
import AuthContainer from './components/auth/AuthContainer';
import UserPreferences from './components/settings/UserPreferences';
import { useMetrics } from './hooks/useMetrics';
import { useAlerts } from './hooks/useAlerts';
import { useNetworkConnections } from './hooks/useNetworkConnections';
import { TimeRange } from './types';

function App() {
  const [user] = useAuthState(auth);
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

  if (!user) {
    return <AuthContainer />;
  }

  return (
    <DashboardLayout
      timeRange={cpuMetrics.timeRange}
      onTimeRangeChange={handleTimeRangeChange}
      onRefresh={handleRefresh}
      onSettingsClick={() => setShowSettings(!showSettings)}
      user={user}
    >
      <SimulatedDataBanner />
      
      {showSettings ? (
        <UserPreferences />
      ) : (
        <>
          <MetricsGrid
            cpuMetrics={cpuMetrics.data}
            memoryMetrics={memoryMetrics.data}
            networkMetrics={networkMetrics.data}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <AlertsSection
              alerts={alerts}
              filter={filter}
              onFilterChange={setFilter}
            />
            <NetworkMap connections={connections} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default App;