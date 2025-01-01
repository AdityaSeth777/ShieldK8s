import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocsLayout from './DocsLayout';
import Overview from './sections/Overview';
import KubernetesSetup from './sections/KubernetesSetup';
import CiliumEbpf from './sections/CiliumEbpf';
import Monitoring from './sections/Monitoring';
import CliTools from './sections/CliTools';
import Configuration from './sections/Configuration';

const DocsPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DocsLayout>
            <Overview />
          </DocsLayout>
        }
      />
      <Route
        path="/kubernetes"
        element={
          <DocsLayout>
            <KubernetesSetup />
          </DocsLayout>
        }
      />
      <Route
        path="/cilium-ebpf"
        element={
          <DocsLayout>
            <CiliumEbpf />
          </DocsLayout>
        }
      />
      <Route
        path="/monitoring"
        element={
          <DocsLayout>
            <Monitoring />
          </DocsLayout>
        }
      />
      <Route
        path="/cli"
        element={
          <DocsLayout>
            <CliTools />
          </DocsLayout>
        }
      />
      <Route
        path="/configuration"
        element={
          <DocsLayout>
            <Configuration />
          </DocsLayout>
        }
      />
    </Routes>
  );
};

export default DocsPage;