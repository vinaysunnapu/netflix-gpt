// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb-NrqSzgKXmGMr_SIji_D7GL9toDYMYs",
  authDomain: "netflixgpt-a8ec6.firebaseapp.com",
  projectId: "netflixgpt-a8ec6",
  storageBucket: "netflixgpt-a8ec6.firebasestorage.app",
  messagingSenderId: "457153957104",
  appId: "1:457153957104:web:e8b68741a3787b870e8635",
  measurementId: "G-P52EJ2YWTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);