/**
 * Patient List Page
 *
 * Displays all patients with search and filter capabilities.
 * Allows navigation to patient details and registration.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyPatients } from '../services/patientService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function PatientList() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPregnant, setFilterPregnant] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Apply filters when patients, search, or filters change
  useEffect(() => {
    applyFilters();
  }, [patients, searchTerm, filterPregnant, filterRisk]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getMyPatients();
      setPatients(data.patients || []);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...patients];

    // Search by name
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search)
      );
    }

    // Filter by pregnancy status
    if (filterPregnant !== 'all') {
      const isPregnant = filterPregnant === 'pregnant';
      filtered = filtered.filter((p) => p.isPregnant === isPregnant);
    }

    // Filter by risk level
    if (filterRisk !== 'all') {
      filtered = filtered.filter((p) => p.riskLevel === filterRisk);
    }

    setFilteredPatients(filtered);
  };

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-alert-red-light text-alert-red-dark border border-alert-red';
      case 'MODERATE':
        return 'bg-alert-yellow-light text-alert-yellow-dark border border-alert-yellow';
      case 'LOW':
        return 'bg-alert-green-light text-alert-green-dark border border-alert-green';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPregnancyStatus = (patient) => {
    if (patient.isPregnant) {
      return `${patient.currentGestationalAge} weeks`;
    }
    if (patient.deliveryDate) {
      return 'Postpartum';
    }
    return 'Not Pregnant';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-neutral-600">Loading patients...</p>
        </div>
      </div>
    );
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
              <Link to="/dashboard" className="text-sm text-neutral-600 hover:text-primary-600">
                Dashboard
              </Link>
              <span className="text-sm text-neutral-600">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="MAMA HAI" className="h-8 w-auto" />
              <div>
                <h1 className="text-lg font-bold text-primary-600">Patients</h1>
              </div>
            </div>
            <Link to="/patients/register" className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium active:bg-primary-700">
              + Add
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Header - Desktop only */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-600">Patients</h1>
            <p className="text-neutral-600 mt-1">
              Manage and monitor your patients
            </p>
          </div>
          <Link to="/patients/register" className="btn btn-primary">
            + Register New Patient
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Search by name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Pregnancy Status Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Pregnancy Status
              </label>
              <select
                className="input"
                value={filterPregnant}
                onChange={(e) => setFilterPregnant(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pregnant">Pregnant</option>
                <option value="not-pregnant">Not Pregnant</option>
              </select>
            </div>

            {/* Risk Level Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Risk Level
              </label>
              <select
                className="input"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="HIGH">High Risk</option>
                <option value="MODERATE">Moderate Risk</option>
                <option value="LOW">Low Risk</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-neutral-600">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>

        {/* Patient List */}
        {filteredPatients.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No patients found
            </h3>
            <p className="text-neutral-600 mb-6">
              {patients.length === 0
                ? 'Get started by registering your first patient'
                : 'Try adjusting your search or filters'}
            </p>
            {patients.length === 0 && (
              <Link to="/patients/register" className="btn btn-primary">
                Register New Patient
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="card hover:shadow-lg transition-shadow cursor-pointer active:scale-98"
                onClick={() => navigate(`/patients/${patient.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="text-base md:text-lg font-semibold text-neutral-800">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(
                          patient.riskLevel
                        )}`}
                      >
                        {patient.riskLevel}
                      </span>
                      {patient.isPregnant && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          Pregnant
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm">
                      <div>
                        <p className="text-neutral-500">Age / Blood</p>
                        <p className="font-medium">{patient.age}y • {patient.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">G-P-A-L-D</p>
                        <p className="font-medium">
                          {patient.gravida}-{patient.para}-{patient.abortus}-
                          {patient.living}-{patient.deaths}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-neutral-500">Status</p>
                        <p className="font-medium">{getPregnancyStatus(patient)}</p>
                      </div>
                    </div>

                    {patient.nextAppointment && (
                      <div className="mt-2 pt-2 border-t border-neutral-100 text-xs md:text-sm">
                        <span className="text-neutral-500">Next: </span>
                        <span className="font-medium text-primary-600">
                          {new Date(patient.nextAppointment).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="ml-3 flex-shrink-0">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
