import React from 'react';
import { Network } from 'lucide-react';

const CiliumEbpf: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Network className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">Cilium & eBPF Integration</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">eBPF Overview</h2>
        <p className="text-gray-300 mb-4">
          eBPF (extended Berkeley Packet Filter) is a revolutionary technology that allows running sandboxed programs in the Linux kernel without changing kernel source code or loading kernel modules.
        </p>
        <div className="space-y-2 text-gray-300">
          <h3 className="text-xl font-semibold text-white">Key Capabilities:</h3>
          <ul className="list-disc list-inside">
            <li>Network packet filtering</li>
            <li>System call monitoring</li>
            <li>Performance tracing</li>
            <li>Security enforcement</li>
          </ul>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Cilium Configuration</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Basic installation with Helm:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`helm repo add cilium https://helm.cilium.io/
helm install cilium cilium/cilium \\
  --namespace kube-system \\
  --set hubble.relay.enabled=true \\
  --set hubble.ui.enabled=true`}
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Network Policies</h2>
        <p className="text-gray-300 mb-4">Example CiliumNetworkPolicy:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: secure-pods
spec:
  endpointSelector:
    matchLabels:
      app: security-dashboard
  ingress:
  - fromEndpoints:
    - matchLabels:
        io.kubernetes.pod.namespace: monitoring
    toPorts:
    - ports:
      - port: "9090"
        protocol: TCP`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Hubble Observability</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Enable Hubble observability:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`cilium hubble enable
cilium hubble port-forward &
hubble observe`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CiliumEbpf;