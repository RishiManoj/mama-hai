/**
 * Dashboard Page
 *
 * Main page after login - shows user info, patient statistics, and navigation
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { getPatientStats } from '../services/patientService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getPatientStats();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pb-20 md:pb-0">
      {/* Navigation - Hidden on mobile, shown on desktop */}
      <nav className="bg-white shadow-sm hidden md:block">
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

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="MAMA HAI" className="h-8 w-auto" />
              <span className="text-lg font-bold text-primary-600">MAMA HAI</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-neutral-600 px-3 py-1.5 rounded-lg active:bg-neutral-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

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

        {/* Patient Statistics */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">
              Patient Statistics
            </h2>
            <Link to="/patients" className="btn btn-primary">
              View All Patients
            </Link>
          </div>

          {loadingStats ? (
            <div className="text-center py-8">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-2 text-sm text-neutral-600">Loading statistics...</p>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              <div className="bg-primary-50 rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary-600">{stats.total}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Total</p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-secondary-600">{stats.pregnant}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Pregnant</p>
              </div>
              <div className="bg-alert-red-light rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-alert-red-dark">{stats.highRisk}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">High Risk</p>
              </div>
              <div className="bg-alert-yellow-light rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-alert-yellow-dark">{stats.moderateRisk}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Moderate</p>
              </div>
              <div className="bg-alert-green-light rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-alert-green-dark">{stats.lowRisk}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Low Risk</p>
              </div>
              <div className="bg-neutral-100 rounded-lg p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-neutral-700">{stats.postpartum}</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Postpartum</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-neutral-600 py-8">
              No statistics available
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/patients" className="card hover:shadow-lg transition-shadow active:scale-98">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="bg-primary-100 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-800 text-sm md:text-base">Manage Patients</h3>
                <p className="text-xs md:text-sm text-neutral-600 truncate">View and manage records</p>
              </div>
            </div>
          </Link>

          <Link to="/patients/register" className="card hover:shadow-lg transition-shadow active:scale-98">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="bg-secondary-100 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-800 text-sm md:text-base">Register Patient</h3>
                <p className="text-xs md:text-sm text-neutral-600 truncate">Add new patient</p>
              </div>
            </div>
          </Link>

          <div className="card bg-neutral-50 opacity-60">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="bg-neutral-200 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-600 text-sm md:text-base">Monitoring</h3>
                <p className="text-xs md:text-sm text-neutral-500 truncate">Coming in Phase 4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-3">
            🎉 Phase 3 Complete!
          </h3>
          <p className="text-neutral-700 mb-4">
            Patient management system is now active. You can register patients, view patient lists, and track obstetrical data.
          </p>
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Coming in Phase 4:</p>
            <ul className="space-y-1 text-sm text-neutral-600">
              <li>• Real-time patient monitoring</li>
              <li>• Vital signs tracking (BP, HR, SpO2, Temp)</li>
              <li>• Shock Index calculations</li>
              <li>• Monitoring history and trends</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
