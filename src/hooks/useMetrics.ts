import { useState, useEffect } from 'react';
import { MetricData, TimeRange } from '../types';
import { fetchMetricsData } from '../utils/api';

export const useMetrics = (initialData: MetricData[] = []) => {
  const [data, setData] = useState<MetricData[]>(initialData);
  const [timeRange, setTimeRange] = useState<TimeRange>('12h');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const newData = await fetchMetricsData(timeRange);
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // Update every second
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [timeRange]);

  return { data, timeRange, setTimeRange, isLoading, error, refresh };
};