import React from 'react';
import { Shield, Server, Users } from 'lucide-react';

const stats = [
  {
    icon: <Shield className="w-8 h-8" />,
    value: '99.9%',
    label: 'Security Coverage'
  },
  {
    icon: <Server className="w-8 h-8" />,
    value: '1000+',
    label: 'Clusters Protected'
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: '50K+',
    label: 'Active Users'
  }
];

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cyber-black/60 to-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 rounded-lg border border-cyber-blue/20 bg-black/40 backdrop-blur-sm"
            >
              <div className="text-cyber-blue mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;