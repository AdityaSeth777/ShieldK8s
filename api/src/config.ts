import { getEnvNumber, getEnvString } from './utils/env';

export const config = {
  port: getEnvNumber('PORT', 3000),
  corsOrigin: getEnvString('CORS_ORIGIN', 'http://localhost:5173'),
  jwt: {
    secret: getEnvString('JWT_SECRET', 'your-secret-key'),
    expiresIn: '1d'
  },
  prometheus: {
    url: getEnvString('PROMETHEUS_URL', 'http://localhost:9090')
  },
  cilium: {
    hubbleUrl: getEnvString('HUBBLE_URL', 'localhost:4245')
  },
  kubernetes: {
    namespace: getEnvString('K8S_NAMESPACE', 'default')
  }
};