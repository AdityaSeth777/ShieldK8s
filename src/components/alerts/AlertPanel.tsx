import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { SecurityAlert } from '../../types';
import AlertBadge from './AlertBadge';
import { format } from 'date-fns';

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
    <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 border border-cyber-blue/20">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <AlertCircle className="w-6 h-6 text-cyber-blue mr-2" />
        Security Alerts
      </h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border-l-4 border-l-cyber-blue bg-gray-800 bg-opacity-50 p-4 rounded-r transition-all hover:bg-opacity-70"
          >
            <div className="flex items-start">
              <div className="mr-3">{severityIcons[alert.severity]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{alert.message}</p>
                  <AlertBadge severity={alert.severity} />
                </div>
                <div className="text-sm text-gray-300 mt-2 space-y-1">
                  <p className="flex items-center">
                    <span className="w-20 text-gray-400">Source:</span>
                    {alert.source}
                  </p>
                  <p className="flex items-center">
                    <span className="w-20 text-gray-400">Destination:</span>
                    {alert.destination}
                  </p>
                  <p className="flex items-center">
                    <span className="w-20 text-gray-400">Time:</span>
                    {format(new Date(alert.timestamp), 'MMM d, yyyy HH:mm:ss')}
                  </p>
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