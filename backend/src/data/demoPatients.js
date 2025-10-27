/**
 * Demo Patient Data
 *
 * Mock patient data for testing without database.
 * Includes obstetrical data (G-P-A-L-D) for maternal health tracking.
 *
 * G - Gravida (number of pregnancies)
 * P - Para (number of births after 20 weeks)
 * A - Abortus (number of abortions/miscarriages before 20 weeks)
 * L - Living (number of living children)
 * D - Deaths (number of child deaths)
 */

export const demoPatients = [
  {
    id: 'patient-001',
    firstName: 'Amara',
    lastName: 'Okafor',
    dateOfBirth: '1992-05-15',
    age: 32,
    bloodType: 'O+',
    phoneNumber: '+234-801-234-5678',
    emergencyContact: '+234-801-234-5679',
    emergencyContactName: 'James Okafor (Husband)',
    address: '15 Hospital Road, Lagos',
    language: 'ENGLISH',

    // Obstetrical Data (G-P-A-L-D)
    gravida: 3,
    para: 1,
    abortus: 1,
    living: 1,
    deaths: 0,

    // Current Pregnancy
    isPregnant: true,
    currentGestationalAge: 28, // weeks
    estimatedDueDate: '2025-12-15',
    lastMenstrualPeriod: '2025-05-22',

    // Risk Assessment
    riskLevel: 'MODERATE',
    riskFactors: ['Previous miscarriage', 'Age > 30'],

    // Medical History
    medicalHistory: 'Previous cesarean section, Gestational diabetes in last pregnancy',
    allergies: 'Penicillin',
    currentMedications: 'Prenatal vitamins, Iron supplements',

    // Healthcare Team
    assignedDoctorId: 'demo-user-1',
    assignedNurseId: 'demo-user-2',
    hospitalId: 'hospital-1',

    // Status
    isActive: true,
    registrationDate: '2025-06-01',
    lastVisit: '2025-10-20',
    nextAppointment: '2025-11-05',

    // Monitoring
    monitoringFrequency: 'WEEKLY',
    totalMonitoringSessions: 12
  },

  {
    id: 'patient-002',
    firstName: 'Zainab',
    lastName: 'Ibrahim',
    dateOfBirth: '1995-08-22',
    age: 29,
    bloodType: 'A+',
    phoneNumber: '+234-802-345-6789',
    emergencyContact: '+234-802-345-6790',
    emergencyContactName: 'Fatima Ibrahim (Sister)',
    address: '42 Ahmadu Bello Way, Kano',
    language: 'HAUSA',

    // Obstetrical Data
    gravida: 2,
    para: 1,
    abortus: 0,
    living: 1,
    deaths: 0,

    // Current Pregnancy
    isPregnant: true,
    currentGestationalAge: 16, // weeks
    estimatedDueDate: '2026-04-10',
    lastMenstrualPeriod: '2025-07-15',

    // Risk Assessment
    riskLevel: 'LOW',
    riskFactors: [],

    // Medical History
    medicalHistory: 'First pregnancy was normal vaginal delivery, No complications',
    allergies: 'None',
    currentMedications: 'Prenatal vitamins, Folic acid',

    // Healthcare Team
    assignedDoctorId: 'demo-user-1',
    assignedNurseId: 'demo-user-2',
    hospitalId: 'hospital-1',

    // Status
    isActive: true,
    registrationDate: '2025-07-28',
    lastVisit: '2025-10-25',
    nextAppointment: '2025-11-08',

    // Monitoring
    monitoringFrequency: 'BIWEEKLY',
    totalMonitoringSessions: 5
  },

  {
    id: 'patient-003',
    firstName: 'Chidinma',
    lastName: 'Nwosu',
    dateOfBirth: '1988-03-10',
    age: 36,
    bloodType: 'B-',
    phoneNumber: '+234-803-456-7890',
    emergencyContact: '+234-803-456-7891',
    emergencyContactName: 'Chukwudi Nwosu (Husband)',
    address: '8 Independence Avenue, Enugu',
    language: 'IGBO',

    // Obstetrical Data
    gravida: 5,
    para: 3,
    abortus: 1,
    living: 3,
    deaths: 0,

    // Current Pregnancy
    isPregnant: true,
    currentGestationalAge: 34, // weeks
    estimatedDueDate: '2025-11-28',
    lastMenstrualPeriod: '2025-03-18',

    // Risk Assessment
    riskLevel: 'HIGH',
    riskFactors: ['Age > 35', 'Grand multiparity', 'Rh negative blood', 'Previous miscarriage'],

    // Medical History
    medicalHistory: 'Three previous vaginal deliveries, One miscarriage at 8 weeks, Chronic hypertension',
    allergies: 'Latex',
    currentMedications: 'Prenatal vitamins, Labetalol (for hypertension), RhoGAM',

    // Healthcare Team
    assignedDoctorId: 'demo-user-1',
    assignedNurseId: 'demo-user-2',
    hospitalId: 'hospital-1',

    // Status
    isActive: true,
    registrationDate: '2025-04-05',
    lastVisit: '2025-10-27',
    nextAppointment: '2025-11-03',

    // Monitoring
    monitoringFrequency: 'TWICE_WEEKLY',
    totalMonitoringSessions: 28
  },

  {
    id: 'patient-004',
    firstName: 'Blessing',
    lastName: 'Adeyemi',
    dateOfBirth: '1998-11-30',
    age: 26,
    bloodType: 'AB+',
    phoneNumber: '+234-804-567-8901',
    emergencyContact: '+234-804-567-8902',
    emergencyContactName: 'Grace Adeyemi (Mother)',
    address: '23 Ring Road, Ibadan',
    language: 'YORUBA',

    // Obstetrical Data
    gravida: 1,
    para: 0,
    abortus: 0,
    living: 0,
    deaths: 0,

    // Current Pregnancy
    isPregnant: true,
    currentGestationalAge: 12, // weeks
    estimatedDueDate: '2026-05-20',
    lastMenstrualPeriod: '2025-08-25',

    // Risk Assessment
    riskLevel: 'LOW',
    riskFactors: [],

    // Medical History
    medicalHistory: 'First pregnancy, No significant medical history',
    allergies: 'None',
    currentMedications: 'Prenatal vitamins',

    // Healthcare Team
    assignedDoctorId: 'demo-user-1',
    assignedNurseId: 'demo-user-2',
    hospitalId: 'hospital-1',

    // Status
    isActive: true,
    registrationDate: '2025-09-10',
    lastVisit: '2025-10-22',
    nextAppointment: '2025-11-12',

    // Monitoring
    monitoringFrequency: 'MONTHLY',
    totalMonitoringSessions: 2
  },

  {
    id: 'patient-005',
    firstName: 'Hauwa',
    lastName: 'Mohammed',
    dateOfBirth: '1990-07-08',
    age: 34,
    bloodType: 'O-',
    phoneNumber: '+234-805-678-9012',
    emergencyContact: '+234-805-678-9013',
    emergencyContactName: 'Yusuf Mohammed (Husband)',
    address: '67 GRA, Sokoto',
    language: 'HAUSA',

    // Obstetrical Data
    gravida: 4,
    para: 2,
    abortus: 2,
    living: 2,
    deaths: 0,

    // Current Pregnancy
    isPregnant: false, // Recently delivered
    currentGestationalAge: null,
    estimatedDueDate: null,
    lastMenstrualPeriod: null,
    deliveryDate: '2025-09-15',

    // Risk Assessment
    riskLevel: 'MODERATE',
    riskFactors: ['Rh negative blood', 'Two previous miscarriages'],

    // Medical History
    medicalHistory: 'Two normal deliveries, Two early miscarriages, Recent delivery 6 weeks ago',
    allergies: 'Sulfa drugs',
    currentMedications: 'Postnatal vitamins, Iron supplements',

    // Healthcare Team
    assignedDoctorId: 'demo-user-1',
    assignedNurseId: 'demo-user-2',
    hospitalId: 'hospital-1',

    // Status
    isActive: true,
    registrationDate: '2024-12-20',
    lastVisit: '2025-10-15',
    nextAppointment: '2025-11-15',

    // Monitoring
    monitoringFrequency: 'POSTPARTUM',
    totalMonitoringSessions: 32
  }
];

