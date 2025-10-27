/**
 * MAMA HAI - Main App Component
 *
 * This is the root component of the application.
 * It contains routing, authentication logic, and global state management.
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MobileNav from './components/MobileNav';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientRegister from './pages/PatientRegister';
import PatientDetails from './pages/PatientDetails';

// Component to conditionally show mobile nav
function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Show mobile nav only on authenticated pages (not login/register/home)
  const showMobileNav = isAuthenticated &&
    !['/login', '/register', '/'].includes(location.pathname);

  return (
    <>
      {showMobileNav && <MobileNav />}
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/register"
            element={
              <ProtectedRoute>
                <PatientRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
