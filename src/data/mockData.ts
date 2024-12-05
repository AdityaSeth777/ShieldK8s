import { SecurityAlert, MetricData, NetworkConnection } from '../types';

export const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    severity: 'critical',
    message: 'Unauthorized access attempt detected',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    source: '192.168.1.100',
    destination: '10.0.0.5'
  },
  {
    id: '2',
    severity: 'high',
    message: 'Suspicious outbound connection',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    source: '10.0.0.15',
    destination: '203.0.113.0'
  },
  {
    id: '3',
    severity: 'medium',
    message: 'Unusual traffic pattern detected',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: '10.0.0.8',
    destination: '10.0.0.2'
  }
];

export const mockMetrics: Record<string, MetricData[]> = {
  cpu: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: 30 + Math.random() * 40
  })),
  memory: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: 45 + Math.random() * 30
  })),
  network: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: 20 + Math.random() * 60
  }))
};

export const mockConnections: NetworkConnection[] = [
  {
    id: '1',
    source: '10.0.0.5',
    destination: '10.0.0.10',
    protocol: 'TCP',
    bytesTransferred: 15234,
    status: 'allowed'
  },
  {
    id: '2',
    source: '192.168.1.100',
    destination: '10.0.0.5',
    protocol: 'UDP',
    bytesTransferred: 8912,
    status: 'blocked'
  },
  {
    id: '3',
    source: '10.0.0.15',
    destination: '10.0.0.20',
    protocol: 'TCP',
    bytesTransferred: 23456,
    status: 'allowed'
  }
];