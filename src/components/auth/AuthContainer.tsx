import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Shield } from 'lucide-react';

const AuthContainer: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-cyber-grid">
      <div className="mb-8 text-center">
        <Shield className="w-16 h-16 text-cyber-blue mx-auto mb-4 animate-pulse-slow" />
        <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Powered by eBPF and Cilium</p>
      </div>

      {showLogin ? (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthContainer;