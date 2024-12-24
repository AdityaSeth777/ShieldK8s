import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Shield } from 'lucide-react';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from '../store/preferences';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [preferences] = useAtom(userPreferencesAtom);

  if (!user) return null;

  return (
    <div className={`max-w-2xl mx-auto ${
      preferences.darkMode ? 'bg-cyber-black/40' : 'bg-white'
    } rounded-lg shadow-lg p-8 backdrop-blur-sm border ${
      preferences.darkMode ? 'border-cyber-blue/20' : 'border-gray-200'
    }`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center">
          <User className="w-8 h-8 text-cyber-blue" />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${
            preferences.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {user.user_metadata?.full_name || 'User Profile'}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`p-4 rounded-lg ${
          preferences.darkMode ? 'bg-cyber-black/60' : 'bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-cyber-blue" />
            <h3 className={`font-semibold ${
              preferences.darkMode ? 'text-white' : 'text-gray-900'
            }`}>Security Status</h3>
          </div>
          <p className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Email verification: {user.email_confirmed_at ? (
              <span className="text-green-500">Verified</span>
            ) : (
              <span className="text-yellow-500">Pending</span>
            )}
          </p>
        </div>

        <div className={`p-4 rounded-lg ${
          preferences.darkMode ? 'bg-cyber-black/60' : 'bg-gray-50'
        }`}>
          <h3 className={`font-semibold mb-2 ${
            preferences.darkMode ? 'text-white' : 'text-gray-900'
          }`}>Account Details</h3>
          <div className="space-y-2">
            <p className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Created: {new Date(user.created_at).toLocaleDateString()}
            </p>
            <p className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Last Sign In: {new Date(user.last_sign_in_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;