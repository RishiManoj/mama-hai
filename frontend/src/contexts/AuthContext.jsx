/**
 * Authentication Context
 *
 * Provides authentication state and functions globally to all components.
 * Manages user login, logout, and authentication status.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import toast from 'react-hot-toast';

// Create context
const AuthContext = createContext(null);

/**
 * Hook to use auth context
 * Use this in components to access auth state and functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * AuthProvider Component
 * Wrap your app with this to provide authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize authentication state on app load
   */
  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const { token, user: savedUser } = authService.getAuthData();

    if (token && savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);

      if (data.success) {
        // Save token and user to localStorage
        authService.saveAuthData(data.token, data.user);

        // Update state
        setUser(data.user);
        setIsAuthenticated(true);

        toast.success(`Welcome back, ${data.user.firstName}!`);
        return { success: true };
      } else {
        toast.error(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth data regardless of API response
      authService.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  /**
   * Register function
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await authService.register(userData);

      toast.success(data.message || 'Registration successful!');
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update profile function
   */
  const updateUserProfile = async (updates) => {
    try {
      setLoading(true);
      const data = await authService.updateProfile(updates);

      if (data.success) {
        // Update local user state
        setUser(data.user);

        // Update localStorage
        const { token } = authService.getAuthData();
        authService.saveAuthData(token, data.user);

        toast.success('Profile updated successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Failed to update profile');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
