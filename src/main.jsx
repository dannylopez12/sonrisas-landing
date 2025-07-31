// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importamos BrowserRouter una sola vez
import { HelmetProvider } from 'react-helmet-async'; // 2. Importamos el HelmetProvider
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. HelmetProvider envuelve todo para dar contexto a los componentes <Helmet> */}
    <HelmetProvider>
      {/* 4. BrowserRouter envuelve a App para habilitar el sistema de rutas */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);