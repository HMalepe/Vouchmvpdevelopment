import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AppProvider } from './context/AppContext';
import { RoleSwitcher } from './components/shared/RoleSwitcher';

import LandingPage from './components/landing/LandingPage';
import ClientLayout from './components/client/ClientLayout';
import ClientHome from './components/client/ClientHome';
import ClientBook from './components/client/ClientBook';
import ClientBookings from './components/client/ClientBookings';
import ClientPayments from './components/client/ClientPayments';
import ClientProfile from './components/client/ClientProfile';
import ClientJob from './components/client/ClientJob';
import ClientProviders from './components/client/ClientProviders';

import WorkerLayout from './components/worker/WorkerLayout';
import WorkerHome from './components/worker/WorkerHome';
import WorkerJobs from './components/worker/WorkerJobs';
import WorkerEarnings from './components/worker/WorkerEarnings';
import WorkerProfile from './components/worker/WorkerProfile';

import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './components/admin/AdminHome';
import AdminWorkers from './components/admin/AdminWorkers';
import AdminJobs from './components/admin/AdminJobs';
import AdminPayments from './components/admin/AdminPayments';
import AdminDisputes from './components/admin/AdminDisputes';

function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <RoleSwitcher />
    </AppProvider>
  );
}

function LandingRoot() {
  return <RootWrapper><LandingPage /></RootWrapper>;
}
function ClientRoot() {
  return <RootWrapper><ClientLayout /></RootWrapper>;
}
function WorkerRoot() {
  return <RootWrapper><WorkerLayout /></RootWrapper>;
}
function AdminRoot() {
  return <RootWrapper><AdminLayout /></RootWrapper>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingRoot,
  },
  {
    path: '/client',
    Component: ClientRoot,
    children: [
      { index: true, Component: ClientHome },
      { path: 'book', Component: ClientBook },
      { path: 'bookings', Component: ClientBookings },
      { path: 'payments', Component: ClientPayments },
      { path: 'profile', Component: ClientProfile },
      { path: 'job', Component: ClientJob },
      { path: 'providers', Component: ClientProviders },
    ],
  },
  {
    path: '/worker',
    Component: WorkerRoot,
    children: [
      { index: true, Component: WorkerHome },
      { path: 'jobs', Component: WorkerJobs },
      { path: 'earnings', Component: WorkerEarnings },
      { path: 'profile', Component: WorkerProfile },
    ],
  },
  {
    path: '/admin',
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminHome },
      { path: 'workers', Component: AdminWorkers },
      { path: 'jobs', Component: AdminJobs },
      { path: 'payments', Component: AdminPayments },
      { path: 'disputes', Component: AdminDisputes },
    ],
  },
]);
