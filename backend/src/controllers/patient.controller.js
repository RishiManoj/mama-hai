/**
 * Patient Controller
 *
 * Handles all patient management operations:
 * - Get all patients (with filters)
 * - Get single patient
 * - Create new patient
 * - Update patient
 * - Delete patient
 */

import {
  getAllPatients,
  findPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from '../data/demoPatients.js';

/**
 * Get all patients
 * Supports filtering by: isPregnant, riskLevel, assignedDoctorId, assignedNurseId, search
 */
export async function getPatients(req, res) {
  try {
    const filters = {
      isPregnant: req.query.isPregnant === 'true' ? true : req.query.isPregnant === 'false' ? false : undefined,
      riskLevel: req.query.riskLevel,
      assignedDoctorId: req.query.assignedDoctorId,
      assignedNurseId: req.query.assignedNurseId,
      hospitalId: req.query.hospitalId,
      search: req.query.search
    };

    const patients = getAllPatients(filters);

    res.json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve patients'
    });
  }
}

/**
 * Get single patient by ID
 */
export async function getPatient(req, res) {
  try {
    const { id } = req.params;
    const patient = findPatientById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      patient
    });
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve patient'
    });
  }
}

/**
 * Create new patient
 */
export async function registerPatient(req, res) {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      bloodType,
      phoneNumber,
      emergencyContact,
      emergencyContactName,
      address,
      language,
      gravida,
      para,
      abortus,
      living,
      deaths,
      isPregnant,
      currentGestationalAge,
      estimatedDueDate,
      lastMenstrualPeriod,
      riskLevel,
      riskFactors,
      medicalHistory,
      allergies,
      currentMedications,
      assignedDoctorId,
      assignedNurseId,
      hospitalId
    } = req.body;

    // Validation
    if (!firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and date of birth are required'
      });
    }

    // Calculate age from date of birth
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Create patient
    const patientData = {
      firstName,
      lastName,
      dateOfBirth,
      age,
      bloodType: bloodType || 'Unknown',
      phoneNumber: phoneNumber || '',
      emergencyContact: emergencyContact || '',
      emergencyContactName: emergencyContactName || '',
      address: address || '',
      language: language || 'ENGLISH',
      gravida: gravida || 0,
      para: para || 0,
      abortus: abortus || 0,
      living: living || 0,
      deaths: deaths || 0,
      isPregnant: isPregnant || false,
      currentGestationalAge: currentGestationalAge || null,
      estimatedDueDate: estimatedDueDate || null,
      lastMenstrualPeriod: lastMenstrualPeriod || null,
      riskLevel: riskLevel || 'LOW',
      riskFactors: riskFactors || [],
      medicalHistory: medicalHistory || '',
      allergies: allergies || 'None',
      currentMedications: currentMedications || 'None',
      assignedDoctorId: assignedDoctorId || req.user.id,
      assignedNurseId: assignedNurseId || null,
      hospitalId: hospitalId || req.user.hospitalId,
      lastVisit: new Date().toISOString().split('T')[0],
      nextAppointment: null,
      monitoringFrequency: isPregnant ? 'BIWEEKLY' : 'AS_NEEDED'
    };

    const newPatient = createPatient(patientData);

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient: newPatient
    });
  } catch (error) {
    console.error('Register patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register patient'
    });
  }
}

/**
 * Update patient
 */
export async function updatePatientInfo(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if patient exists
    const existingPatient = findPatientById(id);
    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Update age if date of birth is updated
    if (updates.dateOfBirth) {
      const birthDate = new Date(updates.dateOfBirth);
      const today = new Date();
      updates.age = today.getFullYear() - birthDate.getFullYear();
    }

    const updatedPatient = updatePatient(id, updates);

    res.json({
      success: true,
      message: 'Patient updated successfully',
      patient: updatedPatient
    });
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update patient'
    });
  }
}

/**
 * Delete patient (soft delete)
 */
export async function removePatient(req, res) {
  try {
    const { id } = req.params;

    const success = deletePatient(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      message: 'Patient deactivated successfully'
    });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete patient'
    });
  }
}

/**
 * Get patients assigned to current user
 */
export async function getMyPatients(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let filters = {};

    // Filter based on user role
    if (role === 'DOCTOR') {
      filters.assignedDoctorId = userId;
    } else if (role === 'NURSE') {
      filters.assignedNurseId = userId;
    } else if (role === 'AMBULANCE') {
      // Ambulance can see all patients at their hospital
      filters.hospitalId = req.user.hospitalId;
    }

    const patients = getAllPatients(filters);

    res.json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    console.error('Get my patients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve patients'
    });
  }
}

/**
 * Get patient statistics
 */
export async function getPatientStats(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let filters = {};
    if (role === 'DOCTOR') {
      filters.assignedDoctorId = userId;
    } else if (role === 'NURSE') {
      filters.assignedNurseId = userId;
    } else if (role === 'AMBULANCE') {
      filters.hospitalId = req.user.hospitalId;
    }

    const allPatients = getAllPatients(filters);

    const stats = {
      total: allPatients.length,
      pregnant: allPatients.filter(p => p.isPregnant).length,
      postpartum: allPatients.filter(p => !p.isPregnant && p.deliveryDate).length,
      highRisk: allPatients.filter(p => p.riskLevel === 'HIGH').length,
      moderateRisk: allPatients.filter(p => p.riskLevel === 'MODERATE').length,
      lowRisk: allPatients.filter(p => p.riskLevel === 'LOW').length
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get patient stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics'
    });
  }
}
