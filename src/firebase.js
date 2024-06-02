import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbI-kxDbOjKfPMGd7gZDVfFXbZzUZ3Es8",
  authDomain: "eco-track-37da4.firebaseapp.com",
  projectId: "eco-track-37da4",
  storageBucket: "eco-track-37da4.appspot.com",
  messagingSenderId: "773975307079",
  appId: "1:773975307079:web:11103209979f7e5e7b5262",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage

export { app, storage }; // Export the initialized services