/**
 * Find patient by ID
 */
export function findPatientById(id) {
  return demoPatients.find(patient => patient.id === id);
}

/**
 * Get all patients (with optional filters)
 */
export function getAllPatients(filters = {}) {
  let patients = [...demoPatients];

  // Filter by pregnancy status
  if (filters.isPregnant !== undefined) {
    patients = patients.filter(p => p.isPregnant === filters.isPregnant);
  }

  // Filter by risk level
  if (filters.riskLevel) {
    patients = patients.filter(p => p.riskLevel === filters.riskLevel);
  }

  // Filter by assigned doctor
  if (filters.assignedDoctorId) {
    patients = patients.filter(p => p.assignedDoctorId === filters.assignedDoctorId);
  }

  // Filter by assigned nurse
  if (filters.assignedNurseId) {
    patients = patients.filter(p => p.assignedNurseId === filters.assignedNurseId);
  }

  // Filter by hospital
  if (filters.hospitalId) {
    patients = patients.filter(p => p.hospitalId === filters.hospitalId);
  }

  // Search by name
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    patients = patients.filter(p =>
      p.firstName.toLowerCase().includes(searchLower) ||
      p.lastName.toLowerCase().includes(searchLower)
    );
  }

  return patients;
}

/**
 * Create new patient (demo mode - just add to memory)
 */
let nextPatientId = 6;
export function createPatient(patientData) {
  const newPatient = {
    id: `patient-${String(nextPatientId).padStart(3, '0')}`,
    ...patientData,
    registrationDate: new Date().toISOString().split('T')[0],
    isActive: true,
    totalMonitoringSessions: 0
  };

  demoPatients.push(newPatient);
  nextPatientId++;

  return newPatient;
}

/**
 * Update patient
 */
export function updatePatient(id, updates) {
  const index = demoPatients.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  demoPatients[index] = {
    ...demoPatients[index],
    ...updates
  };

  return demoPatients[index];
}

/**
 * Delete patient (soft delete - set isActive to false)
 */
export function deletePatient(id) {
  const patient = findPatientById(id);

  if (!patient) {
    return false;
  }

  patient.isActive = false;
  return true;
}
