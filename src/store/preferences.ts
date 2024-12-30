import { atom } from 'jotai';

interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  refreshInterval: number;
  alertSeverityFilter: string[];
  notificationInterval: number; // in milliseconds
}

const defaultPreferences: UserPreferences = {
  notifications: true,
  darkMode: true,
  refreshInterval: 1000,
  alertSeverityFilter: ['critical', 'high'],
  notificationInterval: 20000, // 20 seconds
};

export const userPreferencesAtom = atom<UserPreferences>(defaultPreferences);