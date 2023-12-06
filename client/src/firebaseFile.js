import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyCqP6m5vnUTHJNsgB1rxUfGhjc2j-YC5cA",
    authDomain: "ecommerce-1606a.firebaseapp.com",
    projectId: "ecommerce-1606a",
    storageBucket: "ecommerce-1606a.appspot.com",
    messagingSenderId: "197281939374",
    appId: "1:197281939374:web:63e37ed8b22804d4cc523f",
    measurementId: "G-WMSKEW72R0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth();
  export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();