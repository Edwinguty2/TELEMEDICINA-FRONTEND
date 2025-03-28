import React from 'react';
import ReactDOM from 'react-dom/client';  // Cambiar la importación
import './index.css';  // Si estás usando estilos
import App from './App';

// Crea un "root" donde React montará la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usar el método `root.render()` para renderizar la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
