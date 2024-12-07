# Security Dashboard with eBPF

![Security Dashboard](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000&h=600)

A real-time security dashboard for monitoring Kubernetes cluster security using eBPF and Cilium. The frontend provides visualizations for security metrics, alerts, and network connections with a sleek, cyberpunk-inspired design.

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables (see Configuration section)
4. Start the development server:
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
   - Copy the firebaseConfig object

4. Create `.env` file in project root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# API Configuration (for backend integration)
VITE_API_URL=http://your-api-url
VITE_API_KEY=your-api-key
```

## 🔧 Backend Integration

### 1. Kubernetes Setup with Cilium

1. Install a Kubernetes cluster:
```bash
# Using kind
kind create cluster --name security-cluster

# Or using minikube
minikube start
```

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
# prometheus-servicemonitor.yaml
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

Create an API server that:

1. Collects metrics from Prometheus
2. Processes eBPF events from Cilium
3. Implements these endpoints:

- GET /api/metrics
  - Query params: timeRange (1h, 12h, 24h)
  - Returns: CPU, memory, and network metrics

- GET /api/alerts
  - Query params: severity (all, critical, high, medium, low)
  - Returns: Security alerts from Cilium/eBPF

- GET /api/network
  - Returns: Active network connections and their status

## 🛡️ Security Policies

1. Create default network policies:
```yaml
# default-policy.yaml
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

2. Implement policy automation:
   - Monitor traffic patterns
   - Generate policy recommendations
   - Apply policies automatically

## 🎨 Features

- Real-time security metrics visualization
- Network connection monitoring
- Security alerts with severity levels
- Firebase authentication
- Dark mode cyberpunk theme
- Responsive design
- Simulated data mode for development

## 🔄 Development Mode

Until proper backend configuration is set up, the dashboard runs in simulation mode:

1. Metrics are randomly generated
2. Alerts are simulated
3. Network connections are mocked

To switch to real data:
1. Set up the backend services
2. Update the API URL in `.env`
3. Remove the `SimulatedDataBanner` component from `App.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

MIT

## 🙏 Acknowledgments

- [Cilium](https://cilium.io/) for eBPF-based networking
- [Prometheus](https://prometheus.io/) for metrics collection
- [Firebase](https://firebase.google.com/) for authentication
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling