/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // Aquí puedes agregar tus colores personalizados si quieres,
      // como lo hablamos al principio. Es opcional pero recomendado.
      colors: {
        'foundation-blue': '#4AC5E3',
        'foundation-yellow': '#FFD100',
        'foundation-pink': '#FF7BAC',
        'foundation-green': '#8BC53F',
      },
       backgroundImage: {
        'hero-background': "url('/src/assets/hero-background.jpg')", // Asegúrate de que el nombre del archivo coincida
      }
    },
  },
  plugins: [
     require('@tailwindcss/aspect-ratio'),
  ],
}