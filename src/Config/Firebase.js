// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCombk4rOXpAiHcKCqOJd2Tb-OIku9bVB4",
  authDomain: "trabajo-practico-final-reactjs.firebaseapp.com",
  projectId: "trabajo-practico-final-reactjs",
  storageBucket: "trabajo-practico-final-reactjs.firebasestorage.app",
  messagingSenderId: "234706094577",
  appId: "1:234706094577:web:21fd9c5442325b85f6dc50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}