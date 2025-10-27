/**
 * Patient Registration Page
 *
 * Form to register new patients with all necessary information
 * including obstetrical data (G-P-A-L-D)
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerPatient } from '../services/patientService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function PatientRegister() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    bloodType: 'O+',
    phoneNumber: '',
    emergencyContact: '',
    emergencyContactName: '',
    address: '',
    language: 'ENGLISH',

    // Obstetrical Data (G-P-A-L-D)
    gravida: 0,
    para: 0,
    abortus: 0,
    living: 0,
    deaths: 0,

    // Current Pregnancy
    isPregnant: false,
    currentGestationalAge: '',
    estimatedDueDate: '',
    lastMenstrualPeriod: '',

    // Risk Assessment
    riskLevel: 'LOW',
    riskFactors: '',

    // Medical History
    medicalHistory: '',
    allergies: '',
    currentMedications: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Process risk factors (convert from comma-separated string to array)
      const processedData = {
        ...formData,
        riskFactors: formData.riskFactors
          ? formData.riskFactors.split(',').map((f) => f.trim())
          : [],
        // Only include pregnancy data if patient is pregnant
        currentGestationalAge: formData.isPregnant ? parseInt(formData.currentGestationalAge) || null : null,
        estimatedDueDate: formData.isPregnant ? formData.estimatedDueDate || null : null,
        lastMenstrualPeriod: formData.isPregnant ? formData.lastMenstrualPeriod || null : null
      };

      const result = await registerPatient(processedData);

      if (result.success) {
        toast.success('Patient registered successfully!');
        navigate(`/patients/${result.patient.id}`);
      } else {
        toast.error(result.message || 'Failed to register patient');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary-600">Register New Patient</h1>
          <p className="text-neutral-600 mt-1">
            Enter patient information and obstetrical data
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input"
                  placeholder="+234-XXX-XXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="ENGLISH">English</option>
                  <option value="HAUSA">Hausa</option>
                  <option value="YORUBA">Yoruba</option>
                  <option value="IGBO">Igbo</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Contact name and relationship"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Emergency Contact Number
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="input"
                  placeholder="+234-XXX-XXX-XXXX"
                />
              </div>
            </div>
          </div>

          {/* Obstetrical Data (G-P-A-L-D) */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Obstetrical History (G-P-A-L-D)
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Gravida (G)
                </label>
                <input
                  type="number"
                  name="gravida"
                  value={formData.gravida}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Total pregnancies</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Para (P)
                </label>
                <input
                  type="number"
                  name="para"
                  value={formData.para}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Births after 20 weeks</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Abortus (A)
                </label>
                <input
                  type="number"
                  name="abortus"
                  value={formData.abortus}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Losses before 20 weeks</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Living (L)
                </label>
                <input
                  type="number"
                  name="living"
                  value={formData.living}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Living children</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Deaths (D)
                </label>
                <input
                  type="number"
                  name="deaths"
                  value={formData.deaths}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Child deaths</p>
              </div>
            </div>
          </div>

          {/* Current Pregnancy */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Current Pregnancy Status
            </h2>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPregnant"
                  checked={formData.isPregnant}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Patient is currently pregnant
                </span>
              </label>
            </div>

            {formData.isPregnant && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Gestational Age (weeks)
                  </label>
                  <input
                    type="number"
                    name="currentGestationalAge"
                    value={formData.currentGestationalAge}
                    onChange={handleChange}
                    min="0"
                    max="42"
                    className="input"
                    placeholder="e.g., 28"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Menstrual Period
                  </label>
                  <input
                    type="date"
                    name="lastMenstrualPeriod"
                    value={formData.lastMenstrualPeriod}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Estimated Due Date
                  </label>
                  <input
                    type="date"
                    name="estimatedDueDate"
                    value={formData.estimatedDueDate}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Risk Assessment & Medical History */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Risk Assessment & Medical History
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Risk Level
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="LOW">Low Risk</option>
                  <option value="MODERATE">Moderate Risk</option>
                  <option value="HIGH">High Risk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Risk Factors (comma-separated)
                </label>
                <input
                  type="text"
                  name="riskFactors"
                  value={formData.riskFactors}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., Age > 35, Diabetes, Previous complications"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  placeholder="Enter relevant medical history..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., Penicillin, Latex"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Medications
                </label>
                <input
                  type="text"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., Prenatal vitamins, Iron supplements"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/patients" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Registering...' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
