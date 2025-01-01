import React from 'react';
import { Terminal } from 'lucide-react';

const CliTools: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Terminal className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">CLI Tools Guide</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Cilium CLI</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Common Cilium commands:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`# Check Cilium status
cilium status

# List endpoints
cilium endpoint list

# Monitor network policies
cilium monitor

# Troubleshoot connectivity
cilium connectivity test`}
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Hubble CLI</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Network flow monitoring:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`# Observe network flows
hubble observe

# Filter by verdict
hubble observe --verdict DROPPED

# Filter by protocol
hubble observe --protocol TCP

# Get flow statistics
hubble observe --follow --output json`}
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Kubectl Commands</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Security-related kubectl commands:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`# Get network policies
kubectl get networkpolicies -A

# View Cilium network policies
kubectl get ciliumnetworkpolicies -A

# Check pod security context
kubectl get pod <pod-name> -o yaml | grep -A 20 securityContext

# View audit logs
kubectl logs -n kube-system -l k8s-app=kube-apiserver --tail=100`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CliTools;