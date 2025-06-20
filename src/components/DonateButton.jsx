import React from 'react';

// Este es solo un botón de presentación. La prop 'onClick' se encargará de abrir el modal.
const DonateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg
        bg-foundation-pink 
        hover:bg-pink-500 hover:scale-105 
        active:scale-95
        transform transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-pink-300
        animate-pulse hover:animate-none"
    >
      ¡Quiero Donar Ahora!
    </button>
  );
};

export default DonateButton;