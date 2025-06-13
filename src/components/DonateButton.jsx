// src/components/DonateButton.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DonateButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* --- El Botón --- */}
      <button
        onClick={openModal}
        className="
          px-6 py-3 rounded-full font-semibold text-white shadow-lg
          bg-foundation-pink 
          hover:bg-pink-500 hover:scale-105 
          active:scale-95
          transform transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75
          animate-pulse hover:animate-none" // Efecto de pulso que se detiene al pasar el mouse
      >
        Donar ahora
      </button>

      {/* --- El Modal (Ventana Emergente) --- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Cierra el modal al hacer clic en el fondo
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
              className="bg-white rounded-lg shadow-2xl p-8 max-w-sm text-center"
            >
              <h3 className="text-2xl font-bold text-dark-text mb-4">
                ¡Próximamente!
              </h3>
              <p className="text-light-text mb-6">
                Estamos trabajando para activar nuestro portal de donaciones. ¡Gracias por tu paciencia y tu deseo de ayudar!
              </p>
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-full font-semibold text-white bg-foundation-blue hover:bg-blue-500 transition-colors"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonateButton;