// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcnV7YQ32wF-deNgx7e-mAIAgi2z8OBR",
  authDomain: "social-app-cbd4d.firebaseapp.com",
  projectId: "social-app-cbd4d",
  storageBucket: "social-app-cbd4d.appspot.com",
  messagingSenderId: "228494724709",
  appId: "1:327587075891:android:ee3b671afc6977bace1046",
  measurementId: "G-EV4C86PRF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export  const db = getFirestore(app);
