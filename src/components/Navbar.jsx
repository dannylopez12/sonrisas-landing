// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Cambiamos Link por NavLink para estilos activos
import logo from '../assets/logo-principal.png';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img className="h-24" src={logo} alt="Fundación Sonrisas Inocentes" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6 text-sm font-medium">
              {/* --- ENLACES CORREGIDOS --- */}
              <Link to="/" className="text-gray-600 hover:text-foundation-blue transition-colors">Inicio</Link>
              <a href="/#about" className="text-gray-600 hover:text-foundation-blue transition-colors">Quiénes Somos</a>
              <a href="/#club" className="text-gray-600 hover:text-foundation-blue transition-colors">Club Formativo</a>
              <a href="/#gallery" className="text-gray-600 hover:text-foundation-blue transition-colors">Galería</a>
              
              {/* Usamos NavLink para la página de Noticias para que se resalte cuando estés en ella */}
              <NavLink 
                to="/noticias" 
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-foundation-blue font-bold' : 'text-gray-600 hover:text-foundation-blue'}`
                }
              >
                Noticias
              </NavLink>

              <a href="/#donate" className="text-gray-600 hover:text-foundation-blue transition-colors">Donar</a>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
