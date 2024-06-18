// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtSj-7AU-jmPnB5IaLP94KLbALe0hl00Y",
  authDomain: "tetris-b23ad.firebaseapp.com",
  projectId: "tetris-b23ad",
  storageBucket: "tetris-b23ad.appspot.com",
  messagingSenderId: "689411609241",
  appId: "1:689411609241:web:da3ee6b4f577deff1fde08",
  measurementId: "G-PQWHKQVX5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };