import { PrometheusDriver } from 'prometheus-query';
import { config } from '../config';

let prometheusClient: PrometheusDriver;

export async function setupPrometheus() {
  prometheusClient = new PrometheusDriver({
    endpoint: config.prometheus.url
  });

  // Test connection
  try {
    await prometheusClient.instantQuery('up');
    console.log('Successfully connected to Prometheus');
  } catch (error) {
    console.error('Failed to connect to Prometheus:', error);
    throw error;
  }
}

export async function getMetrics(query: string, start: Date, end: Date) {
  return prometheusClient.rangeQuery(query, start, end, '1m');
}