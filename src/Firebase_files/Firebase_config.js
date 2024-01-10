import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZvXZfWfrJ-rJHarXhAPnd7ozM2N09YeU",
  authDomain: "bookstore-742fa.firebaseapp.com",
  projectId: "bookstore-742fa",
  storageBucket: "bookstore-742fa.appspot.com",
  messagingSenderId: "751215092210",
  appId: "1:751215092210:web:73550af3d5b4156c494b6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export default db;