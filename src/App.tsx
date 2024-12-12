import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from './store/preferences';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AuthContainer from './components/auth/AuthContainer';

function App() {
  const [user] = useAuthState(auth);
  const [preferences] = useAtom(userPreferencesAtom);

  return (
    <Router>
      <div className={`min-h-screen ${
        preferences.darkMode 
          ? 'bg-cyber-black text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthContainer />} />
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;