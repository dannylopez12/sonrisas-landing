// src/sections/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    // 1. Contenedor principal: Le decimos que sea 'relative' para posicionar el overlay dentro.
    //    Usamos nuestra nueva clase 'bg-hero-background', y 'bg-cover' y 'bg-center' para que la imagen se vea bien.
    <div className="relative bg-hero-background bg-cover bg-center">
      
      {/* 2. El Overlay: Una capa oscura semitransparente que va sobre la imagen pero debajo del texto. */}
      {/*    'absolute inset-0' hace que ocupe todo el espacio del contenedor padre. */}
      {/*    'bg-black/60' le da un color negro con 60% de opacidad. */}
      {/*    'z-10' la pone en una capa intermedia. */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 3. Contenedor del contenido: Lo hacemos 'relative' y con un z-index mayor para que quede por encima del overlay. */}
      <div className="relative z-20 text-white text-center py-20 lg:py-32 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Fundación <span className="text-foundation-yellow">Sonrisas Inocentes</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Ayúdanos a dar más sonrisas. Un proyecto social para dejar huellas en el futuro.
        </p>
      </div>
      
    </div>
  );
};

export default Hero;