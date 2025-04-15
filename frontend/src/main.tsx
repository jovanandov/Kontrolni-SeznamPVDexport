import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

console.log('Starting application...');

// Preverimo, če root element obstaja
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element ni najden!');
  // Ustvarimo root element, če ne obstaja
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

// Ustvarimo root
const root = ReactDOM.createRoot(rootElement || document.getElementById('root')!);

// Renderiramo aplikacijo
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

console.log('Application rendered'); 