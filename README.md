# Security Dashboard with eBPF

![Security Dashboard](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000&h=600)

A real-time security dashboard for monitoring Kubernetes cluster security using eBPF and Cilium. The frontend provides visualizations for security metrics, alerts, and network connections with a sleek, cyberpunk-inspired design.

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

4. Configure Backend:
```bash
# Clone repository
git clone <repository-url>
cd security-dashboard

# Install dependencies
cd api
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secure-secret-key
PROMETHEUS_URL=http://prometheus-server:9090
HUBBLE_URL=localhost:4245
K8S_NAMESPACE=default
```

5. Start Backend:
```bash
npm run dev
```

### Frontend Setup

1. Configure Frontend:
```bash
# In project root
cd frontend
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` with your Firebase and API configuration:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-api-key
```

2. Start Frontend:
```bash
npm run dev
```

## 🔐 Authentication Setup

### Firebase Configuration

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Follow the setup wizard

2. Enable Authentication:
   - In Firebase Console, go to "Authentication" → "Sign-in method"
   - Enable "Email/Password" authentication
   - Add your domain to "Authorized domains"

3. Get Firebase Configuration:
   - Go to Project Settings (⚙️ icon)
   - Under "General" tab, scroll to "Your apps"
   - Click the web icon (</>)
   - Register your app with a nickname
   - Copy the configuration values to your `.env` file

## 🔧 Security Policies

### Default Network Policies

Apply basic network policies:

```bash
# Create default deny policy
kubectl apply -f k8s/policies/default-deny.yaml

# Create allowed namespaces policy
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

## 📊 API Endpoints

### Metrics

```
GET /api/metrics
Query Parameters:
- timeRange: 1h, 12h, 24h
- type: cpu, memory, network
```

### Alerts

```
GET /api/alerts
Query Parameters:
- severity: all, critical, high, medium, low
- limit: number (default: 50)
```

### Network

```
GET /api/network
Query Parameters:
- status: all, allowed, blocked
- limit: number (default: 100)
```

## 🛡️ Security Considerations

1. API Security:
   - JWT authentication required for all endpoints
   - Rate limiting enabled
   - CORS configured for frontend origin
   - Helmet.js for security headers

2. Kubernetes Security:
   - Network policies in place
   - Pod security policies enabled
   - RBAC configured
   - Secrets management via Kubernetes secrets

3. Monitoring:
   - Prometheus metrics encrypted
   - Grafana access controlled
   - Audit logging enabled

## 🔄 Development Mode

Until proper backend configuration is set up, the dashboard runs in simulation mode:
1. Metrics are randomly generated
2. Alerts are simulated
3. Network connections are mocked

To switch to real data:
1. Set up the backend services
2. Update the API URL in `.env`
3. Remove the `SimulatedDataBanner` component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

MIT