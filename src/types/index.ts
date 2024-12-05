export type AlertSeverity = 'all' | 'critical' | 'high' | 'medium' | 'low';
export type TimeRange = '1h' | '12h' | '24h';

export interface SecurityAlert {
  id: string;
  severity: Exclude<AlertSeverity, 'all'>;
  message: string;
  timestamp: string;
  source: string;
  destination: string;
}

export interface MetricData {
  timestamp: string;
  value: number;
}

export interface NetworkConnection {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  bytesTransferred: number;
  status: 'allowed' | 'blocked';
}