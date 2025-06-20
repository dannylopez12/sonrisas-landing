// src/sections/DonateSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Este componente ahora es más "tonto", solo muestra info y un botón.
const DonateSection = ({ onDonateClick }) => { // 1. Recibe la función como prop
    return (
        <section id="donate" className="py-20 bg-foundation-blue">
            <motion.div 
                className="container mx-auto px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-white mb-4">
                    Tu Apoyo Transforma Vidas
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                    Cada donación, sin importar el tamaño, nos acerca más a nuestro objetivo.
                </p>
                {/* 2. Usamos un botón normal que ejecuta la función del padre */}
                <button
                    onClick={onDonateClick} // Llama a la función que le pasaron (openModal)
                    className="
                      px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg 
                      bg-foundation-pink hover:bg-pink-500 hover:scale-105 active:scale-95 
                      transform transition-all duration-300 ease-in-out 
                      focus:outline-none focus:ring-4 focus:ring-pink-300
                      animate-pulse hover:animate-none"
                >
                    ¡Quiero Donar Ahora!
                </button>
            </motion.div>
        </section>
    );
};

export default DonateSection;