// Default values for configuration
const defaults = {
  port: 3000,
  corsOrigin: 'http://localhost:5173',
  jwtSecret: 'your-secret-key',
  prometheusUrl: 'http://localhost:9090',
  hubbleUrl: 'localhost:4245',
  k8sNamespace: 'default'
};

// Environment configuration
export const config = {
  port: Number(process.env.PORT) || defaults.port,
  corsOrigin: process.env.CORS_ORIGIN || defaults.corsOrigin,
  jwt: {
    secret: process.env.JWT_SECRET || defaults.jwtSecret,
    expiresIn: '1d'
  },
  prometheus: {
    url: process.env.PROMETHEUS_URL || defaults.prometheusUrl
  },
  cilium: {
    hubbleUrl: process.env.HUBBLE_URL || defaults.hubbleUrl
  },
  kubernetes: {
    namespace: process.env.K8S_NAMESPACE || defaults.k8sNamespace
  }
};