// Import the functions you need from the SDKs you need
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "@env";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "mobile-app-project-cscs468.firebaseapp.com",
    projectId: "mobile-app-project-cscs468",
    storageBucket: "mobile-app-project-cscs468.appspot.com",
    messagingSenderId: "34661368879",
    appId: FIREBASE_APP_ID,
    measurementId: "G-SX1CDS57VV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
