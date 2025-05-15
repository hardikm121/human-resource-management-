import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeDetails from './pages/employees/EmployeeDetails';
import EmployeeForm from './pages/employees/EmployeeForm';
import AttendancePage from './pages/attendance/AttendancePage';
import LeavePage from './pages/leave/LeavePage';
import PayrollPage from './pages/payroll/PayrollPage';
import PerformancePage from './pages/performance/PerformancePage';
import DocumentsPage from './pages/documents/DocumentsPage';
import SettingsPage from './pages/settings/SettingsPage';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/:id" element={<EmployeeDetails />} />
            <Route path="employees/add" element={<EmployeeForm />} />
            <Route path="employees/edit/:id" element={<EmployeeForm />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;