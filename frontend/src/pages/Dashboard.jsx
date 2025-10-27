/**
 * Dashboard Page
 *
 * Main page after login - shows user info and navigation
 */

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'DOCTOR':
        return 'bg-blue-100 text-blue-800';
      case 'NURSE':
        return 'bg-green-100 text-green-800';
      case 'AMBULANCE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="MAMA HAI" className="h-10 w-auto" />
              <span className="text-xl font-bold text-primary-600">MAMA HAI</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-sm px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="card mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Welcome, {user?.firstName}! 👋
          </h1>
          <p className="text-neutral-600">
            You're logged in to MAMA HAI - Maternal Health Monitoring System
          </p>
        </div>

        {/* User Info Card */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Full Name</p>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Role</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user?.role)}`}>
                {user?.role}
              </span>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Language</p>
              <p className="font-medium">{user?.language}</p>
            </div>
            {user?.phoneNumber && (
              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="font-medium">{user?.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Phase Info */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-3">
            🎉 Authentication Complete!
          </h3>
          <p className="text-neutral-700 mb-4">
            Phase 2 is working! You're now logged in with a demo account.
          </p>
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Coming in Phase 3:</p>
            <ul className="space-y-1 text-sm text-neutral-600">
              <li>• Patient registration and management</li>
              <li>• Obstetrical data tracking (G-P-A-L-D)</li>
              <li>• Patient list and details views</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
