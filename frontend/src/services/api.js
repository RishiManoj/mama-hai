/**
 * API Service
 *
 * Centralized service for making HTTP requests to the backend.
 * Handles authentication tokens and error responses.
 */

import axios from 'axios';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Return successful response
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Handle specific status codes
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      // Return error with message from server
      return Promise.reject(data || { message: 'An error occurred' });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({ message: 'No response from server. Please check your connection.' });
    } else {
      // Something else happened
      return Promise.reject({ message: error.message || 'An error occurred' });
    }
  }
);

export default api;
