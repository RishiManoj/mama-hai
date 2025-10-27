/**
 * Demo Monitoring Data
 *
 * Mock monitoring session and vital signs data for testing without database.
 * Includes vital signs (BP, HR, SpO2, Temperature) and Shock Index calculations.
 */

// Monitoring Sessions
export const demoMonitoringSessions = [
  {
    id: 'session-001',
    patientId: 'patient-001',
    startTime: '2025-10-27T10:00:00.000Z',
    endTime: null, // Active session
    isActive: true,
    monitoringType: 'ROUTINE_CHECKUP',
    performedById: 'demo-user-1',
    performedByName: 'Dr. Sarah Johnson',
    location: 'Ward A - Bed 12',
    notes: 'Regular monitoring during pregnancy week 28',
    deviceId: 'SMART-MAT-001'
  },
  {
    id: 'session-002',
    patientId: 'patient-003',
    startTime: '2025-10-27T09:30:00.000Z',
    endTime: null, // Active session
    isActive: true,
    monitoringType: 'HIGH_RISK_MONITORING',
    performedById: 'demo-user-2',
    performedByName: 'Nurse Mary Okonkwo',
    location: 'High Risk Unit - Room 5',
    notes: 'Continuous monitoring for hypertension patient',
    deviceId: 'LIFE-SIGNS-002'
  },
  {
    id: 'session-003',
    patientId: 'patient-001',
    startTime: '2025-10-20T14:00:00.000Z',
    endTime: '2025-10-20T14:15:00.000Z',
    isActive: false,
    monitoringType: 'ROUTINE_CHECKUP',
    performedById: 'demo-user-2',
    performedByName: 'Nurse Mary Okonkwo',
    location: 'Clinic Room 3',
    notes: 'Weekly routine checkup',
    deviceId: 'SMART-MAT-001'
  }
];

// Vital Signs Records
export const demoVitalSigns = [
  // Active session for patient-001 (MODERATE risk)
  {
    id: 'vital-001',
    sessionId: 'session-001',
    patientId: 'patient-001',
    timestamp: '2025-10-27T10:00:00.000Z',
    systolicBP: 125,
    diastolicBP: 78,
    heartRate: 82,
    spO2: 98,
    temperature: 36.8,
    shockIndex: 0.66, // HR/systolicBP = 82/125
    alertLevel: 'GREEN', // Normal
    notes: 'Patient comfortable, no complaints'
  },
  {
    id: 'vital-002',
    sessionId: 'session-001',
    patientId: 'patient-001',
    timestamp: '2025-10-27T10:05:00.000Z',
    systolicBP: 128,
    diastolicBP: 80,
    heartRate: 84,
    spO2: 97,
    temperature: 36.9,
    shockIndex: 0.66,
    alertLevel: 'GREEN',
    notes: null
  },
  {
    id: 'vital-003',
    sessionId: 'session-001',
    patientId: 'patient-001',
    timestamp: '2025-10-27T10:10:00.000Z',
    systolicBP: 132,
    diastolicBP: 82,
    heartRate: 88,
    spO2: 98,
    temperature: 37.0,
    shockIndex: 0.67,
    alertLevel: 'YELLOW', // Slightly elevated
    notes: 'BP trending up, continue monitoring'
  },

  // Active session for patient-003 (HIGH risk with hypertension)
  {
    id: 'vital-004',
    sessionId: 'session-002',
    patientId: 'patient-003',
    timestamp: '2025-10-27T09:30:00.000Z',
    systolicBP: 152,
    diastolicBP: 95,
    heartRate: 92,
    spO2: 96,
    temperature: 37.2,
    shockIndex: 0.61,
    alertLevel: 'YELLOW', // Hypertension
    notes: 'Known hypertensive patient, on medication'
  },
  {
    id: 'vital-005',
    sessionId: 'session-002',
    patientId: 'patient-003',
    timestamp: '2025-10-27T09:35:00.000Z',
    systolicBP: 158,
    diastolicBP: 98,
    heartRate: 96,
    spO2: 95,
    temperature: 37.3,
    shockIndex: 0.61,
    alertLevel: 'ORANGE', // Worsening hypertension
    notes: 'BP increasing, doctor notified'
  },
  {
    id: 'vital-006',
    sessionId: 'session-002',
    patientId: 'patient-003',
    timestamp: '2025-10-27T09:40:00.000Z',
    systolicBP: 162,
    diastolicBP: 100,
    heartRate: 100,
    spO2: 94,
    temperature: 37.4,
    shockIndex: 0.62,
    alertLevel: 'RED', // Critical hypertension
    notes: 'ALERT: Severe hypertension, immediate intervention needed'
  },

  // Completed session for patient-001
  {
    id: 'vital-007',
    sessionId: 'session-003',
    patientId: 'patient-001',
    timestamp: '2025-10-20T14:00:00.000Z',
    systolicBP: 118,
    diastolicBP: 75,
    heartRate: 78,
    spO2: 99,
    temperature: 36.7,
    shockIndex: 0.66,
    alertLevel: 'GREEN',
    notes: 'All vitals normal'
  },
  {
    id: 'vital-008',
    sessionId: 'session-003',
    patientId: 'patient-001',
    timestamp: '2025-10-20T14:15:00.000Z',
    systolicBP: 120,
    diastolicBP: 76,
    heartRate: 80,
    spO2: 98,
    temperature: 36.8,
    shockIndex: 0.67,
    alertLevel: 'GREEN',
    notes: 'Session completed successfully'
  }
];

