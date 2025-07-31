// src/pages/SingleNewsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa'; // Importamos los íconos

const SingleNewsPage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar el artículo en Firebase cuando el componente se carga
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, 'news', articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("¡No se encontró la noticia!");
      }
      setLoading(false);
    };

    fetchArticle();
  }, [articleId]);

  // 1. ESTADO DE CARGA
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  // 2. ESTADO DE NOTICIA NO ENCONTRADA
  if (!article) {
    return (
        <div className="text-center py-20 container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800">Noticia no encontrada</h1>
            <p className="mt-4 text-lg text-gray-600">El artículo que buscas no existe o fue eliminado.</p>
            <Link to="/noticias" className="mt-8 inline-flex items-center px-6 py-3 text-white bg-foundation-blue rounded-full font-semibold hover:bg-blue-700 transition-colors">
                <FaArrowLeft className="mr-2" />
                Volver a todas las Noticias
            </Link>
        </div>
    );
  }

  // 3. LÓGICA DE FECHA MEJORADA
  // Priorizamos 'publicationDate'. Si no existe, usamos 'createdAt'.
  const displayDate = article.publicationDate || article.createdAt;

  return (
    <>
      <Helmet>
        <title>{`${article.title} | Sonrisas Inocentes`}</title>
        <meta name="description" content={article.summary || article.title} />
        {/* Meta tags para redes sociales (Open Graph) */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="bg-white pt-12 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link to="/noticias" className="inline-flex items-center text-gray-600 hover:text-foundation-blue font-semibold transition-colors group">
              <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Volver a todas las noticias
            </Link>
          </div>
          
          <article>
            {/* Imagen de Portada */}
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8" />
            )}
            
            {/* Encabezado del Artículo */}
            <header className="mb-8 border-b border-gray-200 pb-6">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{article.title}</h1>
              <div className="flex items-center text-gray-500 mt-4">
                <FaCalendarAlt className="mr-2" />
                {/* 4. MOSTRAMOS LA FECHA CORRECTA */}
                <p>
                  Publicado el {displayDate?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </header>
            
            {/* Contenido del Artículo (renderizado desde HTML) */}
            <div 
              className="prose lg:prose-xl max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          </article>
        </div>
      </div>
    </>
  );
};

export default SingleNewsPage;