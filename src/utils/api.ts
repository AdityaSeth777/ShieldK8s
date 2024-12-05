import { MetricData, TimeRange, SecurityAlert, NetworkConnection } from '../types';

// Simulated API calls - replace with actual API endpoints
export const fetchMetricsData = async (timeRange: TimeRange): Promise<MetricData[]> => {
  const now = Date.now();
  const hours = timeRange === '1h' ? 1 : timeRange === '12h' ? 12 : 24;
  return Array.from({ length: hours }, (_, i) => ({
    timestamp: new Date(now - i * 3600000).toISOString(),
    value: 20 + Math.random() * 60
  }));
};

export const fetchAlerts = async (): Promise<SecurityAlert[]> => {
  const severities: Array<SecurityAlert['severity']> = ['critical', 'high', 'medium', 'low'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    severity: severities[Math.floor(Math.random() * severities.length)],
    message: 'Security event detected',
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    source: `192.168.1.${Math.floor(Math.random() * 255)}`,
    destination: `10.0.0.${Math.floor(Math.random() * 255)}`
  }));
};

export const fetchNetworkConnections = async (): Promise<NetworkConnection[]> => {
  const protocols = ['TCP', 'UDP'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    source: `10.0.0.${Math.floor(Math.random() * 255)}`,
    destination: `10.0.0.${Math.floor(Math.random() * 255)}`,
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    bytesTransferred: Math.floor(Math.random() * 50000),
    status: Math.random() > 0.2 ? 'allowed' : 'blocked'
  }));
};