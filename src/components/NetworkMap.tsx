import React from 'react';
import { NetworkConnection } from '../types';
import { Activity } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

interface NetworkMapProps {
  connections: NetworkConnection[];
}

const NetworkMap: React.FC<NetworkMapProps> = ({ connections }) => {
  return (
    <div className="bg-cyber-black/40 rounded-lg border border-cyber-blue/20 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Network Connections</h2>
      <div className="space-y-4">
        {connections.map((connection) => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </div>
    </div>
  );
};

const ConnectionCard: React.FC<{ connection: NetworkConnection }> = ({ connection }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div style={props}>
      <div
        className={`flex items-center p-4 rounded-lg border ${
          connection.status === 'blocked'
            ? 'border-cyber-red/30 bg-cyber-red/5'
            : 'border-cyber-green/30 bg-cyber-green/5'
        }`}
      >
        <Activity className={`w-5 h-5 mr-3 ${
          connection.status === 'blocked' ? 'text-cyber-red' : 'text-cyber-green'
        }`} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-200">{connection.source}</span>
            <span className="text-gray-500">→</span>
            <span className="font-medium text-gray-200">{connection.destination}</span>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            <span>{connection.protocol}</span>
            <span className="mx-2">•</span>
            <span>{(connection.bytesTransferred / 1024).toFixed(2)} KB</span>
            <span className="mx-2">•</span>
            <span className={connection.status === 'blocked' ? 'text-cyber-red' : 'text-cyber-green'}>
              {connection.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default NetworkMap;