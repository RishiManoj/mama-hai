/**
 * Login Page
 *
 * Allows users to login with email and password.
 * Uses demo credentials for testing.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  // Quick login with demo accounts
  const quickLogin = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="MAMA HAI" className="h-20 w-auto" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-primary-600 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-600 text-center mb-8">
          Sign in to MAMA HAI
        </p>

        {/* Demo Accounts Info */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-primary-800 mb-2">
            Demo Accounts (Click to use):
          </p>
          <div className="space-y-2 text-sm">
            <button
              onClick={() => quickLogin('doctor@mamahai.com', 'doctor123')}
              className="w-full text-left px-3 py-2 bg-white rounded hover:bg-primary-100 transition-colors"
            >
              👨‍⚕️ Doctor: doctor@mamahai.com / doctor123
            </button>
            <button
              onClick={() => quickLogin('nurse@mamahai.com', 'nurse123')}
              className="w-full text-left px-3 py-2 bg-white rounded hover:bg-primary-100 transition-colors"
            >
              👩‍⚕️ Nurse: nurse@mamahai.com / nurse123
            </button>
            <button
              onClick={() => quickLogin('ambulance@mamahai.com', 'ambulance123')}
              className="w-full text-left px-3 py-2 bg-white rounded hover:bg-primary-100 transition-colors"
            >
              🚑 Ambulance: ambulance@mamahai.com / ambulance123
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input pr-10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Register here
          </Link>
        </p>

        {/* Home Link */}
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-700">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
