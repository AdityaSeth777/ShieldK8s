import React from 'react';
import { NetworkConnection } from '../types';
import { Activity } from 'lucide-react';

interface NetworkMapProps {
  connections: NetworkConnection[];
}

const NetworkMap: React.FC<NetworkMapProps> = ({ connections }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Network Connections</h2>
      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className={`flex items-center p-4 rounded-lg ${
              connection.status === 'blocked' ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            <Activity className="w-5 h-5 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{connection.source}</span>
                <span className="text-gray-500">→</span>
                <span className="font-medium">{connection.destination}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span>{connection.protocol}</span>
                <span className="mx-2">•</span>
                <span>{(connection.bytesTransferred / 1024).toFixed(2)} KB</span>
                <span className="mx-2">•</span>
                <span className={connection.status === 'blocked' ? 'text-red-600' : 'text-green-600'}>
                  {connection.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkMap;