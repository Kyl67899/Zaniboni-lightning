import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAglSoF6wk6GS8PkEBASZpmDjV_QEKbJVQ",
  authDomain: "zanbani-lightning.firebaseapp.com",
  projectId: "zanbani-lightning",
  storageBucket: "zanbani-lightning.firebasestorage.app",
  messagingSenderId: "787584966692",
  appId: "1:787584966692:web:b2fc651176fdc6d5ca78b1",
  measurementId: "G-NY8HJY8XZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);