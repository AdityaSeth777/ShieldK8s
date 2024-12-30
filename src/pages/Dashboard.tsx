import React, { useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import MetricsGrid from '../components/metrics/MetricsGrid';
import AlertsSection from '../components/alerts/AlertsSection';
import NetworkMap from '../components/NetworkMap';
import SimulatedDataBanner from '../components/SimulatedDataBanner';
import AlertNotification from '../components/notifications/AlertNotification';
import { useMetrics } from '../hooks/useMetrics';
import { useAlerts } from '../hooks/useAlerts';
import { useNetworkConnections } from '../hooks/useNetworkConnections';
import { useNotifications } from '../hooks/useNotifications';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from '../store/preferences';
import { TimeRange } from '../types';

const Dashboard: React.FC = () => {
  const [preferences] = useAtom(userPreferencesAtom);
  const cpuMetrics = useMetrics();
  const memoryMetrics = useMetrics();
  const networkMetrics = useMetrics();
  const { alerts, filter, setFilter } = useAlerts();
  const { connections } = useNetworkConnections();
  const { currentNotification, showNotification, dismissNotification } = useNotifications();
  const lastNotificationTime = useRef<number>(0);

  useEffect(() => {
    if (!alerts.length || !preferences.notifications) return;

    const now = Date.now();
    if (now - lastNotificationTime.current >= preferences.notificationInterval) {
      const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
      if (criticalAlerts.length > 0) {
        showNotification(criticalAlerts[0]);
        lastNotificationTime.current = now;
      }
    }
  }, [alerts, preferences.notifications, preferences.notificationInterval, showNotification]);

  const handleTimeRangeChange = (range: TimeRange) => {
    cpuMetrics.setTimeRange(range);
    memoryMetrics.setTimeRange(range);
    networkMetrics.setTimeRange(range);
  };

  return (
    <div className={preferences.darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <Navbar />
        <div className="pt-16 px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <SimulatedDataBanner />
            
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
        </div>

        {currentNotification && (
          <AlertNotification
            alert={currentNotification}
            onClose={dismissNotification}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;