import React from 'react';
import { motion } from 'framer-motion'; // 1. Importa motion

const AboutUs = () => {
  // 2. Define la animación
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Título de la sección */}
        <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
          Conoce Nuestra Causa
        </h2>
        
        <div className="flex flex-wrap -mx-4 justify-center">

          {/* Misión con Animación */}
          <motion.div 
            className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8" // Ajustado para un poco más de espacio
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }} // La animación se ejecuta una vez
            variants={cardVariants}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              {/* --- CONTENIDO DE MISIÓN --- */}
              <h3 className="text-2xl font-bold text-foundation-pink mb-4">
                Misión
              </h3>
              <p className="text-light-text leading-relaxed">
                Nuestra misión es brindar programas y servicios que le den a un niño capacidades para ser un adulto autosuficiente por medio de terapias de lenguaje, físicas, psicológicas, psicopedagógicas, gimnasia cerebral, terapia ocupacional con profesionales calificados por su experiencia y calidez.
              </p>
              {/* --- FIN CONTENIDO DE MISIÓN --- */}
            </div>
          </motion.div>

          {/* Visión con Animación */}
          <motion.div 
            className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8" // Ajustado para un poco más de espacio
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants} // Reutilizamos la misma animación
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              {/* --- CONTENIDO DE VISIÓN --- */}
              <h3 className="text-2xl font-bold text-foundation-green mb-4">
                Visión
              </h3>
              <p className="text-light-text leading-relaxed">
                En cinco años ser una institución reconocida por su aporte al desarrollo de infantes con capacidades especiales, así como por los programas y actividades de voluntariado de acción social y desarrollo a ejecutarse en la comunidad de los cantones Marcelino Maridueña, Naranjito y sus alrededores.
              </p>
              {/* --- FIN CONTENIDO DE VISIÓN --- */}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;