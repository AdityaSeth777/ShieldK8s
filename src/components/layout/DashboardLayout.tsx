import React from 'react';
import { useAtom } from 'jotai';
import Header from './Header';
import { userPreferencesAtom } from '../../store/preferences';
import { User } from '@supabase/supabase-js';
import { TimeRange } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefresh: () => void;
  onSettingsClick: () => void;
  user: User;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  onSettingsClick,
  user,
}) => {
  const [preferences] = useAtom(userPreferencesAtom);

  return (
    <div className={`min-h-screen bg-cyber-black text-gray-100 bg-cyber-grid bg-[size:50px_50px] ${
      preferences.darkMode ? 'dark' : ''
    }`}>
      <Header
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        onRefresh={onRefresh}
        onSettingsClick={onSettingsClick}
        user={user}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;