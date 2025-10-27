/**
 * Patient Routes
 *
 * All routes for patient management
 * All routes require authentication
 */

import express from 'express';
import {
  getPatients,
  getPatient,
  registerPatient,
  updatePatientInfo,
  removePatient,
  getMyPatients,
  getPatientStats
} from '../controllers/patient.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All patient routes require authentication
router.use(authenticateToken);

/**
 * GET /api/patients/stats
 * Get patient statistics for current user
 */
router.get('/stats', getPatientStats);

/**
 * GET /api/patients/my-patients
 * Get patients assigned to current user
 */
router.get('/my-patients', getMyPatients);

/**
 * GET /api/patients
 * Get all patients (with optional filters)
 * Query params: isPregnant, riskLevel, assignedDoctorId, assignedNurseId, search
 */
router.get('/', getPatients);

/**
 * GET /api/patients/:id
 * Get single patient by ID
 */
router.get('/:id', getPatient);

/**
 * POST /api/patients
 * Create new patient
 */
router.post('/', registerPatient);

/**
 * PUT /api/patients/:id
 * Update patient information
 */
router.put('/:id', updatePatientInfo);

/**
 * DELETE /api/patients/:id
 * Delete patient (soft delete - sets isActive to false)
 */
router.delete('/:id', removePatient);

export default router;
