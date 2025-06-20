// src/pages/HomePage.jsx
import React, { useState } from 'react';

// Importa las secciones
import Hero from '../sections/Hero.jsx';
import AboutUs from '../sections/AboutUs.jsx';
import Club from '../sections/Club.jsx';
import NewsSection from '../sections/NewsSection.jsx';
import Gallery from '../sections/Gallery.jsx';
// Importamos la sección de donación y el modal
import DonateSection from '../sections/DonateSection.jsx';
import DonationModal from '../components/DonationModal.jsx';

const HomePage = () => {
  // Ahora React sabe qué es useState
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main>
        <Hero />
        <AboutUs />
        <Club />
        <NewsSection />
        <Gallery />
        <DonateSection onDonateClick={openModal} />
      </main>

      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default HomePage;