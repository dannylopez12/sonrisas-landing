// src/components/LatestNews.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa'; // Importamos un ícono para la fecha

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // 1. La consulta ahora ordena por 'publicationDate' para mostrar las noticias más relevantes primero.
    const q = query(collection(db, 'news'), orderBy('publicationDate', 'desc'), limit(2));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => {
        // 2. Lógica para mostrar la fecha: prioriza 'publicationDate', si no, usa 'createdAt'.
        const displayDate = doc.data().publicationDate || doc.data().createdAt;
        
        return {
          id: doc.id,
          ...doc.data(),
          // Formateamos la fecha para que se vea bonita (ej. "15 de mayo de 2024")
          date: displayDate?.toDate().toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric'
          })
        }
      });
      setNews(newsData);
    });

    return () => unsubscribe();
  }, []);

  // No renderizamos la sección si no hay al menos una noticia
  if (news.length === 0) return null;

  const principal = news[0];
  const secundaria = news.length > 1 ? news[1] : null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Últimas Noticias</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente al día con nuestras actividades, logros y las historias que hacen posible nuestra misión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Noticia principal (grande) */}
          {principal && (
            <div className="lg:col-span-2">
              <Link to={`/noticias/${principal.id}`} className="block group">
                <div className="overflow-hidden rounded-xl shadow-2xl mb-4 aspect-w-16 aspect-h-9">
                  <img
                    src={principal.imageUrl || 'https://placehold.co/800x450?text=Noticia'}
                    alt={principal.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                {/* 3. Mostramos la fecha con un ícono para darle más estilo */}
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>{principal.date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">
                  {principal.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{principal.summary}</p>
                <span className="mt-3 inline-block font-semibold text-foundation-blue group-hover:underline">Leer más →</span>
              </Link>
            </div>
          )}

          {/* Noticia secundaria */}
          {secundaria && (
            <div className="border-l-4 pl-6 border-foundation-blue/30">
              <Link to={`/noticias/${secundaria.id}`} className="block group">
                <div className="overflow-hidden rounded-lg shadow-lg mb-4 aspect-w-4 aspect-h-3">
                  <img
                    src={secundaria.imageUrl || 'https://placehold.co/400x300?text=Noticia'}
                    alt={secundaria.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>{secundaria.date}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">
                  {secundaria.title}
                </h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;