// src/components/ImageUploader.jsx (Versión Definitiva y Correcta)
import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const ImageUploader = ({ albumId }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const storage = getStorage();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Por favor, selecciona al menos una foto.');
      return;
    }

    setIsUploading(true);
    setError('');

    const uploadPromises = files.map(async (file) => {
      // 1. CREAMOS UN ID ÚNICO Y LIMPIO PARA LA FOTO
      //    Quitamos caracteres especiales del nombre para evitar problemas.
      const photoId = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const imageRef = ref(storage, `gallery/${albumId}/${photoId}`);
      
      // Subimos la foto
      await uploadBytes(imageRef, file);
      
      // Obtenemos la URL de descarga
      const url = await getDownloadURL(imageRef);
      
      // 2. DEVOLVEMOS EL OBJETO CON EL FORMATO CORRECTO
      return { id: photoId, url: url };
    });

    try {
      const newPhotosData = await Promise.all(uploadPromises);
      
      const albumRef = doc(db, 'galleryAlbums', albumId);
      // 3. AÑADIMOS LOS OBJETOS AL ARRAY 'photos' EN FIRESTORE
      await updateDoc(albumRef, {
        photos: arrayUnion(...newPhotosData)
      });

      alert('¡Fotos subidas con éxito!');
      setFiles([]); // Limpiamos la selección
      
      // Limpiamos el input de archivos
      const fileInput = document.getElementById(`file-input-${albumId}`);
      if (fileInput) fileInput.value = '';

    } catch (err) {
      console.error('Error al subir las fotos:', err);
      setError('Ocurrió un error al subir las fotos. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">Subir Fotos a este Álbum</h3>
      <div className="flex flex-col space-y-4">
        <input
          id={`file-input-${albumId}`} // ID único para cada uploader
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-foundation-blue/10 file:text-foundation-blue hover:file:bg-foundation-blue/20 cursor-pointer"
        />
        {files.length > 0 && (
          <div>
            <p className="font-medium">Fotos seleccionadas:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {files.map(file => <li key={file.name}>{file.name}</li>)}
            </ul>
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={isUploading || files.length === 0}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isUploading ? 'Subiendo...' : `Subir ${files.length} Foto(s)`}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;
