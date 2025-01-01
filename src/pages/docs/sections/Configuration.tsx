import React from 'react';
import { Settings } from 'lucide-react';

const Configuration: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Settings className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">Configuration Guide</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Environment Variables</h2>
        <p className="text-gray-300 mb-4">Configure the application using environment variables:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-api-key

# Supabase Configuration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Monitoring Configuration
PROMETHEUS_URL=http://prometheus-server:9090
HUBBLE_URL=localhost:4245`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Security Settings</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Authentication</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Email/Password authentication enabled by default</li>
            <li>OAuth providers can be configured in Supabase dashboard</li>
            <li>JWT token expiration set to 24 hours</li>
            <li>Rate limiting enabled for API endpoints</li>
          </ul>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Network Policies</h2>
        <p className="text-gray-300 mb-4">Example network policy configuration:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: secure-api
spec:
  endpointSelector:
    matchLabels:
      app: security-dashboard
  ingress:
  - fromEndpoints:
    - matchLabels:
        io.kubernetes.pod.namespace: default
    toPorts:
    - ports:
      - port: "3000"
        protocol: TCP`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Monitoring Configuration</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Metrics Collection</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Metrics update interval: 1 second</li>
            <li>Alert notification delay: 20 seconds</li>
            <li>Data retention period: 15 days</li>
            <li>Maximum concurrent connections: 1000</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Configuration;