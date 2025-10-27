/**
 * Authentication Middleware
 *
 * Protects routes by verifying JWT tokens.
 * Only authenticated users can access protected routes.
 */

import { verifyToken } from '../utils/jwt.js';
import { findUserById } from '../data/demoUsers.js';

/**
 * Middleware to verify JWT token and authenticate requests
 *
 * Checks for token in Authorization header,
 * verifies it, and attaches user to request object.
 */
export function authenticateToken(req, res, next) {
  // Get token from Authorization header
  // Format: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token part

  // No token provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Get user from demo data (in production, this would query database)
    const user = findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'User account is inactive.'
      });
    }

    // Attach user to request object (without password!)
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
}

/**
 * Middleware to check if user has specific role(s)
 *
 * @param {...String} allowedRoles - Roles that are allowed
 */
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    // User has required role, continue
    next();
  };
}
