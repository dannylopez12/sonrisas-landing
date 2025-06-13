// src/sections/Club.jsx
import React from 'react';
import clubLogo from '../assets/club-suenos-y-sonrisas-logo.png'; // El logo del club

const Club = () => {
    return (
        <section id="club" className="py-20 bg-foundation-yellow">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-4">Club Formativo Especializado</h2>
                    <p className="text-2xl font-bold text-red-600 mb-6">"Personas con Discapacidad"</p>
                    <p className="text-4xl font-extrabold text-blue-800" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Sueños y Sonrisas
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img src={clubLogo} alt="Logo Club Sueños y Sonrisas" className="max-w-xs md:max-w-sm"/>
                </div>
            </div>
        </section>
    )
}

export default Club;