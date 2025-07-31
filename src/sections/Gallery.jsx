// src/sections/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Función para barajar un array (Algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GalleryPreview = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. OBTENEMOS TODOS LOS ÁLBUMES
    const q = query(collection(db, 'galleryAlbums'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 2. RECOPILAMOS TODAS LAS IMÁGENES DE TODOS LOS ÁLBUMES EN UN SOLO LUGAR
      // Guardamos tanto la URL de la imagen como el ID del álbum al que pertenece
      const allImages = snapshot.docs.flatMap(doc => 
        doc.data().images.map(imageUrl => ({
          imageUrl,
          albumId: doc.id,
          albumTitle: doc.data().title
        }))
      );

      // 3. BARAJAMOS Y SELECCIONAMOS UNA MUESTRA
      const shuffled = shuffleArray(allImages);
      setRandomImages(shuffled.slice(0, 10)); // Mostramos hasta 10 imágenes aleatorias
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Cargando galería...</div>;
  }

  return (
    <section id="gallery" className="py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Momentos</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Un carrusel de sonrisas y logros. Haz clic en una foto para ver el álbum completo.
        </p>
      </div>
      
      {/* 4. RENDERIZAMOS EL CARRUSEL CON LAS IMÁGENES ALEATORIAS */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Navigation]}
        className="w-full"
      >
        {randomImages.map(({ imageUrl, albumId, albumTitle }, index) => (
          <SwiperSlide key={`${albumId}-${index}`} style={{ width: '320px', height: '420px' }}>
            {/* CADA SLIDE ES UN ENLACE AL ÁLBUM CORRESPONDIENTE */}
            <Link to={`/galeria/${albumId}`} className="block w-full h-full group relative">
              <img 
                src={imageUrl} 
                alt={`Foto del álbum ${albumTitle}`} 
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white p-4 rounded-lg">
                <span className="font-bold text-center">Ver Álbum: <br/> {albumTitle}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GalleryPreview;