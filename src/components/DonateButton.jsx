// src/sections/DonateSection.jsx
import React, { useState } from 'react'; // 1. Importa useState
import { motion } from 'framer-motion';
import DonateButton from './DonateButton.jsx';
import DonationModal from './DonationModal.jsx'; // 2. Importa el nuevo modal

const DonateSection = () => {
    // 3. Estado para controlar si el modal está abierto o cerrado
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
                    {/* 4. El botón ahora abre el modal */}
                    <DonateButton onClick={openModal} />
                </motion.div>
            </section>

            {/* 5. El modal se renderiza aquí, pero solo es visible si isModalOpen es true */}
            <DonationModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default DonateSection;
