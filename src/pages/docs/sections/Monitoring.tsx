import React from 'react';
import { Database } from 'lucide-react';

const Monitoring: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Database className="w-12 h-12 text-cyber-blue" />
        <h1 className="text-4xl font-bold text-white">Monitoring Setup</h1>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Prometheus Configuration</h2>
        <p className="text-gray-300 mb-4">
          Access Prometheus dashboard:
        </p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`kubectl port-forward svc/prometheus-server 9090:9090 -n monitoring`}
          </code>
        </pre>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Grafana Setup</h2>
        <div className="space-y-4">
          <p className="text-gray-300">Access Grafana dashboard:</p>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
            <code className="text-cyber-blue">
{`kubectl port-forward svc/grafana 3000:3000 -n monitoring

# Default credentials:
# Username: admin
# Password: prom-operator`}
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Metrics Collection</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Available Metrics:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>CPU and Memory usage</li>
            <li>Network traffic patterns</li>
            <li>Security policy violations</li>
            <li>Pod lifecycle events</li>
            <li>API server requests</li>
          </ul>
        </div>
      </div>

      <div className="bg-black/40 p-6 rounded-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Alert Configuration</h2>
        <p className="text-gray-300 mb-4">Example alert rule:</p>
        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-cyber-blue">
{`apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: security-alerts
  namespace: monitoring
spec:
  groups:
  - name: security
    rules:
    - alert: HighPolicyViolations
      expr: sum(rate(cilium_policy_verdict_total{verdict="denied"}[5m])) > 10
      for: 5m
      labels:
        severity: critical
      annotations:
        description: High rate of policy violations detected
        summary: Security Policy Violations`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Monitoring;