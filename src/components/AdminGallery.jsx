// src/components/AdminGallery.jsx
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import ImageUploader from './ImageUploader';

const AdminGallery = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'galleryAlbums'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAlbums(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingAlbums(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!albumTitle) return;
    setIsCreating(true);
    try {
      await addDoc(collection(db, 'galleryAlbums'), {
        title: albumTitle,
        description: albumDescription,
        images: [],
        createdAt: new Date(),
        likes: {}
      });
      setAlbumTitle('');
      setAlbumDescription('');
    } catch (error) {
      console.error("Error al crear el álbum: ", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditClick = (album) => {
    setEditingAlbumId(album.id);
    setEditedTitle(album.title);
    setEditedDescription(album.description);
  };

  const handleCancelEdit = () => setEditingAlbumId(null);

  const handleUpdateAlbum = async (albumId) => {
    if (!editedTitle) return alert("El título no puede estar vacío.");
    const albumRef = doc(db, 'galleryAlbums', albumId);
    await updateDoc(albumRef, { title: editedTitle, description: editedDescription });
    setEditingAlbumId(null);
  };

  const handleDeletePhoto = async (albumId, imageUrl) => {
    if (!window.confirm('¿Eliminar esta foto?')) return;
    try {
      await deleteObject(ref(storage, imageUrl));
      await updateDoc(doc(db, 'galleryAlbums', albumId), { images: arrayRemove(imageUrl) });
      alert('Foto eliminada.');
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
    }
  };

  const handleDeleteAlbum = async (album) => {
    if (!window.confirm(`¿ELIMINAR ÁLBUM "${album.title}"? Esta acción es permanente.`)) return;
    try {
      const deletePromises = album.images.map(url => deleteObject(ref(storage, url)));
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, 'galleryAlbums', album.id));
      alert('Álbum eliminado.');
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Álbum</h2>
        <form onSubmit={handleCreateAlbum} className="space-y-4">
          <input type="text" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="Título del Álbum" required className="w-full p-2 border rounded-md shadow-sm" />
          <textarea value={albumDescription} onChange={e => setAlbumDescription(e.target.value)} placeholder="Descripción (opcional)" rows={3} className="w-full p-2 border rounded-md shadow-sm" />
          <button type="submit" disabled={isCreating} className="px-4 py-2 text-white bg-foundation-blue rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition-colors">{isCreating ? 'Creando...' : 'Crear Álbum'}</button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Álbumes Existentes</h2>
        {loadingAlbums ? <p>Cargando álbumes...</p> : (
          <div className="space-y-8">
            {albums.length > 0 ? albums.map(album => (
              <div key={album.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm">
                {editingAlbumId === album.id ? (
                  <div className="space-y-2">
                    <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} className="w-full text-lg font-bold p-2 border rounded" />
                    <textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} className="w-full text-sm p-2 border rounded" rows={2} />
                    <div className="flex space-x-2">
                      <button onClick={() => handleUpdateAlbum(album.id)} className="flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"><FaSave className="mr-1" /> Guardar</button>
                      <button onClick={handleCancelEdit} className="flex items-center px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"><FaTimes className="mr-1" /> Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{album.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{album.description || 'Sin descripción'}</p>
                    </div>
                    <div className="flex space-x-3 flex-shrink-0">
                      <button onClick={() => handleEditClick(album)} title="Editar Álbum" className="text-gray-500 hover:text-blue-600 p-1"><FaEdit /></button>
                      <button onClick={() => handleDeleteAlbum(album)} title="Eliminar Álbum" className="text-gray-500 hover:text-red-600 p-1"><FaTrash /></button>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-2">Fotos en este Álbum ({album.images?.length || 0})</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {album.images?.map(imageUrl => (
                          // --- ESTILOS CORREGIDOS AQUÍ ---
                          <div key={imageUrl} className="relative group aspect-square">
                              <img src={imageUrl} alt="Foto del álbum" className="w-full h-full object-cover rounded-md" />
                              <button 
                                onClick={() => handleDeletePhoto(album.id, imageUrl)} 
                                title="Eliminar Foto" 
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                              >
                                  <FaTimes size={10} />
                              </button>
                          </div>
                      ))}
                  </div>
                </div>

                <ImageUploader albumId={album.id} />
              </div>
            )) : <p>No hay álbumes creados todavía. ¡Crea el primero!</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminGallery;