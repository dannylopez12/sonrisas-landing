// src/components/DonationModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import PayPalButton from './PayPalButton.jsx';
import DonationSuccess from './DonationSuccess.jsx';

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [donorName, setDonorName] = useState('');      // <-- NUEVO ESTADO para el nombre
  const [message, setMessage] = useState('');        // <-- NUEVO ESTADO para el mensaje
  const [isAnonymous, setIsAnonymous] = useState(false); // <-- NUEVO ESTADO para el anonimato
  
  const predefinedAmounts = ['5', '10', '25', '50'];

  // --- HANDLERS (Manejadores de eventos) ---
  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    // Reseteamos todos los estados para la próxima vez que se abra el modal
    setIsSuccess(false);
    setDonorName('');
    setMessage('');
    setIsAnonymous(false);
    setAmount('10');
    onClose();
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const isValidAmount = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
  
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
            key={isSuccess ? 'success' : 'form'}
            className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full text-center relative max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {isSuccess ? (
              <DonationSuccess onClose={handleClose} />
            ) : (
              <>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10">
                  <IoClose size={28} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Haz tu Donación</h2>
                <p className="text-gray-600 mb-6">Tu apoyo hace la diferencia. ¡Gracias!</p>

                {/* --- NUEVOS CAMPOS DE FORMULARIO --- */}
                <div className="text-left space-y-4 mb-8">
                  <div>
                    <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">Tu Nombre (opcional)</label>
                    <input
                      type="text"
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      disabled={isAnonymous}
                      placeholder="Ej: Juan Pérez"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-foundation-blue focus:ring-foundation-blue sm:text-sm ${isAnonymous ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="anonymous"
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-foundation-blue focus:ring-foundation-blue"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">Quiero donar de forma anónima</label>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje de Apoyo (opcional)</label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="¡Mucha fuerza! Sigan con su increíble labor."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-foundation-blue focus:ring-foundation-blue sm:text-sm"
                    />
                  </div>
                </div>

                {/* Selector de Monto */}
                <div className="flex justify-center flex-wrap gap-3 mb-4">
                  {predefinedAmounts.map(val => (
                    <button key={val} onClick={() => setAmount(val)} className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${amount === val ? 'bg-foundation-blue text-white border-foundation-blue scale-110' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                      ${val}
                    </button>
                  ))}
                </div>
                
                {/* Campo para Monto Personalizado */}
                <div className="relative mb-8 mt-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input type="number" value={amount} onChange={handleAmountChange} placeholder="Otro monto" className="w-full pl-7 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-foundation-blue focus:border-foundation-blue transition" />
                </div>

                {/* Contenedor del Botón de PayPal */}
                <div className="max-w-sm mx-auto">
                  {isValidAmount ? (
                    <>
                      <p className="mb-4 text-sm text-gray-500">Donarás de forma segura con PayPal:</p>
                      <PayPalButton
                        currency="USD"
                        amount={parseFloat(amount).toFixed(2)}
                        onSuccess={handleSuccess}
                        // Pasamos los datos del donante al botón
                        donationData={{
                          name: isAnonymous ? 'Anónimo' : donorName.trim() || 'Anónimo',
                          message: message.trim(),
                          amount: parseFloat(amount).toFixed(2),
                        }}
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