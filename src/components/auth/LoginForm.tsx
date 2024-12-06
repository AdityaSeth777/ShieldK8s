import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Shield, AlertCircle } from 'lucide-react';

const LoginForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, 'demo@securitydash.com', 'demo123');
    } catch (err: any) {
      console.error('Demo login error:', err);
      setError('Demo login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-96 backdrop-blur-lg border border-cyber-blue/20">
      <div className="flex justify-center mb-6">
        <Shield className="w-12 h-12 text-cyber-blue animate-pulse-slow" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Security Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-cyber-black/60 border border-cyber-blue/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50"
            disabled={loading}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-cyber-black/60 border border-cyber-blue/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50"
            disabled={loading}
          />
        </div>
        {error && (
          <div className="flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-white rounded transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3 bg-cyber-purple/20 hover:bg-cyber-purple/30 text-white rounded transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading Demo...' : 'Try Demo Account'}
        </button>
        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-cyber-blue hover:text-cyber-blue/80"
            disabled={loading}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;