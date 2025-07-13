// Importa las funciones necesarias desde el SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración del proyecto Firebase (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyAfAryg3eYLqj5Md0odrpckLrhPcVm510w",
  authDomain: "focus-group-riesgos-5353a.firebaseapp.com",
  databaseURL: "https://focus-group-riesgos-5353a-default-rtdb.firebaseio.com",
  projectId: "focus-group-riesgos-5353a",
  storageBucket: "focus-group-riesgos-5353a.firebasestorage.app",
  messagingSenderId: "932406132125",
  appId: "1:932406132125:web:d2593ae6acffbd0a620374"
};

// Inicializa Firebase y la Realtime Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exportar app como default y database como export nombrado
export default app;
export { database };
