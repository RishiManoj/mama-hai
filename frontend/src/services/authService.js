/**
 * Authentication Service
 *
 * Handles all authentication-related API calls:
 * - Login
 * - Register
 * - Logout
 * - Get profile
 * - Update profile
 */

import api from './api';

/**
 * Login with email and password
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response with token and user data
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Register a new user
 *
 * @param {Object} userData - User registration data
 * @returns {Promise} Response with registration result
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Logout current user
 *
 * @returns {Promise} Response confirming logout
 */
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Get current user profile
 *
 * @returns {Promise} User profile data
 */
export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Update user profile
 *
 * @param {Object} updates - Profile fields to update
 * @returns {Promise} Updated user data
 */
export const updateProfile = async (updates) => {
  const response = await api.put('/auth/profile', updates);
  return response.data;
};

/**
 * Save authentication data to localStorage
 *
 * @param {string} token - JWT token
 * @param {Object} user - User object
 */
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get saved authentication data from localStorage
 *
 * @returns {Object} Object with token and user
 */
export const getAuthData = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return { token, user };
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 *
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
  const { token } = getAuthData();
  return !!token;
};
