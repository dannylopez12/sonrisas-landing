// src/sections/DonateSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DonateButton from '../components/DonateButton.jsx';
import DonationModal from '../components/DonationModal.jsx'; // Importamos el modal

const DonateSection = () => {
    // Estado para controlar si el modal está visible
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
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
                    {/* El botón ahora solo se encarga de abrir el modal */}
                    <DonateButton onClick={openModal} />
                </motion.div>
            </section>

            {/* El modal se renderiza aquí y se controla con el estado */}
            <DonationModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default DonateSection;