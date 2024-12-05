export interface SecurityAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
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