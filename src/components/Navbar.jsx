// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo-principal.png';


  const Navbar = ({ onDonateClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMobileDonateClick = () => {
    onDonateClick(); // Primero abre el modal
    toggleMenu();    // Luego cierra el menú móvil
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
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img className="h-20" src={logo} alt="Fundación Sonrisas Inocentes" />
            </Link>
          </div>

          {/* MENÚ DE ESCRITORIO */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-600 hover:text-foundation-blue transition-colors">Inicio</Link>
            <a href="/#about" className="text-gray-600 hover:text-foundation-blue transition-colors">Quiénes Somos</a>
            <NavLink to="/galeria" className={({ isActive }) => `transition-colors ${isActive ? 'text-foundation-blue font-bold' : 'text-gray-600 hover:text-foundation-blue'}`}>
             Galeria
            </NavLink>
            <NavLink to="/noticias" className={({ isActive }) => `transition-colors ${isActive ? 'text-foundation-blue font-bold' : 'text-gray-600 hover:text-foundation-blue'}`}>
              Noticias
            </NavLink>
            
            {/* 2. BOTÓN DE DONAR PARA ESCRITORIO */}
            <button
              onClick={onDonateClick}
              className="
                px-5 py-2.5 rounded-full font-semibold text-white shadow-md
                bg-foundation-pink 
                hover:bg-pink-500 hover:scale-105 
                active:scale-95
                transform transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
            >
              Donar
            </button>
          </div>

          {/* BOTÓN DE HAMBURGUESA PARA MÓVIL */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-foundation-blue focus:outline-none p-2">
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
            <div className="flex flex-col items-center py-4">
              <Link to="/" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Inicio</Link>
              <a href="/#about" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Quiénes Somos</a>
              <a href="/galeria" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Galería</a>
              <NavLink to="/noticias" className="block w-full text-center py-3 text-gray-700 hover:bg-foundation-blue/10" onClick={toggleMenu}>Noticias</NavLink>
              
              {/* 3. BOTÓN DE DONAR PARA MÓVIL */}
              <div className="w-full px-4 pt-4 pb-2">
                <button
                  onClick={handleMobileDonateClick}
                  className="w-full px-5 py-3 rounded-lg font-semibold text-white shadow-md bg-foundation-pink hover:bg-pink-500"
                >
                  Donar Ahora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
