// src/components/AdminNews.jsx (Versión Final Completa con Editor Profesional y Optimizaciones)
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TiptapEditor from './TiptapEditor.jsx'; // El editor tipo Word
import { db, storage } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados del formulario
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [publicationDate, setPublicationDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Leer noticias de Firestore
  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('publicationDate', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNews(newsData);
      setLoading(false);
    }, (error) => {
      console.error("Error al obtener noticias:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Función para limpiar el formulario, memorizada con useCallback
  const resetForm = useCallback(() => {
    setTitle('');
    setSummary('');
    setContent('');
    setCoverImage(null);
    setPublicationDate('');
    setEditingId(null);
    const imageInput = document.getElementById('coverImageInput');
    if (imageInput) imageInput.value = '';
  }, []);

  // Manejador del envío del formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || content === '<p></p>') {
      alert('El título y el contenido son obligatorios.');
      return;
    }
    setIsUploading(true);

    try {
      let imageUrl = '';
      const existingArticle = editingId ? news.find(n => n.id === editingId) : null;

      if (coverImage) {
        if (existingArticle && existingArticle.imageUrl) {
          try {
            const oldImageRef = ref(storage, existingArticle.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn("No se pudo borrar la imagen antigua:", error);
          }
        }
        const imageRef = ref(storage, `news/${Date.now()}_${coverImage.name}`);
        await uploadBytes(imageRef, coverImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const finalPublicationDate = publicationDate ? new Date(publicationDate + 'T00:00:00') : new Date();

      const articleData = {
        title,
        summary,
        content,
        publicationDate: finalPublicationDate,
        updatedAt: new Date()
      };
      
      if (imageUrl) {
        articleData.imageUrl = imageUrl;
      }

      if (editingId) {
        await updateDoc(doc(db, 'news', editingId), articleData);
        alert('¡Noticia actualizada con éxito!');
      } else {
        articleData.createdAt = new Date();
        await addDoc(collection(db, 'news'), articleData);
        alert('¡Noticia creada con éxito!');
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar la noticia: ", error);
      alert('Ocurrió un error al guardar la noticia.');
    } finally {
      setIsUploading(false);
    }
  };

  // Carga los datos de una noticia en el formulario, memorizada con useCallback
  const handleEdit = useCallback((article) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube la página para ver el formulario
    setEditingId(article.id);
    setTitle(article.title);
    setSummary(article.summary || '');
    setContent(article.content || '');
    const dateToEdit = article.publicationDate ? article.publicationDate.toDate() : new Date();
    setPublicationDate(dateToEdit.toISOString().split('T')[0]);
  }, []);

  // Elimina una noticia
  const handleDelete = async (article) => {
    if (!window.confirm(`¿Seguro que quieres eliminar la noticia "${article.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'news', article.id));
      if (article.imageUrl) {
        const imageRef = ref(storage, article.imageUrl);
        await deleteObject(imageRef);
      }
      alert('Noticia eliminada con éxito.');
    } catch (error) {
      console.error("Error al eliminar la noticia: ", error);
      alert('Ocurrió un error al eliminar.');
    }
  };
  
  // Memorizamos la función que se pasa al editor para evitar re-renders
  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  // Memorizamos la lista de noticias para que no se reconstruya en cada render
  const newsList = useMemo(() => {
    return news.map(article => (
      <div key={article.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors gap-4">
        <div className="flex-grow">
          <p className="font-bold text-gray-800">{article.title}</p>
          <p className="text-sm text-gray-500">
            Publicado: {(article.publicationDate || article.createdAt)?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
          <button onClick={() => handleEdit(article)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" aria-label="Editar"><FaEdit /></button>
          <button onClick={() => handleDelete(article)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" aria-label="Eliminar"><FaTrash /></button>
        </div>
      </div>
    ));
  }, [news, handleEdit]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Noticias</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 border-b border-gray-200 pb-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-700">{editingId ? 'Editando Noticia' : 'Crear Nueva Noticia'}</h3>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-foundation-blue focus:border-foundation-blue" />
        </div>
        
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Resumen (para la vista previa)</label>
          <textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} rows="3" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-foundation-blue focus:border-foundation-blue" />
        </div>
        
        <div>
          <label htmlFor="coverImageInput" className="block text-sm font-medium text-gray-700">Imagen de Portada</label>
          <input type="file" id="coverImageInput" onChange={e => setCoverImage(e.target.files[0])} accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-foundation-blue/10 file:text-foundation-blue hover:file:bg-foundation-blue/20 cursor-pointer"/>
        </div>
        
        <div>
          <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Fecha de Publicación</label>
          <input 
            type="date" 
            id="publicationDate" 
            value={publicationDate} 
            onChange={e => setPublicationDate(e.target.value)} 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-foundation-blue focus:border-foundation-blue"
          />
          <p className="text-xs text-gray-500 mt-1">Si no eliges una fecha, se usará la fecha actual al publicar.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenido Completo</label>
          <TiptapEditor
            content={content}
            onChange={handleContentChange}
          />
        </div>
        
        <div className="flex items-center space-x-4 pt-4">
          <button type="submit" disabled={isUploading} className="px-6 py-2 text-white bg-foundation-blue rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isUploading ? 'Guardando...' : (editingId ? 'Actualizar Noticia' : 'Publicar Noticia')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mt-6 text-gray-700">Noticias Publicadas</h3>
      <div className="mt-4 space-y-4">
        {loading ? <p className="text-center text-gray-500">Cargando noticias...</p> : (news.length > 0 ? newsList : <p className="text-center text-gray-500">Aún no hay noticias publicadas.</p>)}
      </div>
    </div>
  );
};

export default AdminNews;