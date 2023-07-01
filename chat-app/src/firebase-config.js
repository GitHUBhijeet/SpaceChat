// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF1kUIcl-26FlYK_6VLpznPn4v1USuyqc",
  authDomain: "chat-app-ef96c.firebaseapp.com",
  projectId: "chat-app-ef96c",
  storageBucket: "chat-app-ef96c.appspot.com",
  messagingSenderId: "216565568323",
  appId: "1:216565568323:web:bfe47ff682c7672080d5f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
