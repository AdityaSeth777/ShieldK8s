import { useState, useEffect } from 'react';
import { MetricData } from '../types';

export const useMetrics = (initialData: MetricData[] = []) => {
  const [data, setData] = useState<MetricData[]>(initialData);
  const [timeRange, setTimeRange] = useState<'1h' | '12h' | '24h'>('12h');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/metrics?timeRange=${timeRange}`);
      // const data = await response.json();
      // setData(data);
      
      // Simulated data for demo
      const now = Date.now();
      const hours = timeRange === '1h' ? 1 : timeRange === '12h' ? 12 : 24;
      const newData = Array.from({ length: hours }, (_, i) => ({
        timestamp: new Date(now - i * 3600000).toISOString(),
        value: 20 + Math.random() * 60
      }));
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  return { data, timeRange, setTimeRange, isLoading, error, refresh: fetchMetrics };
};