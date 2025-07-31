import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';

// Datos de simulación para mostrar si no hay donaciones reales
const fakeDonors = [
  {
    id: 'sim1',
    name: 'Donador Anónimo',
    amount: 5,
    currency: 'USD',
    message: '¡Gran causa! Sigan así.'
  },
  {
    id: 'sim2',
    name: 'Ana García',
    amount: 20,
    currency: 'USD',
    message: 'Con mucho cariño.'
  },
  {
    id: 'sim3',
    name: 'Carlos R.',
    amount: 10,
    currency: 'USD',
    message: '' // Simula un donador que no dejó mensaje
  },
];

const RecentDonors = () => {
  // El estado inicial es un array vacío
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Definimos la consulta a la colección "donations" en Firebase
    const q = query(collection(db, "donations"), orderBy("timestamp", "desc"), limit(6));
    
    // Creamos un listener que se actualizará en tiempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const donorsData = [];
      // Recorremos los documentos recibidos de Firebase
      querySnapshot.forEach((doc) => {
        donorsData.push({ id: doc.id, ...doc.data() });
      });

      // Lógica de simulación:
      // Si el array de datos reales está vacío (no hay donaciones en la BD)
      if (donorsData.length === 0) {
        // Usamos los datos de simulación
        setDonors(fakeDonors);
      } else {
        // Si hay datos reales, los usamos
        setDonors(donorsData);
      }
    });

    // Función de limpieza: se ejecuta cuando el componente se desmonta para evitar fugas de memoria
    return () => unsubscribe();
  }, []); // El array de dependencias vacío [] asegura que el efecto se ejecute solo una vez

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Nuestros Últimos Héroes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapeamos el array de 'donors' (sean reales o de simulación) */}
          {donors.map((donor, index) => (
            <motion.div
              key={donor.id}
              className="bg-white p-6 rounded-lg shadow-lg text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">💖</span>
                <div>
                  <p className="font-bold text-lg text-gray-800">{donor.name}</p>
                  <p className="font-semibold text-foundation-blue">${donor.amount} {donor.currency}</p>
                </div>
              </div>
              {/* Renderizado condicional: solo muestra el mensaje si existe */}
              {donor.message && (
                <p className="italic text-gray-600">"{donor.message}"</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonors;