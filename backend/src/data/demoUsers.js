/**
 * Demo Users for Authentication Testing
 *
 * These are hardcoded users for testing the authentication flow
 * without needing a database connection.
 *
 * In production, these will be replaced with real database queries.
 */

import bcrypt from 'bcrypt';

// Pre-hash passwords for demo users
const hashedPasswords = {
  doctor: bcrypt.hashSync('doctor123', 10),
  nurse: bcrypt.hashSync('nurse123', 10),
  ambulance: bcrypt.hashSync('ambulance123', 10)
};

export const demoUsers = [
  {
    id: 'demo-user-1',
    email: 'doctor@mamahai.com',
    password: hashedPasswords.doctor,
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    role: 'DOCTOR',
    language: 'ENGLISH',
    phoneNumber: '+1-555-0101',
    hospitalId: 'hospital-1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'demo-user-2',
    email: 'nurse@mamahai.com',
    password: hashedPasswords.nurse,
    firstName: 'Marie',
    lastName: 'Dubois',
    role: 'NURSE',
    language: 'FRENCH',
    phoneNumber: '+33-6-12-34-56-78',
    hospitalId: 'hospital-1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'demo-user-3',
    email: 'ambulance@mamahai.com',
    password: hashedPasswords.ambulance,
    firstName: 'John',
    lastName: 'Smith',
    role: 'AMBULANCE',
    language: 'ENGLISH',
    phoneNumber: '+1-555-0102',
    hospitalId: 'hospital-1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Demo hospital data
export const demoHospitals = [
  {
    id: 'hospital-1',
    name: 'Central Hospital',
    code: 'CENT-001',
    sonuLevel: 'COMPREHENSIVE',
    region: 'Central',
    district: 'Downtown',
    address: '123 Medical Center Blvd',
    phoneNumber: '+1-555-0100',
    hasSurgery: true,
    hasBloodBank: true,
    hasICU: true,
    bedCapacity: 200,
    isActive: true
  }
];

/**
 * Find user by email
 */
export function findUserByEmail(email) {
  return demoUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find user by ID
 */
export function findUserById(id) {
  return demoUsers.find(user => user.id === id);
}

/**
 * Get hospital by ID
 */
export function findHospitalById(id) {
  return demoHospitals.find(hospital => hospital.id === id);
}

/**
 * Verify password
 */
export async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
