import React, { useState } from 'react';
import { Shield, AlertCircle, Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmail, signInWithGoogle } from '../../config/firebase/auth';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError('Google sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmail('demo@securitydash.com', 'demo123');
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
      
      <button
        onClick={handleGoogleSignIn}
        className="w-full py-3 px-4 mb-4 bg-white hover:bg-gray-50 text-gray-900 rounded flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-50"
        disabled={loading}
      >
        <FcGoogle className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-400">Or continue with email</span>
        </div>
      </div>

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
          className="w-full py-3 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-white rounded transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
          disabled={loading}
        >
          <Mail className="w-5 h-5" />
          <span>{loading ? 'Signing in...' : 'Sign in with Email'}</span>
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