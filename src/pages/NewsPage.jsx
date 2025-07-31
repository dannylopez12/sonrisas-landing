// src/pages/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Importamos la conexión a Firebase
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; // Importamos funciones de Firestore
import { Helmet } from 'react-helmet-async';

const NewsPage = () => {
  // Estado para guardar las noticias de Firebase
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para obtener los datos al cargar el componente
  useEffect(() => {
    // Creamos una consulta para obtener las noticias, ordenadas por la más reciente primero
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    
    // onSnapshot escucha los cambios en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        // Convertimos el timestamp de Firebase a un objeto Date de JavaScript
        date: doc.data().createdAt?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
      }));
      setNews(newsData);
      setLoading(false);
    });

    // Limpiamos el listener al desmontar el componente para evitar fugas de memoria
    return () => unsubscribe();
  }, []);

  // Separamos la noticia más reciente (la primera del array) como destacada
  const featuredArticle = news.length > 0 ? news[0] : null;
  // El resto de las noticias
  const otherArticles = news.length > 1 ? news.slice(1) : [];

  if (loading) {
    return <div className="text-center py-20">Cargando noticias...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Noticias - Fundación Sonrisas Inocentes</title>
        <meta name="description" content="Las últimas noticias, eventos y logros de la Fundación Sonrisas Inocentes." />
      </Helmet>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Nuestro Rincón de Noticias</h1>
            <p className="mt-4 text-lg text-gray-600">Las historias que nos inspiran a seguir adelante</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {/* Noticia Destacada (la más reciente) */}
              {featuredArticle && (
                <div className="mb-12 group">
                  <Link to={`/noticias/${featuredArticle.id}`}>
                    <div className="overflow-hidden rounded-lg shadow-2xl mb-4 aspect-w-16 aspect-h-9">
                      <img src={featuredArticle.imageUrl || 'https://via.placeholder.com/800x450'} alt={featuredArticle.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-sm text-gray-500">{featuredArticle.date}</span>
                    <h2 className="mt-2 text-3xl font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">{featuredArticle.title}</h2>
                    <p className="mt-2 text-gray-600">{featuredArticle.summary}</p>
                  </Link>
                </div>
              )}

              {/* Grid de otras noticias */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherArticles.map(article => (
                  <div key={article.id} className="group">
                    <Link to={`/noticias/${article.id}`}>
                      <div className="overflow-hidden rounded-lg shadow-lg mb-4 aspect-w-4 aspect-h-3">
                        <img src={article.imageUrl || 'https://via.placeholder.com/400x300'} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <h3 className="mt-1 text-xl font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">{article.title}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar con todas las noticias, ordenadas por la más reciente */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-foundation-yellow pb-2 mb-4">Lo Último</h3>
                <ul>
                  {news.map(article => (
                    <li key={article.id} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <Link to={`/noticias/${article.id}`} className="block group">
                        <p className="font-semibold text-gray-700 group-hover:text-foundation-blue transition-colors">{article.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;