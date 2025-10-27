/**
 * Patient Service
 *
 * Handles all patient-related API calls:
 * - Get all patients
 * - Get single patient
 * - Create new patient
 * - Update patient
 * - Delete patient
 * - Get patient statistics
 */

import api from './api';

/**
 * Get all patients
 *
 * @param {Object} filters - Optional filters (isPregnant, riskLevel, search, etc.)
 * @returns {Promise} Response with patients array
 */
export const getPatients = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.isPregnant !== undefined) {
    params.append('isPregnant', filters.isPregnant);
  }
  if (filters.riskLevel) {
    params.append('riskLevel', filters.riskLevel);
  }
  if (filters.search) {
    params.append('search', filters.search);
  }
  if (filters.assignedDoctorId) {
    params.append('assignedDoctorId', filters.assignedDoctorId);
  }
  if (filters.assignedNurseId) {
    params.append('assignedNurseId', filters.assignedNurseId);
  }

  const queryString = params.toString();
  const url = queryString ? `/patients?${queryString}` : '/patients';

  const response = await api.get(url);
  return response.data;
};

/**
 * Get patients assigned to current user
 *
 * @returns {Promise} Response with patients array
 */
export const getMyPatients = async () => {
  const response = await api.get('/patients/my-patients');
  return response.data;
};

/**
 * Get single patient by ID
 *
 * @param {string} patientId - Patient ID
 * @returns {Promise} Response with patient data
 */
export const getPatient = async (patientId) => {
  const response = await api.get(`/patients/${patientId}`);
  return response.data;
};

/**
 * Register new patient
 *
 * @param {Object} patientData - Patient registration data
 * @returns {Promise} Response with created patient
 */
export const registerPatient = async (patientData) => {
  const response = await api.post('/patients', patientData);
  return response.data;
};

/**
 * Update patient information
 *
 * @param {string} patientId - Patient ID
 * @param {Object} updates - Fields to update
 * @returns {Promise} Response with updated patient
 */
export const updatePatient = async (patientId, updates) => {
  const response = await api.put(`/patients/${patientId}`, updates);
  return response.data;
};

/**
 * Delete patient (soft delete)
 *
 * @param {string} patientId - Patient ID
 * @returns {Promise} Response confirming deletion
 */
export const deletePatient = async (patientId) => {
  const response = await api.delete(`/patients/${patientId}`);
  return response.data;
};

/**
 * Get patient statistics
 *
 * @returns {Promise} Response with statistics
 */
export const getPatientStats = async () => {
  const response = await api.get('/patients/stats');
  return response.data;
};
