import { useState, useEffect } from 'react';
import { NetworkConnection } from '../types';

export const useNetworkConnections = () => {
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const protocols = ['TCP', 'UDP'];
      const newConnections = Array.from({ length: 5 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        source: `10.0.0.${Math.floor(Math.random() * 255)}`,
        destination: `10.0.0.${Math.floor(Math.random() * 255)}`,
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        bytesTransferred: Math.floor(Math.random() * 50000),
        status: Math.random() > 0.2 ? 'allowed' : 'blocked'
      } as NetworkConnection));
      setConnections(newConnections);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch network connections');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
    // Update every second
    const interval = setInterval(fetchConnections, 1000);
    return () => clearInterval(interval);
  }, []);

  return { connections, isLoading, error, refresh: fetchConnections };
};