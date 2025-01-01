import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Shield, Network, Database, Terminal, Settings } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/docs', icon: Book },
  { name: 'Kubernetes Setup', href: '/docs/kubernetes', icon: Shield },
  { name: 'Cilium & eBPF', href: '/docs/cilium-ebpf', icon: Network },
  { name: 'Monitoring', href: '/docs/monitoring', icon: Database },
  { name: 'CLI Tools', href: '/docs/cli', icon: Terminal },
  { name: 'Configuration', href: '/docs/configuration', icon: Settings },
];

const DocsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cyber-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-8 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-cyber-blue/20 text-cyber-blue'
                        : 'text-gray-300 hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main content */}
          <main className="lg:col-span-9">
            <div className="prose prose-invert max-w-none">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;