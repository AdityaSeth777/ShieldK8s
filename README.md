# Security Dashboard with eBPF

![Security Dashboard](./shieldk8s.jpg)

A privacy-focused, local-only security dashboard for monitoring Kubernetes cluster security using eBPF and Cilium. All metrics and data stay within your infrastructure.

## 🔒 Privacy Features

- **Local-Only Monitoring**: All metrics and data remain within your infrastructure
- **No External Dependencies**: Monitoring stack runs entirely on your cluster
- **Zero Data Export**: No metrics or logs leave your environment
- **Self-Contained**: Similar architecture to Kafka + Grafana setups

## 🛡️ Security Features

1. Network Security:
   - Layer 7 policy enforcement
   - Network encryption
   - Service mesh integration
   - Traffic monitoring

2. Threat Detection:
   - Anomaly detection
   - Behavioral analysis
   - Policy violation alerts
   - Real-time monitoring

3. Access Control:
   - RBAC integration
   - Policy enforcement
   - Audit logging
   - Authentication tracking

## 🚀 Quick Start

### Prerequisites

1. Kubernetes cluster (local or remote)
2. Helm 3.x
3. kubectl
4. Node.js 18+

### Backend Setup

1. Install Kind (Kubernetes in Docker):
```bash
# On Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create cluster
kind create cluster --name security-cluster
```

2. Install Cilium:
```bash
# Add Helm repository
helm repo add cilium https://helm.cilium.io/
helm repo update

# Install Cilium
helm install cilium cilium/cilium --namespace kube-system \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true \
  --set monitoring.enabled=true

# Enable Hubble
cilium hubble enable
```

3. Install Prometheus Stack:
```bash
# Add Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```

### Frontend Setup

1. Clone and install dependencies:
```bash
git clone https://github.com/AdityaSeth777/ShieldK8s
cd ShieldK8s
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Start the development server:
```bash
npm run dev
```

## 📊 Monitoring Features

### 1. Security Metrics
- CPU and Memory usage
- Network traffic analysis
- Pod security status
- Policy compliance

### 2. Network Monitoring
- Real-time connection tracking
- Traffic visualization
- Policy violations
- Protocol analysis

### 3. Alert System
- Real-time security alerts
- Severity classification
- Custom alert rules
- Notification system

## 🔧 Configuration

### Network Policies

Apply basic network policies:

```bash
kubectl apply -f k8s/policies/default-deny.yaml
kubectl apply -f k8s/policies/allowed-namespaces.yaml
```

### Monitoring Setup

1. Access Prometheus:
```bash
kubectl port-forward svc/prometheus-server 9090:9090 -n monitoring
```

2. Access Grafana:
```bash
kubectl port-forward svc/grafana 3000:3000 -n monitoring
```

Default Grafana credentials:
- Username: admin
- Password: prom-operator

### Hubble UI

Access Hubble UI:
```bash
kubectl port-forward svc/hubble-ui 12000:80 -n kube-system
```


## 📝 Development

### Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── k8s/              # Kubernetes manifests
│   └── policies/     # Network policies
└── api/             # Backend API
```

### Adding New Features

1. Create new components in `src/components/`
2. Add routes in `src/App.tsx`
3. Update types in `src/types/`
4. Add network policies in `k8s/policies/`

## 📚 Documentation

Comprehensive documentation is available at `/docs` in the application, covering:

- Kubernetes setup
- Cilium & eBPF configuration
- Monitoring setup
- CLI tools
- Security policies
- Troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

[MIT](./LICENSE)

## What next?

I will be improving this project.

## Where to contact ?

Contact: [contact@adityaseth.in](mailto:contact@adityaseth.in?subject=Email%20owing%20to%20adityaseth.in&body=Greetings%2C%0AI%20am%20%5Bname%5D.%20I%20just%20came%20across%20your%20website%20and%20was%20hoping%20to%20talk%20to%20you%20about%20something.)

## 🙋‍♂️ Support

💙 If you like this project, give it a ⭐ and share it with friends! <br><br>

[<img width="200" height="70" src="https://i.postimg.cc/R0cqPmDf/bmc-button.png" alt="buymeacoffee">](https://www.buymeacoffee.com/adityaseth)

---
