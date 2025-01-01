import React from 'react';
import { Shield } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Shield className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">Security Dashboard Documentation</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Architecture Overview</h2>
        <p className="text-gray-300 mb-4">
          The Security Dashboard is built on modern cloud-native technologies:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Frontend: React with TypeScript and TailwindCSS</li>
          <li>Authentication: Supabase Auth</li>
          <li>Monitoring: Prometheus & Grafana</li>
          <li>Network Security: Cilium with eBPF</li>
          <li>Container Orchestration: Kubernetes</li>
        </ul>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Real-time security monitoring</li>
          <li>Network policy enforcement</li>
          <li>Threat detection and alerts</li>
          <li>Performance metrics visualization</li>
          <li>Custom security policies</li>
        </ul>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Set up Kubernetes cluster</li>
          <li>Install Cilium with Hubble</li>
          <li>Deploy Prometheus stack</li>
          <li>Configure environment variables</li>
          <li>Start the application</li>
        </ol>
      </div>
    </div>
  );
};

export default Overview;