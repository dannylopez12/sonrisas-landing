// src/pages/AdminDashboard.jsx
import React, { useState, useMemo } from 'react'; // 1. IMPORTAMOS useMemo
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AdminGallery from '../components/AdminGallery';
import AdminNews from '../components/AdminNews';

const AdminDashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar la sesión.");
    }
  };
  
  // 2. USAMOS useMemo PARA OPTIMIZAR EL RENDERIZADO DEL CONTENIDO
  // React solo volverá a ejecutar esta lógica si 'activeTab' cambia.
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'gallery':
        return <AdminGallery />;
      case 'news':
        return <AdminNews />;
      default:
        // Es una buena práctica tener un caso por defecto
        return <div className="text-center p-8">Selecciona una pestaña para comenzar.</div>;
    }
  }, [activeTab]); // El array de dependencias asegura que esto solo se recalcule cuando activeTab cambie

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 w-full sm:w-auto">Panel de Administración</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 w-full sm:w-auto">
            Cerrar Sesión
          </button>
        </header>

        {/* --- NAVEGACIÓN POR PESTAÑAS --- */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'gallery' ? 'border-foundation-blue text-foundation-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Gestión de Galería
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'news' ? 'border-foundation-blue text-foundation-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Gestión de Noticias
            </button>
          </nav>
        </div>

        {/* --- CONTENIDO DE LA PESTAÑA ACTIVA (OPTIMIZADO) --- */}
        <div>
          {/* 3. Renderizamos la variable memorizada */}
          {tabContent}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;