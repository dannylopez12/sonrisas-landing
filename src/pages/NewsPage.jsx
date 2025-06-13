// src/pages/NewsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import newsData from '../data/newsData';

const NewsPage = () => {
  // Separamos la noticia destacada de las demás
  const featuredArticle = newsData.find(article => article.featured);
  const otherArticles = newsData.filter(article => !article.featured);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        
        {/* --- CABECERA --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Nuestro Rincón de Noticias</h1>
          <p className="mt-4 text-lg text-gray-600">Las historias que nos inspiran a seguir adelante</p>
        </div>

        {/* --- LAYOUT PRINCIPAL (Contenido a la izquierda, sidebar a la derecha) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* --- COLUMNA IZQUIERDA: NOTICIAS PRINCIPALES --- */}
          <div className="lg:col-span-2">
            {/* Noticia Destacada */}
            {featuredArticle && (
              <div className="mb-12 group">
                <Link to={`/noticias/${featuredArticle.id}`}>
                  <div className="overflow-hidden rounded-lg shadow-2xl mb-4">
                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="inline-block bg-foundation-pink text-white px-2 py-1 text-xs font-bold rounded-full mb-2">{featuredArticle.category}</span>
                  <h2 className="text-3xl font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">{featuredArticle.title}</h2>
                  <p className="mt-2 text-gray-600">{featuredArticle.short_description}</p>
                </Link>
              </div>
            )}

            {/* Grid de otras noticias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherArticles.map(article => (
                <div key={article.id} className="group">
                  <Link to={`/noticias/${article.id}`}>
                    <div className="overflow-hidden rounded-lg shadow-lg mb-4">
                      <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="inline-block bg-foundation-green text-white px-2 py-1 text-xs font-bold rounded-full mb-2">{article.category}</span>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-foundation-blue transition-colors">{article.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLUMNA DERECHA: SIDEBAR "LO ÚLTIMO" --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-foundation-yellow pb-2 mb-4">Lo Último</h3>
              <ul>
                {newsData.map(article => (
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
  );
};

export default NewsPage;