/**
 * Calculate Shock Index
 * SI = Heart Rate / Systolic BP
 * Normal: 0.5-0.7
 * Elevated: 0.7-1.0
 * Critical: > 1.0
 */
export function calculateShockIndex(heartRate, systolicBP) {
  if (!heartRate || !systolicBP || systolicBP === 0) return null;
  return Number((heartRate / systolicBP).toFixed(2));
}

/**
 * Determine alert level based on vital signs
 */
export function determineAlertLevel(vitals) {
  const { systolicBP, diastolicBP, heartRate, spO2, temperature, shockIndex } = vitals;

  // RED - Critical (Immediate intervention needed)
  if (
    systolicBP >= 160 || systolicBP < 90 ||
    diastolicBP >= 100 || diastolicBP < 60 ||
    heartRate >= 120 || heartRate < 50 ||
    spO2 < 92 ||
    temperature >= 38.5 || temperature < 35.5 ||
    shockIndex > 1.0
  ) {
    return 'RED';
  }

  // ORANGE - Warning (Close monitoring required)
  if (
    (systolicBP >= 140 && systolicBP < 160) || (systolicBP >= 90 && systolicBP < 100) ||
    (diastolicBP >= 90 && diastolicBP < 100) || (diastolicBP >= 60 && diastolicBP < 70) ||
    (heartRate >= 100 && heartRate < 120) || (heartRate >= 50 && heartRate < 60) ||
    (spO2 >= 92 && spO2 < 95) ||
    (temperature >= 38.0 && temperature < 38.5) || (temperature >= 35.5 && temperature < 36.0) ||
    (shockIndex >= 0.9 && shockIndex <= 1.0)
  ) {
    return 'ORANGE';
  }

  // YELLOW - Caution (Monitor trend)
  if (
    (systolicBP >= 130 && systolicBP < 140) || (systolicBP >= 100 && systolicBP < 110) ||
    (diastolicBP >= 85 && diastolicBP < 90) || (diastolicBP >= 70 && diastolicBP < 75) ||
    (heartRate >= 90 && heartRate < 100) || (heartRate >= 60 && heartRate < 65) ||
    (spO2 >= 95 && spO2 < 97) ||
    (temperature >= 37.5 && temperature < 38.0) || (temperature >= 36.0 && temperature < 36.5) ||
    (shockIndex >= 0.7 && shockIndex < 0.9)
  ) {
    return 'YELLOW';
  }

  // GREEN - Normal
  return 'GREEN';
}

/**
 * Find monitoring sessions by patient ID
 */
export function findSessionsByPatientId(patientId) {
  return demoMonitoringSessions.filter(s => s.patientId === patientId);
}

/**
 * Find active session for patient
 */
export function findActiveSession(patientId) {
  return demoMonitoringSessions.find(s => s.patientId === patientId && s.isActive);
}

/**
 * Find session by ID
 */
export function findSessionById(sessionId) {
  return demoMonitoringSessions.find(s => s.id === sessionId);
}

/**
 * Get vital signs for a session
 */
export function getVitalSignsBySessionId(sessionId) {
  return demoVitalSigns.filter(v => v.sessionId === sessionId);
}

/**
 * Get latest vital signs for a patient
 */
export function getLatestVitalSigns(patientId) {
  const patientVitals = demoVitalSigns.filter(v => v.patientId === patientId);
  if (patientVitals.length === 0) return null;

  return patientVitals.sort((a, b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  )[0];
}

/**
 * Create new monitoring session
 */
let nextSessionId = 4;
export function createMonitoringSession(sessionData) {
  const newSession = {
    id: `session-${String(nextSessionId).padStart(3, '0')}`,
    ...sessionData,
    startTime: new Date().toISOString(),
    endTime: null,
    isActive: true
  };

  demoMonitoringSessions.push(newSession);
  nextSessionId++;

  return newSession;
}

/**
 * Add vital signs to a session
 */
let nextVitalId = 9;
export function addVitalSigns(vitalData) {
  const shockIndex = calculateShockIndex(vitalData.heartRate, vitalData.systolicBP);
  const alertLevel = determineAlertLevel({ ...vitalData, shockIndex });

  const newVital = {
    id: `vital-${String(nextVitalId).padStart(3, '0')}`,
    ...vitalData,
    timestamp: new Date().toISOString(),
    shockIndex,
    alertLevel
  };

  demoVitalSigns.push(newVital);
  nextVitalId++;

  return newVital;
}

/**
 * End monitoring session
 */
export function endMonitoringSession(sessionId) {
  const session = findSessionById(sessionId);
  if (!session) return null;

  session.endTime = new Date().toISOString();
  session.isActive = false;

  return session;
}
