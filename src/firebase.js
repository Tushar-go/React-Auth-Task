// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCXZlkjPlha0BBp9Iu73CwYPCLAO2Q-O8",
    authDomain: "react-auth-831d3.firebaseapp.com",
    projectId: "react-auth-831d3",
    storageBucket: "react-auth-831d3.appspot.com",
    messagingSenderId: "918297484533",
    appId: "1:918297484533:web:b27cbc84017a571a0cb9bc",
    measurementId: "G-5EC0C2P95P"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()