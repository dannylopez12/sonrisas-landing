// src/App.jsx
import React from 'react';
// YA NO importamos el Router aquí
import { Routes, Route } from 'react-router-dom';

// Importa los componentes principales y las páginas
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import SingleNewsPage from './pages/SingleNewsPage.jsx';

function App() {
  // Simplemente retornamos el contenido, sin el <Router>
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/noticias" element={<NewsPage />} />
        <Route path="/noticias/:articleId" element={<SingleNewsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;