/**
 * MAMA HAI - Main App Component
 *
 * This is the root component of the application.
 * It will contain routing, authentication logic, and global state management.
 *
 * For Phase 1, this is a simple placeholder that shows the app is running.
 */

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full text-center">
        {/* MAMA HAI Logo/Header */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="MAMA HAI Logo"
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-primary-600 mb-2">
            MAMA HAI
          </h1>
          <p className="text-xl text-neutral-600">
            Maternal Health Monitoring System
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-alert-green-light border-2 border-alert-green rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <svg
              className="w-12 h-12 text-alert-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-alert-green-dark mb-2">
            Phase 1 Complete!
          </h2>
          <p className="text-neutral-700">
            The foundation is set up and ready. React, Vite, TailwindCSS, and all dependencies are installed.
          </p>
        </div>

        {/* Test Counter */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <p className="text-lg text-neutral-700 mb-4">
            Test the interactive features:
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="btn btn-primary text-lg px-8 py-4"
          >
            Click Count: {count}
          </button>
        </div>

        {/* Next Steps */}
        <div className="text-left bg-primary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-3">
            Next Steps:
          </h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Project structure created</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Dependencies installed</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>TailwindCSS configured with healthcare theme</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>PWA setup complete</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span className="font-medium">Ready for Phase 2: Authentication System</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-neutral-500">
          <p>Built with React + Vite + TailwindCSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
