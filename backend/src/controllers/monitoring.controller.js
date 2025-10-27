/**
 * Monitoring Controller
 *
 * Handles all patient monitoring operations:
 * - Start/end monitoring sessions
 * - Record vital signs
 * - Get monitoring history
 * - Real-time updates via Socket.io
 */

import {
  findSessionsByPatientId,
  findActiveSession,
  findSessionById,
  getVitalSignsBySessionId,
  getLatestVitalSigns,
  createMonitoringSession,
  addVitalSigns,
  endMonitoringSession
} from '../data/demoMonitoring.js';

/**
 * Start a new monitoring session
 */
export async function startMonitoring(req, res) {
  try {
    const { patientId, monitoringType, location, notes, deviceId } = req.body;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required'
      });
    }

    // Check if there's already an active session
    const existingSession = findActiveSession(patientId);
    if (existingSession) {
      return res.status(400).json({
        success: false,
        message: 'Patient already has an active monitoring session',
        session: existingSession
      });
    }

    const sessionData = {
      patientId,
      monitoringType: monitoringType || 'ROUTINE_CHECKUP',
      performedById: req.user.id,
      performedByName: `${req.user.firstName} ${req.user.lastName}`,
      location: location || 'Not specified',
      notes: notes || '',
      deviceId: deviceId || null
    };

    const newSession = createMonitoringSession(sessionData);

    // Emit socket event for real-time update
    const io = req.app.get('io');
    io.emit(`monitoring-started-${patientId}`, newSession);

    res.status(201).json({
      success: true,
      message: 'Monitoring session started',
      session: newSession
    });
  } catch (error) {
    console.error('Start monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start monitoring session'
    });
  }
}

/**
 * Record vital signs during monitoring
 */
export async function recordVitalSigns(req, res) {
  try {
    const { sessionId } = req.params;
    const {
      systolicBP,
      diastolicBP,
      heartRate,
      spO2,
      temperature,
      notes
    } = req.body;

    const session = findSessionById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Monitoring session not found'
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add vital signs to inactive session'
      });
    }

    const vitalData = {
      sessionId,
      patientId: session.patientId,
      systolicBP: Number(systolicBP),
      diastolicBP: Number(diastolicBP),
      heartRate: Number(heartRate),
      spO2: Number(spO2),
      temperature: Number(temperature),
      notes: notes || null
    };

    const newVital = addVitalSigns(vitalData);

    // Emit socket event for real-time update
    const io = req.app.get('io');
    io.emit(`vital-signs-${session.patientId}`, newVital);
    io.emit(`vital-signs-session-${sessionId}`, newVital);

    // If alert level is RED or ORANGE, emit alert
    if (newVital.alertLevel === 'RED' || newVital.alertLevel === 'ORANGE') {
      io.emit(`alert-${session.patientId}`, {
        type: 'VITAL_SIGNS_ALERT',
        level: newVital.alertLevel,
        vital: newVital,
        patientId: session.patientId
      });
    }

    res.status(201).json({
      success: true,
      message: 'Vital signs recorded',
      vital: newVital
    });
  } catch (error) {
    console.error('Record vital signs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record vital signs'
    });
  }
}

/**
 * End monitoring session
 */
export async function stopMonitoring(req, res) {
  try {
    const { sessionId } = req.params;

    const session = findSessionById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Monitoring session not found'
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Session is already ended'
      });
    }

    const endedSession = endMonitoringSession(sessionId);

    // Emit socket event
    const io = req.app.get('io');
    io.emit(`monitoring-ended-${session.patientId}`, endedSession);

    res.json({
      success: true,
      message: 'Monitoring session ended',
      session: endedSession
    });
  } catch (error) {
    console.error('Stop monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to end monitoring session'
    });
  }
}

/**
 * Get monitoring sessions for a patient
 */
export async function getPatientSessions(req, res) {
  try {
    const { patientId } = req.params;

    const sessions = findSessionsByPatientId(patientId);

    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    console.error('Get patient sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sessions'
    });
  }
}

/**
 * Get active session for a patient
 */
export async function getActiveSession(req, res) {
  try {
    const { patientId } = req.params;

    const session = findActiveSession(patientId);

    if (!session) {
      return res.json({
        success: true,
        session: null
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Get active session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve active session'
    });
  }
}

/**
 * Get session details with vital signs
 */
export async function getSessionDetails(req, res) {
  try {
    const { sessionId } = req.params;

    const session = findSessionById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    const vitalSigns = getVitalSignsBySessionId(sessionId);

    res.json({
      success: true,
      session,
      vitalSigns
    });
  } catch (error) {
    console.error('Get session details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve session details'
    });
  }
}

/**
 * Get latest vital signs for a patient
 */
export async function getLatestVitals(req, res) {
  try {
    const { patientId } = req.params;

    const vitals = getLatestVitalSigns(patientId);

    res.json({
      success: true,
      vitals
    });
  } catch (error) {
    console.error('Get latest vitals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vital signs'
    });
  }
}
