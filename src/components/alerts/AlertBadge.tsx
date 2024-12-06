import React from 'react';
import { AlertSeverity } from '../../types';

interface AlertBadgeProps {
  severity: Exclude<AlertSeverity, 'all'>;
}

const severityColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500'
};

const AlertBadge: React.FC<AlertBadgeProps> = ({ severity }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[severity]} text-white`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default AlertBadge;