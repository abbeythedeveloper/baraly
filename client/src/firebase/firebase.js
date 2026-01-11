// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_CONNECT_KEY,
    authDomain: "baralyapp.firebaseapp.com",
    projectId: "baralyapp",
    storageBucket: "baralyapp.firebasestorage.app",
    // ✅ FIXED (VERY IMPORTANT)
    messagingSenderId: "970171680942",
    appId: "1:970171680942:web:d04bb6b3ccf4c10844c53f"
    // ❌ REMOVE measurementId when not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DO NOT INITIALIZE ANALYTICS IN DEV
// const analytics = getAnalytics(app); ❌ REMOVE THIS LINE

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
