import { atom } from 'jotai';

interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  refreshInterval: number;
  alertSeverityFilter: string[];
}

const defaultPreferences: UserPreferences = {
  notifications: true,
  darkMode: true,
  refreshInterval: 30000,
  alertSeverityFilter: ['critical', 'high'],
};

export const userPreferencesAtom = atom<UserPreferences>(defaultPreferences);