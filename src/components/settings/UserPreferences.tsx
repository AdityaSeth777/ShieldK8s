import React from 'react';
import { useAtom } from 'jotai';
import { Settings, Bell, Eye } from 'lucide-react';
import { userPreferencesAtom } from '../../store/preferences';

const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);

  return (
    <div className="bg-black bg-opacity-80 backdrop-blur-lg rounded-lg p-6 border border-cyber-blue/20">
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 text-cyber-blue mr-2" />
        <h2 className="text-xl font-semibold text-white">User Preferences</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-cyber-blue mr-2" />
            <span className="text-white">Alert Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-5 h-5 text-cyber-blue mr-2" />
            <span className="text-white">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;