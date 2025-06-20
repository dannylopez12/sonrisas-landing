// src/components/Footer.jsx
import React from 'react';
// 1. IMPORTAMOS EL ÍCONO DE TIKTOK
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  // URL para el chat de WhatsApp
  const whatsappUrl = `https://wa.me/593994450099`;

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Fundación Sonrisas Inocentes</h3>
        <p className="max-w-md mx-auto mb-8">
          Dejando huellas de amor y esperanza en el futuro de cada niño.
        </p>
        
        {/* --- LINKS A REDES SOCIALES --- */}
        <div className="flex justify-center space-x-6 mb-8">
          {/* Facebook Link */}
          <a 
            href="https://www.facebook.com/profile.php?id=100086664433208" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-foundation-yellow transition-transform duration-300 hover:scale-125"
          >
            <FaFacebook />
          </a>
          
          {/* Instagram Link */}
          <a 
            href="https://www.instagram.com/fundacionsonrisasinocentes" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-foundation-yellow transition-transform duration-300 hover:scale-125"
          >
            <FaInstagram />
          </a>
          
          {/* WhatsApp Link */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-foundation-yellow transition-transform duration-300 hover:scale-125"
          >
            <FaWhatsapp />
          </a>

          {/* 2. AÑADIMOS EL ÍCONO Y ENLACE DE TIKTOK */}
          <a 
            href="https://www.tiktok.com/@fundacion.sonrisas_" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-foundation-yellow transition-transform duration-300 hover:scale-125"
          >
            <FaTiktok />
          </a>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>© {year} Fundación Sonrisas Inocentes. Todos los derechos reservados.</p>
          
          {/* --- LINK A TECNOMER --- */}
          <p className="mt-2">
            Sitio web diseñado con ❤️ por 
            <a 
              href="https://software.tecnomer.ec/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-foundation-blue underline decoration-transparent hover:decoration-current transition-all duration-300 ml-1"
            >
              Tecnomer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
