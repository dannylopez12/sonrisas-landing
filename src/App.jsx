// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes principales y las páginas
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DonationModal from './components/DonationModal.jsx'; // ¡Necesitamos renderizarlo!
import HomePage from './pages/HomePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import SingleNewsPage from './pages/SingleNewsPage.jsx';

function App() {
  // 1. El estado y las funciones para el modal viven aquí, en el componente padre. ¡Esto está perfecto!
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Es buena práctica no tener clases innecesarias como "App" cuando se usa Tailwind.
    <div>
      {/* 2. Le pasamos la función 'openModal' al Navbar para que el botón "Donar" funcione desde cualquier página. */}
      <Navbar onDonateClick={openModal} />

      {/* El contenido principal de cada página se renderizará aquí. */}
      <main>
        <Routes>
          {/* 3. Le pasamos la función 'openModal' al elemento HomePage. */}
          <Route path="/" element={<HomePage onDonateClick={openModal} />} />
          
          {/* Las otras páginas no necesitan la función, pero podrían recibirla si tuvieran un botón de donar. */}
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:articleId" element={<SingleNewsPage />} />
        </Routes>
      </main>

      <Footer />

      {/* 4. Renderizamos el Modal aquí, fuera de las rutas, para que pueda aparecer sobre cualquier página. */}
      {/*    Lo controlamos con el estado que vive en este mismo componente App.jsx. */}
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;