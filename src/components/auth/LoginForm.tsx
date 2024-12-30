import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined
        }
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(`${provider} sign in failed. Please try again.`);
    }
  };

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-96 backdrop-blur-lg border border-cyber-blue/20">
      <div className="flex justify-center mb-6">
        <Shield className="w-12 h-12 text-cyber-blue animate-pulse-slow" />
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 rounded flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          className="w-full py-3 px-4 bg-[#24292e] hover:bg-[#2f363d] text-white rounded flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-400">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        {/* ... rest of the form remains the same ... */}
      </form>
    </div>
  );
};