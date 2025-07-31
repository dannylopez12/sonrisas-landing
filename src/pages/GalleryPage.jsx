// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'galleryAlbums'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const albumsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlbums(albumsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Galería de Momentos - Fundación Sonrisas Inocentes</title>
        <meta name="description" content="Explora nuestros álbumes de fotos y revive los momentos especiales que hemos compartido gracias al apoyo de nuestra comunidad." />
      </Helmet>
      <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Galería de Momentos</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Cada imagen cuenta una historia de esperanza, superación y alegría.
            </p>
          </div>
          
          {loading ? (
            <p className="text-center">Cargando álbumes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/galeria/${album.id}`} className="block group">
                    <div className="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                      <img
                        src={album.images?.[0] || 'https://via.placeholder.com/500'} // Muestra la primera foto del álbum como portada
                        alt={album.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold text-xl">{album.title}</h3>
                        <p className="text-sm opacity-90">{album.images.length} foto(s)</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;