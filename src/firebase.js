// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3Hs4qepLWKluVzfYViNO0J7l948P7DBU",
  authDomain: "chat-app-cefc1.firebaseapp.com",
  projectId: "chat-app-cefc1",
  storageBucket: "chat-app-cefc1.appspot.com",
  messagingSenderId: "228494724709",
  appId: "1:826362405590:android:7551a98b58a99a43c91f77",
  measurementId: "G-EV4C86PRF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
console.log(db);
