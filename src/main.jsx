// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // <-- 1. IMPORTA EL ROUTER AQUÍ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>  {/* <-- 2. ENVUELVE APP AQUÍ */}
      <App />
    </Router>
  </React.StrictMode>,
);