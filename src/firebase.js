
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvE1fJMCRgKWRaiPfUQVyS1O0cn_OVx8k",
  authDomain: "fir-crud-4484e.firebaseapp.com",
  projectId: "fir-crud-4484e",
  storageBucket: "fir-crud-4484e.firebasestorage.app",
  messagingSenderId: "935533470605",
  appId: "1:935533470605:web:9808c894e5dd4e858953c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);