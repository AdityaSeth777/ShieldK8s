import React from 'react';
import { Shield } from 'lucide-react';

const KubernetesSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Shield className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">Kubernetes Setup Guide</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Local Development Cluster</h2>
        <p className="text-gray-300 mb-4">
          Set up a local Kubernetes cluster using Kind (Kubernetes in Docker):
        </p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`# Install Kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create cluster
kind create cluster --name security-cluster`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Required Components</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">1. Cilium</h3>
            <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-cyber-blue">
{`helm repo add cilium https://helm.cilium.io/
helm repo update
helm install cilium cilium/cilium --namespace kube-system \\
  --set hubble.relay.enabled=true \\
  --set hubble.ui.enabled=true \\
  --set monitoring.enabled=true`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">2. Prometheus Stack</h3>
            <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
              <code className="text-cyber-blue">
{`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace monitoring \\
  --create-namespace`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Security Policies</h2>
        <p className="text-gray-300 mb-4">Apply basic security policies:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`# Apply network policies
kubectl apply -f k8s/policies/default-deny.yaml
kubectl apply -f k8s/policies/allowed-namespaces.yaml

# Verify policies
kubectl get cnp -A`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Verification</h2>
        <p className="text-gray-300 mb-4">Verify the setup:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`# Check Cilium status
cilium status

# Verify Prometheus
kubectl get pods -n monitoring

# Test Hubble connectivity
hubble status`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default KubernetesSetup;