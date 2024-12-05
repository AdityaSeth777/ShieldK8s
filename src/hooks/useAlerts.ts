import { useState, useEffect } from 'react';
import { SecurityAlert } from '../types';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/alerts?severity=${filter}`);
      // const data = await response.json();
      // setAlerts(data);
      
      // Simulated data for demo
      const severities: SecurityAlert['severity'][] = ['critical', 'high', 'medium', 'low'];
      const newAlerts = Array.from({ length: 5 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        message: 'Security event detected',
        timestamp: new Date(Date.now() - i * 300000).toISOString(),
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        destination: `10.0.0.${Math.floor(Math.random() * 255)}`
      }));
      setAlerts(newAlerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [filter]);

  return { alerts, filter, setFilter, isLoading, error, refresh: fetchAlerts };
};