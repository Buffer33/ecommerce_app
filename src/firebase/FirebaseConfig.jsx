// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCSQpDQQHLHYgwbKjkPDWQV6BqFUTY-wo",
  authDomain: "myfirstapp-5ba99.firebaseapp.com",
  projectId: "myfirstapp-5ba99",
  storageBucket: "myfirstapp-5ba99.appspot.com",
  messagingSenderId: "682995842137",
  appId: "1:682995842137:web:b62d688a978f0fb1cd8548",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app);

export { fireDb, auth };
