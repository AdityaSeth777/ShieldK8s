import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { UserPlus } from 'lucide-react';

const RegisterForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-96 backdrop-blur-lg border border-cyber-blue/20">
      <div className="flex justify-center mb-6">
        <UserPlus className="w-12 h-12 text-cyber-blue animate-pulse-slow" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-cyber-black/60 border border-cyber-blue/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-cyber-black/60 border border-cyber-blue/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-cyber-black/60 border border-cyber-blue/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-white rounded transition-colors duration-200"
        >
          Register
        </button>
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-cyber-blue hover:text-cyber-blue/80"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;