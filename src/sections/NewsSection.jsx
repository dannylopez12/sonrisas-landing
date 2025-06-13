// src/sections/NewsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 1. AHORA SOLO IMPORTAMOS LOS DATOS DESDE SU ARCHIVO CENTRAL
import newsData from '../data/newsData.js';

// 2. VARIANTES DE ANIMACIÓN: Esto se queda igual.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const NewsSection = () => {
  // Mostraremos solo las 3 primeras noticias en la página de inicio
  const featuredNews = newsData.slice(0, 3);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Últimas Noticias</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente al día con nuestras actividades, logros y las historias que hacen posible nuestra misión.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Usamos los datos importados */}
          {featuredNews.map((article) => (
            <motion.div
              key={article.id}
              className={`
                bg-gray-50 rounded-lg shadow-lg overflow-hidden group 
                ${article.featured ? 'lg:col-span-2' : ''}
              `}
              variants={cardVariants}
            >
              <div className="overflow-hidden h-64">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                {/* Cambiamos 'summary' por 'short_description' para coincidir con el archivo de datos */}
                <p className="text-gray-600 mb-4">{article.short_description}</p>
                <Link to={`/noticias/${article.id}`} className="font-semibold text-foundation-blue hover:text-blue-700 transition-colors">
                  Leer más →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;