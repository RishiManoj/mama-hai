/**
 * MAMA HAI - Main Entry Point
 *
 * This is where the React application starts.
 * It renders the root App component into the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('✅ Service Worker registered:', registration.scope);
      },
      (error) => {
        console.log('❌ Service Worker registration failed:', error);
      }
    );
  });
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
