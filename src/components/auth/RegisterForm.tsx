import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError('GitHub sign up failed. Please try again.');
    }
  };

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-96 backdrop-blur-lg border border-cyber-blue/20">
      <div className="flex justify-center mb-6">
        <UserPlus className="w-12 h-12 text-cyber-blue animate-pulse-slow" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h2>

      <button
        onClick={handleGitHubSignUp}
        className="w-full py-3 px-4 bg-[#24292e] hover:bg-[#2f363d] text-white rounded flex items-center justify-center space-x-2 transition-colors duration-200"
        disabled={loading}
      >
        <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="w-5 h-5" />
        <span>Sign up with GitHub</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-400">Or register with email</span>
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
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Creating Account...' : 'Register with Email'}
        </button>
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-cyber-blue hover:text-cyber-blue/80"
            disabled={loading}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;