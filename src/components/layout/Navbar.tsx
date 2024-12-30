import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Home, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from '../../store/preferences';
import { supabase } from '../../lib/supabase';
import UserAvatar from './UserAvatar';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      preferences.darkMode ? 'bg-cyber-black/90' : 'bg-white/90'
    } backdrop-blur-sm border-b ${
      preferences.darkMode ? 'border-cyber-blue/20' : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-cyber-blue animate-pulse-slow" />
            <span className={`ml-2 text-xl font-semibold ${
              preferences.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Security Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-cyber-blue/20 text-cyber-blue' 
                  : `${preferences.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <Home className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                preferences.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {preferences.darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/settings"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/settings')
                  ? 'bg-cyber-blue/20 text-cyber-blue'
                  : `${preferences.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <Settings className="w-5 h-5" />
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-2">
                <UserAvatar user={user} />
              </button>
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-cyber-black rounded-lg shadow-xl border border-cyber-blue/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;