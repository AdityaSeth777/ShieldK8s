# Security Dashboard with eBPF

This project provides a real-time security dashboard for monitoring Kubernetes cluster security using eBPF and Cilium. The frontend is built with React and provides visualizations for security metrics, alerts, and network connections.

## Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Backend Integration

To fully implement this dashboard, you'll need to:

### 1. Set up Kubernetes with Cilium

1. Install Kubernetes cluster (e.g., using kind or minikube)
2. Install Cilium as CNI:
```bash
helm repo add cilium https://helm.cilium.io/
helm install cilium cilium/cilium --namespace kube-system
```

3. Enable Hubble for enhanced observability:
```bash
cilium hubble enable
```

### 2. Metrics Collection

1. Install Prometheus:
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

2. Configure Prometheus to scrape Cilium metrics:
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: cilium-metrics
spec:
  selector:
    matchLabels:
      k8s-app: cilium
  endpoints:
  - port: metrics
```

### 3. API Implementation

Create an API server (e.g., using Node.js/Express) that:

1. Collects metrics from Prometheus
2. Processes eBPF events from Cilium
3. Implements the following endpoints:

- GET /api/metrics
  - Query params: timeRange (1h, 12h, 24h)
  - Returns: CPU, memory, and network metrics

- GET /api/alerts
  - Query params: severity (all, critical, high, medium, low)
  - Returns: Security alerts from Cilium/eBPF

- GET /api/network
  - Returns: Active network connections and their status

### 4. Security Policies

1. Create default network policies:
```yaml
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: default-deny
spec:
  endpointSelector: {}
  ingress:
  - fromEndpoints:
    - matchLabels:
        io.kubernetes.pod.namespace: kube-system
```

2. Implement policy automation using the Kubernetes API to:
- Monitor traffic patterns
- Generate policy recommendations
- Apply policies automatically

## Environment Variables

Create a `.env` file with:

```
VITE_API_URL=http://your-api-server:port
VITE_REFRESH_INTERVAL=30000
```

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Deploy the backend services to Kubernetes:
```bash
kubectl apply -f k8s/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT