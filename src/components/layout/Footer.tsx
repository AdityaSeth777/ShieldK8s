import React, { useState } from 'react';
import { Shield, Github, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import SecurityGame from '../games/SecurityGame';

const Footer: React.FC = () => {
  const [gameVisible, setGameVisible] = useState(false);

  return (
    <footer className="bg-cyber-black border-t border-cyber-blue/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyber-blue" />
              <span className="text-xl font-bold text-white">ShieldK8s</span>
            </div>
            <p className="text-gray-400">
              Secure your Kubernetes infrastructure with advanced eBPF-powered monitoring.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AdityaSeth777" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/AdityaSeth777" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://adityaseth.in/linkedin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="./docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AdityaSeth777/shieldk8s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Developers
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@adityaseth.in"
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://adityaseth777.hashnode.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="https://learn.shieldk8s.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setGameVisible(!gameVisible)}
                  className="text-gray-400 hover:text-cyber-blue transition-colors"
                >
                  Security Defense Game
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-black/40 border border-cyber-blue/20 rounded-l-lg focus:outline-none focus:border-cyber-blue/50 text-white w-full"
              />
              <button className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/90 text-black rounded-r-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Game */}
        {gameVisible && (
          <div className="mt-8">
            <SecurityGame />
          </div>
        )}

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-cyber-blue/20 text-center text-gray-400">
          <p>© 2024 ShieldK8s. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;