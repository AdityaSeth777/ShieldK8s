import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from './store/preferences';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AuthContainer from './components/auth/AuthContainer';
import SimulatedDataBanner from './components/SimulatedDataBanner';

function App() {
  const [user] = useAuthState(auth);
  const [preferences] = useAtom(userPreferencesAtom);

  if (!user) {
    return <AuthContainer />;
  }

  return (
    <Router>
      <div className={`min-h-screen ${
        preferences.darkMode 
          ? 'bg-cyber-black text-gray-100 bg-cyber-grid' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <div className="pt-16">
          <SimulatedDataBanner />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;