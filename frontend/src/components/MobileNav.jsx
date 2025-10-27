/**
 * Mobile Navigation Component
 *
 * Bottom navigation bar optimized for mobile devices
 * Shows on small screens, hides on desktop
 */

import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 md:hidden z-50">
      <div className="grid grid-cols-3 h-16">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center space-y-1 ${
            isActive('/dashboard') && !isActive('/dashboard/')
              ? 'text-primary-600 bg-primary-50'
              : 'text-neutral-600 active:bg-neutral-50'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* Patients */}
        <Link
          to="/patients"
          className={`flex flex-col items-center justify-center space-y-1 ${
            isActive('/patients')
              ? 'text-primary-600 bg-primary-50'
              : 'text-neutral-600 active:bg-neutral-50'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-xs font-medium">Patients</span>
        </Link>

        {/* Add Patient */}
        <Link
          to="/patients/register"
          className={`flex flex-col items-center justify-center space-y-1 ${
            location.pathname === '/patients/register'
              ? 'text-primary-600 bg-primary-50'
              : 'text-neutral-600 active:bg-neutral-50'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span className="text-xs font-medium">Add</span>
        </Link>
      </div>
    </nav>
  );
}
