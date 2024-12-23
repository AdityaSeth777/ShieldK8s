import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Book, Code, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-cyber-blue/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-cyber-blue" />
            <span className="text-xl font-bold text-white">ShieldK8s</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="https://docs.shieldk8s.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyber-blue flex items-center space-x-2 transition-colors"
            >
              <Book className="w-4 h-4" />
              <span>Documentation</span>
            </a>
            
            <a
              href="https://github.com/shieldk8s/shieldk8s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyber-blue flex items-center space-x-2 transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>Developers</span>
            </a>
            
            <a
              href="mailto:support@shieldk8s.dev"
              className="text-gray-300 hover:text-cyber-blue flex items-center space-x-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>

            <Link
              to="/login"
              className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/90 text-black font-semibold rounded-lg transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;