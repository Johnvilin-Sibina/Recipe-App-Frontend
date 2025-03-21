// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tastytrove-e7823.firebaseapp.com",
  projectId: "tastytrove-e7823",
  storageBucket: "tastytrove-e7823.firebasestorage.app",
  messagingSenderId: "996381415903",
  appId: "1:996381415903:web:1492ccf8a0962ad955cc6a"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);