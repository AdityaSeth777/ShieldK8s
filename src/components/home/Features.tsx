import React from 'react';
import { Shield, Activity, Lock, Cpu, Network, Bell } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Advanced Threat Detection',
    description: 'Real-time monitoring and detection of security threats using eBPF technology.'
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Performance Metrics',
    description: 'Comprehensive metrics and analytics for your Kubernetes clusters.'
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'Network Security',
    description: 'Secure network policies and traffic monitoring with Cilium integration.'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Access Control',
    description: 'Fine-grained access control and policy enforcement for your clusters.'
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Resource Optimization',
    description: 'Optimize resource usage while maintaining security standards.'
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Alert Management',
    description: 'Customizable alerts and notifications for security events.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-cyber-black/60">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Security Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Protect your Kubernetes infrastructure with our comprehensive security suite
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-cyber-blue/20 bg-black/40 backdrop-blur-sm hover:border-cyber-blue/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 flex items-center justify-center mb-4 text-cyber-blue group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;