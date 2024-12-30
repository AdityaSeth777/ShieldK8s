import React from 'react';
import { AlertCircle } from 'lucide-react';
import { SecurityAlert } from '../../types';

interface AlertNotificationProps {
  alert: SecurityAlert;
  onClose: () => void;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({ alert, onClose }) => {
  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-black/90 border border-cyber-blue/30 rounded-lg shadow-lg backdrop-blur-sm animate-slide-in">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-cyber-blue" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-white">{alert.message}</p>
            <p className="mt-1 text-sm text-gray-400">
              From: {alert.source} → {alert.destination}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;