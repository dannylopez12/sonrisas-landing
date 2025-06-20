// src/components/DonationModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5'; // Un ícono para cerrar
import PayPalButton from './PayPalButton.jsx'; // Importamos el botón de pago real

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { y: "50vh", opacity: 0 },
};

const DonationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('10.00'); // Monto de donación por defecto

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Cierra el modal al hacer clic en el fondo
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
          >
            {/* Botón de Cerrar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <IoClose size={28} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Haz tu Donación</h2>
            <p className="text-gray-600 mb-6">Cada contribución nos ayuda a cambiar vidas.</p>

            {/* Selector de Monto */}
            <div className="flex justify-center flex-wrap gap-3 mb-8">
              {['5', '10', '25', '50'].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val + '.00')}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border-2
                    ${amount === val + '.00'
                      ? 'bg-foundation-blue text-white border-foundation-blue scale-110'
                      : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Contenedor del Botón de PayPal */}
            <div className="max-w-sm mx-auto">
              <p className="mb-4 text-sm text-gray-500">Donarás de forma segura con PayPal:</p>
              <PayPalButton currency="USD" amount={amount} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;