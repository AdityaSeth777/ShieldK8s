import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1d'
  },
  prometheus: {
    url: process.env.PROMETHEUS_URL || 'http://localhost:9090'
  },
  cilium: {
    hubbleUrl: process.env.HUBBLE_URL || 'localhost:4245'
  },
  kubernetes: {
    namespace: process.env.K8S_NAMESPACE || 'default'
  }
};