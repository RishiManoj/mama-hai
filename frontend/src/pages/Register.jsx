/**
 * Register Page - Shows demo account info for now
 */

import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="MAMA HAI" className="h-20 w-auto" />
        </div>

        <h1 className="text-3xl font-bold text-primary-600 text-center mb-2">
          Registration
        </h1>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
          <p className="text-lg font-semibold text-primary-800 mb-4">
            Demo Mode Active
          </p>
          <p className="text-neutral-700 mb-4">
            Registration is disabled in demo mode. Please use one of these demo accounts to login:
          </p>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-semibold text-sm">👨‍⚕️ Doctor Account</p>
              <p className="text-sm text-neutral-600">doctor@mamahai.com / doctor123</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-semibold text-sm">👩‍⚕️ Nurse Account</p>
              <p className="text-sm text-neutral-600">nurse@mamahai.com / nurse123</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-semibold text-sm">🚑 Ambulance Account</p>
              <p className="text-sm text-neutral-600">ambulance@mamahai.com / ambulance123</p>
            </div>
          </div>
        </div>

        <Link to="/login" className="btn btn-primary w-full">
          Go to Login
        </Link>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-700">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
