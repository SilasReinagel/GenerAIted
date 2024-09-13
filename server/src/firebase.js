// @ts-check
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

if (!process.env.GENERAITED_FIREBASE_API_KEY) {
  console.error('Missing GENERAITED_FIREBASE_API_KEY environment variable');
  process.exit(1);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GENERAITED_FIREBASE_API_KEY,
  authDomain: "generaited.firebaseapp.com",
  projectId: "generaited",
  storageBucket: "generaited.appspot.com",
  messagingSenderId: "5928643143",
  appId: "1:5928643143:web:d03787a0c68232f4195f62",
  // Remove measurementId as we're not using analytics on the server
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };