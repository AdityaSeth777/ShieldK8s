import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useAtom } from 'jotai';
import { userPreferencesAtom } from './store/preferences';
import { usePreloader } from './hooks/usePreloader';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DocsPage from './pages/docs/DocsPage';
import AuthContainer from './components/auth/AuthContainer';
import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';

const App: React.FC = () => {
  const { user } = useAuth();
  const [preferences] = useAtom(userPreferencesAtom);
  const isLoading = usePreloader();

  return (
    <Router>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <CustomCursor />
          <div className={`min-h-screen cursor-none ${
            preferences.darkMode 
              ? 'bg-cyber-black text-gray-100' 
              : 'bg-gray-50 text-gray-900'
          }`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthContainer />} />
              <Route path="/docs/*" element={<DocsPage />} />
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
        </>
      )}
    </Router>
  );
};

export default App;