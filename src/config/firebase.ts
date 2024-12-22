import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAhpy9Uv4Y7dJvMJs5LH_1W7UfyqPqOCM",
  authDomain: "salarysense-d1c1a.firebaseapp.com",
  projectId: "salarysense-d1c1a",
  storageBucket: "salarysense-d1c1a.firebasestorage.app",
  messagingSenderId: "166447297315",
  appId: "1:166447297315:web:f96f9b7435136c70709296"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);