/**
 * JWT Utility Functions
 *
 * Handles generation and verification of JSON Web Tokens
 * for secure authentication.
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mama-hai-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a JWT token for a user
 *
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
export function generateToken(user) {
  // Create payload with essential user info (don't include password!)
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    language: user.language,
    hospitalId: user.hospitalId
  };

  // Sign and return token
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

/**
 * Verify a JWT token
 *
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

/**
 * Decode a token without verifying
 * (useful for debugging)
 *
 * @param {String} token - JWT token
 * @returns {Object} Decoded payload (unverified)
 */
export function decodeToken(token) {
  return jwt.decode(token);
}
