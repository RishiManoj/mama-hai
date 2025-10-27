/**
 * Monitoring Routes
 *
 * All routes for patient monitoring
 * All routes require authentication
 */

import express from 'express';
import {
  startMonitoring,
  recordVitalSigns,
  stopMonitoring,
  getPatientSessions,
  getActiveSession,
  getSessionDetails,
  getLatestVitals
} from '../controllers/monitoring.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All monitoring routes require authentication
router.use(authenticateToken);

/**
 * POST /api/monitoring/start
 * Start a new monitoring session
 */
router.post('/start', startMonitoring);

/**
 * POST /api/monitoring/:sessionId/vitals
 * Record vital signs for a session
 */
router.post('/:sessionId/vitals', recordVitalSigns);

/**
 * PUT /api/monitoring/:sessionId/end
 * End a monitoring session
 */
router.put('/:sessionId/end', stopMonitoring);

/**
 * GET /api/monitoring/patient/:patientId/sessions
 * Get all monitoring sessions for a patient
 */
router.get('/patient/:patientId/sessions', getPatientSessions);

/**
 * GET /api/monitoring/patient/:patientId/active
 * Get active monitoring session for a patient
 */
router.get('/patient/:patientId/active', getActiveSession);

/**
 * GET /api/monitoring/patient/:patientId/latest-vitals
 * Get latest vital signs for a patient
 */
router.get('/patient/:patientId/latest-vitals', getLatestVitals);

/**
 * GET /api/monitoring/:sessionId
 * Get session details with all vital signs
 */
router.get('/:sessionId', getSessionDetails);

export default router;
