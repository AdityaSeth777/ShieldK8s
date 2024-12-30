import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from '../store/preferences';
import { SecurityAlert } from '../types';

export const useNotifications = () => {
  const [preferences] = useAtom(userPreferencesAtom);
  const [currentNotification, setCurrentNotification] = useState<SecurityAlert | null>(null);

  const showNotification = useCallback((alert: SecurityAlert) => {
    if (preferences.notifications) {
      setCurrentNotification(alert);
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    }
  }, [preferences.notifications]);

  const dismissNotification = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  return {
    currentNotification,
    showNotification,
    dismissNotification
  };
};