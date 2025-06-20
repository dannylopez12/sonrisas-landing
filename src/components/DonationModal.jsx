// src/components/DonationModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import PayPalButton from './PayPalButton.jsx';
import DonationSuccess from './DonationSuccess.jsx'; // Importamos el componente de éxito

// --- Definiciones de Animación ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { y: "50vh", opacity: 0 },
};

// --- Componente Principal del Modal ---
const DonationModal = ({ isOpen, onClose }) => {
  // --- ESTADOS ---
  const [amount, setAmount] = useState('10');
  const [isSuccess, setIsSuccess] = useState(false); // Estado para controlar si mostramos la vista de éxito
  const predefinedAmounts = ['5', '10', '25', '50'];

  // --- HANDLERS (Manejadores de eventos) ---
  const handleSuccess = () => {
    setIsSuccess(true); // Cambiamos a la vista de éxito
  };

  const handleClose = () => {
    setIsSuccess(false); // Reseteamos la vista de éxito para la próxima vez que se abra el modal
    onClose(); // Llamamos a la función del padre para cerrar el modal
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  // Condición para mostrar los botones de PayPal
  const isValidAmount = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
  
  // No renderizamos nada si el modal no está abierto
  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose}
        >
          <motion.div
            key={isSuccess ? 'success' : 'form'} // Clave para que AnimatePresence detecte el cambio de componente
            className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full text-center relative max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* RENDERIZADO CONDICIONAL: Mostramos una vista u otra */}
            {isSuccess ? (
              // --- VISTA DE ÉXITO ---
              <DonationSuccess onClose={handleClose} />
            ) : (
              // --- VISTA DE FORMULARIO DE DONACIÓN ---
              <>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10">
                  <IoClose size={28} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Haz tu Donación</h2>
                <p className="text-gray-600 mb-6">Elige o ingresa un monto para donar.</p>

                {/* Selector de Monto */}
                <div className="flex justify-center flex-wrap gap-3 mb-4">
                  {predefinedAmounts.map(val => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${amount === val ? 'bg-foundation-blue text-white border-foundation-blue scale-110' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                {/* Campo para Monto Personalizado */}
                <div className="relative mb-8 mt-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Otro monto"
                    className="w-full pl-7 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-foundation-blue focus:border-foundation-blue transition"
                  />
                </div>

                {/* Contenedor del Botón de PayPal */}
                <div className="max-w-sm mx-auto">
                  {isValidAmount ? (
                    <>
                      <p className="mb-4 text-sm text-gray-500">Donarás de forma segura con PayPal:</p>
                      <PayPalButton
                        currency="USD"
                        amount={parseFloat(amount).toFixed(2)}
                        onSuccess={handleSuccess} // Le pasamos la función para manejar el éxito
                      />
                    </>
                  ) : (
                    <div className="text-center text-yellow-600 font-semibold p-3 bg-yellow-100 rounded-lg">
                      Por favor, ingresa un monto válido.
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;