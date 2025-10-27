/**
 * Authentication Routes
 *
 * Defines API endpoints for user authentication:
 * - POST /api/auth/register - Register new user
 * - POST /api/auth/login - Login with credentials
 * - GET /api/auth/me - Get current user profile
 * - PUT /api/auth/profile - Update user profile
 * - POST /api/auth/logout - Logout
 */

import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/me', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);

export default router;
