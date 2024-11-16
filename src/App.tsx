import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardLayout from './pages/dashboard/DashboardLayout';
import {
  DashboardPage,
  HistoryPage,
  SettingsPage,
  SupportPage,
  TradingTerminal,
  WalletPage
} from './pages/dashboard';

// Terminal Pages
import {
  EconomicCalendarPage,
  OpenOrdersPage,
  MarketAnalysisPage
} from './pages/terminal';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import MarketsManagementPage from './pages/admin/MarketsManagementPage';
import BonusPage from './pages/admin/BonusPage';
import LandingPagesPage from './pages/admin/LandingPagesPage';
import LanguagesPage from './pages/admin/LanguagesPage';
import RiskManagementPage from './pages/admin/RiskManagementPage';

// Manager Pages
import ManagerLayout from './pages/manager/ManagerLayout';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ClientsPage from './pages/manager/ClientsPage';
import PositionsPage from './pages/manager/PositionsPage';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        {/* Trading Terminal Routes */}
        <Route path="/terminal" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <TradingTerminal />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/terminal/chart" />} />
          <Route path="chart" element={<TradingTerminal />} />
          <Route path="calendar" element={<EconomicCalendarPage />} />
          <Route path="orders" element={<OpenOrdersPage />} />
          <Route path="analysis" element={<MarketAnalysisPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="markets" element={<MarketsManagementPage />} />
          <Route path="bonus" element={<BonusPage />} />
          <Route path="landing-pages" element={<LandingPagesPage />} />
          <Route path="languages" element={<LanguagesPage />} />
          <Route path="risk" element={<RiskManagementPage />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ManagerDashboard />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="positions" element={<PositionsPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;