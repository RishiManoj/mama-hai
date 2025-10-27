/**
 * Authentication Controller
 *
 * Handles user registration, login, and profile management.
 * Uses demo data for now - will be replaced with database queries later.
 */

import { findUserByEmail, verifyPassword, demoUsers } from '../data/demoUsers.js';
import { generateToken } from '../utils/jwt.js';

/**
 * POST /api/auth/register
 * Register a new user
 *
 * For now, this just shows the UI works - doesn't actually save users
 */
export async function register(req, res) {
  try {
    const { email, password, firstName, lastName, role, language, phoneNumber } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: email, password, firstName, lastName, role'
      });
    }

    // Check if user already exists (in demo users)
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists. Please use login instead.'
      });
    }

    // For demo: just return success message
    // In production, this would create user in database
    return res.status(200).json({
      success: true,
      message: 'Registration successful! Please use one of the demo accounts to login.',
      demoAccounts: [
        { email: 'doctor@mamahai.com', password: 'doctor123', role: 'DOCTOR' },
        { email: 'nurse@mamahai.com', password: 'nurse123', role: 'NURSE' },
        { email: 'ambulance@mamahai.com', password: 'ambulance123', role: 'AMBULANCE' }
      ]
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
}

/**
 * POST /api/auth/login
 * Login with email and password
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact admin.'
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Return success with token and user data
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
}

/**
 * GET /api/auth/me
 * Get current user profile
 * (Protected route - requires authentication)
 */
export async function getProfile(req, res) {
  try {
    // User is already attached to req by auth middleware
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching profile'
    });
  }
}

/**
 * PUT /api/auth/profile
 * Update user profile
 * (Protected route - requires authentication)
 */
export async function updateProfile(req, res) {
  try {
    const { firstName, lastName, phoneNumber, language } = req.body;

    // For demo: just return updated data
    // In production, this would update database
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully (demo mode)',
      user: {
        ...req.user,
        firstName: firstName || req.user.firstName,
        lastName: lastName || req.user.lastName,
        phoneNumber: phoneNumber || req.user.phoneNumber,
        language: language || req.user.language
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
}

/**
 * POST /api/auth/logout
 * Logout (client-side removes token)
 */
export async function logout(req, res) {
  // In a stateless JWT setup, logout is handled client-side
  // by removing the token from storage
  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
}
