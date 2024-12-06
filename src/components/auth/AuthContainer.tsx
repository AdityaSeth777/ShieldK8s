import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black bg-cyber-grid">
      {showLogin ? (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setShowLogin(true)} />
      )}
      
      <div className="mt-8 bg-black bg-opacity-60 p-4 rounded-lg border border-cyber-blue/20 backdrop-blur-sm">
        <h3 className="text-cyber-blue font-semibold mb-2">Demo Credentials</h3>
        <p className="text-gray-300">Email: demo@securitydash.com</p>
        <p className="text-gray-300">Password: demo123</p>
      </div>
    </div>
  );
};

export default AuthContainer;