/**
 * Monitoring Service
 *
 * Handles all monitoring-related API calls:
 * - Start/end monitoring sessions
 * - Record vital signs
 * - Get monitoring history
 * - Get active session
 */

import api from './api';

/**
 * Start a new monitoring session
 *
 * @param {Object} sessionData - Session details
 * @returns {Promise} Response with session data
 */
export const startMonitoring = async (sessionData) => {
  const response = await api.post('/monitoring/start', sessionData);
  return response.data;
};

/**
 * Record vital signs for a session
 *
 * @param {string} sessionId - Session ID
 * @param {Object} vitalData - Vital signs data
 * @returns {Promise} Response with vital signs
 */
export const recordVitalSigns = async (sessionId, vitalData) => {
  const response = await api.post(`/monitoring/${sessionId}/vitals`, vitalData);
  return response.data;
};

/**
 * End a monitoring session
 *
 * @param {string} sessionId - Session ID
 * @returns {Promise} Response with ended session
 */
export const endMonitoring = async (sessionId) => {
  const response = await api.put(`/monitoring/${sessionId}/end`);
  return response.data;
};

/**
 * Get all monitoring sessions for a patient
 *
 * @param {string} patientId - Patient ID
 * @returns {Promise} Response with sessions array
 */
export const getPatientSessions = async (patientId) => {
  const response = await api.get(`/monitoring/patient/${patientId}/sessions`);
  return response.data;
};

/**
 * Get active monitoring session for a patient
 *
 * @param {string} patientId - Patient ID
 * @returns {Promise} Response with active session or null
 */
export const getActiveSession = async (patientId) => {
  const response = await api.get(`/monitoring/patient/${patientId}/active`);
  return response.data;
};

/**
 * Get session details with all vital signs
 *
 * @param {string} sessionId - Session ID
 * @returns {Promise} Response with session and vital signs
 */
export const getSessionDetails = async (sessionId) => {
  const response = await api.get(`/monitoring/${sessionId}`);
  return response.data;
};

/**
 * Get latest vital signs for a patient
 *
 * @param {string} patientId - Patient ID
 * @returns {Promise} Response with latest vitals
 */
export const getLatestVitals = async (patientId) => {
  const response = await api.get(`/monitoring/patient/${patientId}/latest-vitals`);
  return response.data;
};
