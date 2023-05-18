// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmxuOnYBRzgIgDB4DE8BChuzE0sOHudUw",
  authDomain: "super5-e2af2.firebaseapp.com",
  projectId: "super5-e2af2",
  storageBucket: "super5-e2af2.appspot.com",
  messagingSenderId: "166547601928",
  appId: "1:166547601928:web:b68925a9c57e6128282fbd",
  measurementId: "G-PRKBQYGB8Q",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);
