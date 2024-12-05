import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { SecurityAlert } from '../types';

interface AlertPanelProps {
  alerts: SecurityAlert[];
}

const severityIcons = {
  critical: <AlertCircle className="w-5 h-5 text-red-500" />,
  high: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  medium: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  low: <Info className="w-5 h-5 text-blue-500" />
};

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Security Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border-l-4 border-l-red-500 bg-gray-800 bg-opacity-50 p-4 rounded"
          >
            <div className="flex items-start">
              <div className="mr-3">{severityIcons[alert.severity]}</div>
              <div>
                <p className="font-medium text-white">{alert.message}</p>
                <div className="text-sm text-gray-300 mt-1">
                  <p>Source: {alert.source}</p>
                  <p>Destination: {alert.destination}</p>
                  <p>Time: {new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;