// src/pages/SingleNewsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import newsData from '../data/newsData';

const SingleNewsPage = () => {
  const { articleId } = useParams();
  const article = newsData.find(a => a.id.toString() === articleId);

  if (!article) {
    return <div className="text-center py-20"><h1>Noticia no encontrada</h1></div>;
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/noticias" className="text-foundation-blue hover:underline mb-8 inline-block">← Volver a todas las noticias</Link>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-6">{article.date}</p>
        <img src={article.imageUrl} alt={article.title} className="w-full rounded-lg shadow-lg mb-8" />
        <div 
          className="prose lg:prose-xl max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </div>
    </div>
  );
};

export default SingleNewsPage;