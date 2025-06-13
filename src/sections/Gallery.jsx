// src/sections/Gallery.jsx
import React, { useRef } from 'react'; // 1. Importa useRef
// ... tus otras importaciones de Swiper ...
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// --- IMPORTA TUS IMÁGENES Y VIDEOS ---
// Imágenes
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
// Videos
import video1 from '../assets/video1.mp4'; // Asegúrate de tenerlos en assets
import video2 from '../assets/video2.mp4';

const Gallery = () => {
  // 2. CREA UNA ESTRUCTURA DE DATOS PARA MEDIOS MIXTOS
  const mediaItems = [
    { type: 'image', src: img1 },
    { type: 'video', src: video1 },
    { type: 'image', src: img2 },
    { type: 'video', src: video2 },
    { type: 'image', src: img3 },
    { type: 'image', src: img4 },
  ];

  const swiperRef = useRef(null); // Ref para controlar el Swiper

  const handleVideoPlay = () => {
    // Detiene el autoplay del carrusel cuando un video se reproduce
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    // Reanuda el autoplay cuando el video se pausa o termina
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Momentos</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Revive con nosotros la alegría y el progreso de nuestros niños.
        </p>
      </div>
      <Swiper
        ref={swiperRef} // 3. Asigna la referencia al Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3500, // Aumentamos un poco el delay
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="max-w-6xl mx-auto"
      >
        {mediaItems.map((item, index) => (
          <SwiperSlide key={index} style={{ width: '300px', height: '400px' }}>
            {/* 4. RENDERIZADO CONDICIONAL */}
            {item.type === 'image' ? (
              // Si es una imagen
              <img 
                src={item.src} 
                alt={`Galería de la fundación ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy" // Carga la imagen de forma perezosa
              />
            ) : (
              // Si es un video
              <video
                src={item.src}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                controls // Muestra los controles de reproducción
                muted // Esencial: los videos deben empezar sin sonido
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoPause} // También reanuda al terminar
                loading="lazy" // Carga el video de forma perezosa
              ></video>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;