// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8WJjDE0hR7uljWRPFXZ5BdDNDzHCfp6k",
  authDomain: "dbcrudddmi-9e6de.firebaseapp.com",
  databaseURL: "https://dbcrudddmi-9e6de-default-rtdb.firebaseio.com",
  projectId: "dbcrudddmi-9e6de",
  storageBucket: "dbcrudddmi-9e6de.appspot.com",
  messagingSenderId: "202241292959",
  appId: "1:202241292959:web:cfc342bc0d3b699d9240aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;