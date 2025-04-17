// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu2uCidNPWMKMi1pZW1ua-0HLOpybGUk8",
  authDomain: "nurturing-reads-a1e35.firebaseapp.com",
  projectId: "nurturing-reads-a1e35",
  storageBucket: "nurturing-reads-a1e35.firebasestorage.app",
  messagingSenderId: "249305553916",
  appId: "1:249305553916:web:27cb00d798018e30f7f079"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log('Firebase initialized: ', app)
console.log('Auth Object', auth)