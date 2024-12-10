import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Shield, Home, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from '../../store/preferences';

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);

  const handleLogout = () => {
    auth.signOut();
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const isActive = (path: string) => location.pathname === path;

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

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-cyber-blue/20 text-cyber-blue' 
                    : `${preferences.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                <Home className="w-5 h-5" />
              </Link>
              
              <Link
                to="/profile"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'bg-cyber-blue/20 text-cyber-blue'
                    : `${preferences.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-6 h-6 rounded-full ring-2 ring-cyber-blue/50"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Link>
              
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

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;