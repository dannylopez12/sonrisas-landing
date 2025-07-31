// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// ¡Pega aquí la configuración que copiaste de Firebase!
const firebaseConfig = {
  apiKey: "AIzaSyBHLqRSX1tOTtU7knQjzoNWBzmVm0TKrB8",
  authDomain: "sonrisas-inocentes-web.firebaseapp.com",
  projectId: "sonrisas-inocentes-web",
  storageBucket: "sonrisas-inocentes-web.firebasestorage.app",
  messagingSenderId: "273112125776",
  appId: "1:273112125776:web:c93d8cd8f9f3bfde371c55",
  measurementId: "G-DYCQNG5FPT"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);