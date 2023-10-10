// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuuXNyTUVkt3wWfweEO7v4shShm7jyWUg",
  authDomain: "gestionstock-bc237.firebaseapp.com",
  projectId: "gestionstock-bc237",
  storageBucket: "gestionstock-bc237.appspot.com",
  messagingSenderId: "668788586060",
  appId: "1:668788586060:web:52c6a6aab06be17695e6e9",
  measurementId: "G-4M10ZYM2HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage= getStorage(app)
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      db: db,
      storage: storage
    }
  }
})
