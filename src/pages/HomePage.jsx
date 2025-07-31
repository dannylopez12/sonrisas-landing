// src/pages/HomePage.jsx
import React from 'react';

import Hero from '../sections/Hero.jsx';
import AboutUs from '../sections/AboutUs.jsx';
import Club from '../sections/Club.jsx';
import NewsSection from '../sections/LatesNews.jsx';
import Gallery from '../sections/Gallery.jsx';
import DonateSection from '../sections/DonateSection.jsx';
import RecentDonors from '../sections/RecentDonors.jsx'; 

// El componente sigue recibiendo 'onDonateClick' desde App.jsx
const HomePage = ({ onDonateClick }) => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Club />
      <NewsSection />
      <Gallery />
      
      
      <RecentDonors />
      
      {/* Le pasamos la función a la sección de donación como antes */}
      <DonateSection onDonateClick={onDonateClick} />
    </main>
  );
};

export default HomePage;