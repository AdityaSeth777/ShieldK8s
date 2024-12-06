import React from 'react';
import AlertFilter from './AlertFilter';
import AlertPanel from './AlertPanel';
import { SecurityAlert, AlertSeverity } from '../../types';

interface AlertsSectionProps {
  alerts: SecurityAlert[];
  filter: AlertSeverity;
  onFilterChange: (value: AlertSeverity) => void;
}

const AlertsSection: React.FC<AlertsSectionProps> = ({
  alerts,
  filter,
  onFilterChange,
}) => {
  return (
    <div>
      <div className="mb-4">
        <AlertFilter value={filter} onChange={onFilterChange} />
      </div>
      <AlertPanel alerts={alerts} />
    </div>
  );
};

export default AlertsSection;