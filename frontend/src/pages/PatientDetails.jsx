/**
 * Patient Details Page
 *
 * Displays comprehensive patient information
 * including obstetrical data, medical history, and monitoring options
 */

import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPatient } from '../services/patientService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function PatientDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const data = await getPatient(id);
      if (data.success) {
        setPatient(data.patient);
      } else {
        toast.error('Patient not found');
        navigate('/patients');
      }
    } catch (error) {
      console.error('Failed to fetch patient:', error);
      toast.error('Failed to load patient details');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-alert-red-light text-alert-red-dark border-2 border-alert-red';
      case 'MODERATE':
        return 'bg-alert-yellow-light text-alert-yellow-dark border-2 border-alert-yellow';
      case 'LOW':
        return 'bg-alert-green-light text-alert-green-dark border-2 border-alert-green';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-neutral-600">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pb-20 md:pb-0">
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="MAMA HAI" className="h-10 w-auto" />
              <span className="text-xl font-bold text-primary-600">MAMA HAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/patients" className="text-sm text-neutral-600 hover:text-primary-600">
                Back to Patients
              </Link>
              <Link to="/dashboard" className="text-sm text-neutral-600 hover:text-primary-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link to="/patients" className="text-neutral-600 active:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="MAMA HAI" className="h-8 w-auto" />
              <h1 className="text-lg font-bold text-primary-600">Patient Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-600">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-neutral-600 mt-1">Patient ID: {patient.id}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getRiskBadgeColor(
                patient.riskLevel
              )}`}
            >
              {patient.riskLevel} RISK
            </span>
            {patient.isPregnant && (
              <span className="inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white">
                PREGNANT
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Age</p>
                  <p className="font-medium">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Date of Birth</p>
                  <p className="font-medium">{formatDate(patient.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Blood Type</p>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Language</p>
                  <p className="font-medium">{patient.language}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Phone Number</p>
                  <p className="font-medium">{patient.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Emergency Contact</p>
                  <p className="font-medium text-xs">
                    {patient.emergencyContactName || 'N/A'}
                  </p>
                  <p className="text-xs text-neutral-600">{patient.emergencyContact || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-neutral-500">Address</p>
                  <p className="font-medium">{patient.address || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Obstetrical Data */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                Obstetrical History (G-P-A-L-D)
              </h2>
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary-600">{patient.gravida}</p>
                    <p className="text-sm text-neutral-600 mt-1">Gravida</p>
                    <p className="text-xs text-neutral-500">Total pregnancies</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary-600">{patient.para}</p>
                    <p className="text-sm text-neutral-600 mt-1">Para</p>
                    <p className="text-xs text-neutral-500">Births (20+ weeks)</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary-600">{patient.abortus}</p>
                    <p className="text-sm text-neutral-600 mt-1">Abortus</p>
                    <p className="text-xs text-neutral-500">Losses (&lt;20 weeks)</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary-600">{patient.living}</p>
                    <p className="text-sm text-neutral-600 mt-1">Living</p>
                    <p className="text-xs text-neutral-500">Living children</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary-600">{patient.deaths}</p>
                    <p className="text-sm text-neutral-600 mt-1">Deaths</p>
                    <p className="text-xs text-neutral-500">Child deaths</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Pregnancy Status */}
            {patient.isPregnant && (
              <div className="card">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Current Pregnancy
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Gestational Age</p>
                    <p className="font-medium text-lg">
                      {patient.currentGestationalAge} weeks
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Trimester</p>
                    <p className="font-medium text-lg">
                      {patient.currentGestationalAge < 13
                        ? 'First'
                        : patient.currentGestationalAge < 27
                        ? 'Second'
                        : 'Third'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Last Menstrual Period</p>
                    <p className="font-medium">{formatDate(patient.lastMenstrualPeriod)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Estimated Due Date</p>
                    <p className="font-medium">{formatDate(patient.estimatedDueDate)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Medical History */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                Medical Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Medical History</p>
                  <p className="text-neutral-600 mt-1">
                    {patient.medicalHistory || 'No medical history recorded'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Allergies</p>
                  <p className="text-neutral-600 mt-1">{patient.allergies || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Current Medications</p>
                  <p className="text-neutral-600 mt-1">
                    {patient.currentMedications || 'None'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Status */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="btn btn-primary w-full" disabled>
                  Start Monitoring
                  <span className="text-xs ml-2">(Phase 4)</span>
                </button>
                <button className="btn btn-outline w-full" disabled>
                  View History
                  <span className="text-xs ml-2">(Phase 4)</span>
                </button>
                <button className="btn btn-outline w-full" disabled>
                  Send Alert
                  <span className="text-xs ml-2">(Phase 5)</span>
                </button>
                <button className="btn btn-outline w-full" disabled>
                  Create Referral
                  <span className="text-xs ml-2">(Phase 6)</span>
                </button>
              </div>
            </div>

            {/* Status Summary */}
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">Status Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Registration Date</span>
                  <span className="text-sm font-medium">
                    {formatDate(patient.registrationDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Last Visit</span>
                  <span className="text-sm font-medium">{formatDate(patient.lastVisit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Next Appointment</span>
                  <span className="text-sm font-medium">
                    {formatDate(patient.nextAppointment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Monitoring Frequency</span>
                  <span className="text-sm font-medium">
                    {patient.monitoringFrequency?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Total Sessions</span>
                  <span className="text-sm font-medium">{patient.totalMonitoringSessions}</span>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            {patient.riskFactors && patient.riskFactors.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Risk Factors</h2>
                <ul className="space-y-2">
                  {patient.riskFactors.map((factor, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-neutral-700"
                    >
                      <svg
                        className="w-5 h-5 text-alert-yellow-dark mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
