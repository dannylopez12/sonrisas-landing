// src/sections/DonateSection.jsx
import React from 'react';
import DonateButton from '../components/DonateButton';
import { motion } from 'framer-motion';

const DonateSection = () => {
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
                    Cada donación, sin importar el tamaño, nos acerca más a nuestro objetivo de brindar a los niños las herramientas que necesitan para un futuro brillante.
                </p>
                <DonateButton />
            </motion.div>
        </section>
    );
};

export default DonateSection;