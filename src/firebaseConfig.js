// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvo4zQnN7sgZ4YnsUeNlzlBp4vHqLy2x4",
  authDomain: "nurturing-reads.firebaseapp.com",
  projectId: "nurturing-reads",
  storageBucket: "nurturing-reads.firebasestorage.app",
  messagingSenderId: "805997445205",
  appId: "1:805997445205:web:995c3b73592de73791d4dc",
  measurementId: "G-B2MSCMXVQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
