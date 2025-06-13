// src/pages/HomePage.jsx
import React from 'react';

// Importa las secciones que quieres en la página de inicio
import Hero from '../sections/Hero.jsx';
import AboutUs from '../sections/AboutUs.jsx';
import Club from '../sections/Club.jsx';
import NewsSection from '../sections/NewsSection.jsx';
import Gallery from '../sections/Gallery.jsx';
import DonateSection from '../sections/DonateSection.jsx';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Club />
      <NewsSection />
      <Gallery />
      <DonateSection />
    </main>
  );
};

export default HomePage;