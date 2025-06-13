// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Iconos para el menú
import { motion, AnimatePresence } from 'framer-motion'; // Para las animaciones
import logo from '../assets/logo-principal.png';

const Navbar = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variantes para la animación del menú móvil
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50"> {/* Aumentamos z-index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img className="h-24" src={logo} alt="Fundación Sonrisas Inocentes" />
            </Link>
          </div>

          {/* MENÚ DE ESCRITORIO */}
          <div className="hidden md:block"> {/* Se oculta en pantallas pequeñas (móvil) */}
            <div className="ml-10 flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="text-gray-600 hover:text-foundation-blue transition-colors">Inicio</Link>
              <a href="/#about" className="text-gray-600 hover:text-foundation-blue transition-colors">Quiénes Somos</a>
              <a href="/#club" className="text-gray-600 hover:text-foundation-blue transition-colors">Club Formativo</a>
              <a href="/#gallery" className="text-gray-600 hover:text-foundation-blue transition-colors">Galería</a>
              <NavLink to="/noticias" className={({ isActive }) => `transition-colors ${isActive ? 'text-foundation-blue font-bold' : 'text-gray-600 hover:text-foundation-blue'}`}>
                Noticias
              </NavLink>
              <a href="/#donate" className="text-gray-600 hover:text-foundation-blue transition-colors">Donar</a>
            </div>
          </div>

          {/* BOTÓN DE HAMBURGUESA PARA MÓVIL */}
          <div className="md:hidden flex items-center"> {/* Solo se muestra en pantallas pequeñas */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-foundation-blue focus:outline-none p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* PANEL DEL MENÚ MÓVIL ANIMADO */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-lg shadow-xl absolute top-full left-0 w-full"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col items-center py-4 space-y-2">
              <Link to="/" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Inicio</Link>
              <a href="/#about" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Quiénes Somos</a>
              <a href="/#club" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Club Formativo</a>
              <a href="/#gallery" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Galería</a>
              <NavLink to="/noticias" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Noticias</NavLink>
              <a href="/#donate" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Donar</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
