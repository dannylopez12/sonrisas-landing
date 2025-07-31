// src/components/DonationSuccess.jsx
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const DonationSuccess = ({ onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });

   
    const timer = setTimeout(() => {
      onClose();
    }, 8000); 

    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="text-center">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false} 
        numberOfPieces={400} 
        gravity={0.15}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <h2 className="text-3xl font-bold text-foundation-green mb-4">¡Muchísimas Gracias!</h2>
        <p className="text-lg text-gray-700">
          Tu donación ha sido recibida. Con tu ayuda, seguimos creando sonrisas y transformando futuros.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Esta ventana se cerrará automáticamente...
        </p>
      </motion.div>
    </div>
  );
};

export default DonationSuccess;