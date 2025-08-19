// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKMNA9kJ4cy6a8MQvTKVIVGplXa5AQr2Y",
  authDomain: "chosencrafts-75cbc.firebaseapp.com",
  projectId: "chosencrafts-75cbc",
  storageBucket: "chosencrafts-75cbc.firebasestorage.app",
  messagingSenderId: "612974746103",
  appId: "1:612974746103:web:3346d34ef7f7f8e4ecf6f2",
  measurementId: "G-D95W31EY4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);