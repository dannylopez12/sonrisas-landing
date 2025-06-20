// src/pages/HomePage.jsx
import React from 'react';

// Importa todas las secciones que componen la página de inicio
import Hero from '../sections/Hero.jsx';
import AboutUs from '../sections/AboutUs.jsx';
import Club from '../sections/Club.jsx';
import NewsSection from '../sections/NewsSection.jsx';
import Gallery from '../sections/Gallery.jsx';
import DonateSection from '../sections/DonateSection.jsx';

// 1. El componente ahora recibe la prop 'onDonateClick' desde App.jsx
const HomePage = ({ onDonateClick }) => {
  return (
    // Ya no necesitamos un fragmento vacío (<>), 'main' es suficiente.
    <main>
      <Hero />
      <AboutUs />
      <Club />
      <NewsSection />
      <Gallery />
      {/* 2. Le pasamos la función que recibimos directamente a la sección de donación */}
      <DonateSection onDonateClick={onDonateClick} />
    </main>
  );
};

export default HomePage;