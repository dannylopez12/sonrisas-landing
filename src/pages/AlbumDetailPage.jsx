// src/pages/AlbumDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { db } from '../firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const AlbumDetailPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!albumId) return;
      const docRef = doc(db, 'galleryAlbums', albumId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAlbum({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Álbum no encontrado!");
      }
      setLoading(false);
    };
    fetchAlbum();
  }, [albumId]);

  const handleLike = async (imageUrl) => {
    const albumRef = doc(db, 'galleryAlbums', albumId);
    const imageKey = btoa(imageUrl);

    setAlbum(prevAlbum => {
      const currentLikes = prevAlbum.likes?.[imageKey] || 0;
      return { ...prevAlbum, likes: { ...prevAlbum.likes, [imageKey]: currentLikes + 1 } };
    });

    try {
      await updateDoc(albumRef, { [`likes.${imageKey}`]: increment(1) });
      console.log('Like guardado en Firestore!');
    } catch (error) {
      console.error("Error al guardar el like: ", error);
      setAlbum(prevAlbum => {
        const currentLikes = prevAlbum.likes?.[imageKey] || 1;
        return { ...prevAlbum, likes: { ...prevAlbum.likes, [imageKey]: currentLikes - 1 } };
      });
    }
  };

  if (loading) return <p className="text-center py-20">Cargando álbum...</p>;
  if (!album) return <p className="text-center py-20">Álbum no encontrado.</p>;

  return (
    <>
      <Helmet>
        <title>{album.title} - Galería Sonrisas Inocentes</title>
        <meta name="description" content={album.description || `Álbum de fotos de ${album.title}`} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <Link 
            to="/galeria" 
            className="inline-flex items-center text-gray-600 hover:text-foundation-blue font-semibold transition-colors group"
          >
            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Volver a todos los álbumes
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">{album.title}</h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">{album.description}</p>

        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="mySwiper2 mb-4 rounded-lg shadow-xl"
        >
          {album.images?.map((imageUrl, index) => {
            const imageKey = btoa(imageUrl);
            return (
              <SwiperSlide key={index}>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img src={imageUrl} alt={`Foto ${index + 1}`} className="w-full h-full object-contain" />
                </div>
                <button 
                  onClick={() => handleLike(imageUrl)} 
                  className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/90 text-red-500 px-4 py-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FaHeart />
                  <span className="font-semibold">{album.likes?.[imageKey] || 0}</span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
        >
          {album.images?.map((imageUrl, index) => (
            <SwiperSlide key={index} className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity swiper-slide-thumb-active:opacity-100">
              <img src={imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default AlbumDetailPage;